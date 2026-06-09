import { QUESTIONS } from './questions';
import { TYPE_RESULTS, type TypeResult } from './typeResults';
import { UNDETERMINED_RESULT } from './undeterminedResult';
import {
  AXIS_ORDER,
  type AxisKey,
  type AxisScores,
  type BrainTypeId,
  type DiagnosisOutcome,
  type DiagnosisResult,
} from './types';

export type { DiagnosisOutcome, DiagnosisResult };

const TYPE_BY_ID = new Map(TYPE_RESULTS.map((type) => [type.id, type]));

/** 1位の軸ごとに、2位同点時などで優先するタイプ順 */
const TYPE_PRIORITY_BY_TOP_AXIS: Record<AxisKey, BrainTypeId[]> = {
  intuition: ['intuition-expression', 'intuition-empathy', 'action-intuition'],
  structure: ['structure-stability', 'structure-expression', 'empathy-structure'],
  action: ['action-intuition', 'action-stability'],
  empathy: ['empathy-stability', 'empathy-structure', 'intuition-empathy'],
  expression: ['intuition-expression', 'structure-expression'],
  stability: ['structure-stability', 'empathy-stability', 'action-stability'],
};

export function calculateAxisScores(answers: Record<number, number>): AxisScores {
  const scores: AxisScores = {
    intuition: 0,
    structure: 0,
    action: 0,
    empathy: 0,
    expression: 0,
    stability: 0,
  };

  for (const q of QUESTIONS) {
    const value = answers[q.id];
    if (value !== undefined) scores[q.axis] += value;
  }

  return scores;
}

function axisPairKey(a: AxisKey, b: AxisKey): string {
  return [a, b].sort().join('+');
}

const TYPE_BY_PAIR = new Map(
  TYPE_RESULTS.map((t) => [axisPairKey(t.axes[0], t.axes[1]), t]),
);

function rankAxes(scores: AxisScores): AxisKey[] {
  return AXIS_ORDER.map((key) => ({ key, score: scores[key] }))
    .sort((a, b) => b.score - a.score || AXIS_ORDER.indexOf(a.key) - AXIS_ORDER.indexOf(b.key))
    .map((item) => item.key);
}

function allAxesEqual(scores: AxisScores): boolean {
  const values = AXIS_ORDER.map((key) => scores[key]);
  return values.every((value) => value === values[0]);
}

export function hasAllSameAnswers(answers: Record<number, number>): boolean {
  const values = QUESTIONS.map((q) => answers[q.id]).filter((value) => value !== undefined);
  if (values.length === 0) return false;
  return values.every((value) => value === values[0]);
}

export function shouldReturnUndetermined(
  scores: AxisScores,
  answers: Record<number, number>,
): boolean {
  return allAxesEqual(scores) || hasAllSameAnswers(answers);
}

const CLOSE_SCORE_GAP = 2;

/** 6軸スコアだけでタイプが明確に決まるか */
export function isClearScoreResult(scores: AxisScores): boolean {
  if (allAxesEqual(scores)) return false;

  const topScore = Math.max(...AXIS_ORDER.map((key) => scores[key]));
  const topTier = AXIS_ORDER.filter((key) => scores[key] === topScore);

  if (topTier.length === 2) {
    return TYPE_BY_PAIR.has(axisPairKey(topTier[0], topTier[1]));
  }

  if (topTier.length !== 1) return false;

  if (isSecondPlaceTied(scores, topScore)) return false;

  const ranked = rankAxes(scores);
  const top1 = ranked[0];
  const top2 = ranked[1];

  if (scores[top1] - scores[top2] <= CLOSE_SCORE_GAP) return false;

  return TYPE_BY_PAIR.has(axisPairKey(top1, top2));
}

function isSecondPlaceTied(scores: AxisScores, topScore: number): boolean {
  const belowTop = AXIS_ORDER.filter((key) => scores[key] < topScore);
  if (belowTop.length === 0) return true;

  const secondScore = Math.max(...belowTop.map((key) => scores[key]));
  return belowTop.filter((key) => scores[key] === secondScore).length > 1;
}

function pickTypeByPriority(top1: AxisKey): TypeResult {
  const priority = TYPE_PRIORITY_BY_TOP_AXIS[top1];
  const type = TYPE_BY_ID.get(priority[0]);
  if (!type) throw new Error(`No type priority defined for top axis: ${top1}`);
  return type;
}

function pickType(scores: AxisScores): TypeResult {
  const topScore = Math.max(...AXIS_ORDER.map((key) => scores[key]));
  const topTier = AXIS_ORDER.filter((key) => scores[key] === topScore);

  if (topTier.length === 2) {
    const topPairMatch = TYPE_BY_PAIR.get(axisPairKey(topTier[0], topTier[1]));
    if (topPairMatch) return topPairMatch;
  }

  const ranked = rankAxes(scores);
  const top1 = ranked[0];
  const top2 = ranked[1];

  if (!isSecondPlaceTied(scores, topScore)) {
    const exactMatch = TYPE_BY_PAIR.get(axisPairKey(top1, top2));
    if (exactMatch) return exactMatch;
  }

  return pickTypeByPriority(top1);
}

function toDiagnosisResult(type: TypeResult): DiagnosisResult {
  return {
    id: type.id,
    typeName: type.typeName,
    avatarName: type.avatarName,
    description: type.description,
    strongEnvironment: type.strongEnvironment,
    fatiguePattern: type.fatiguePattern,
    deepDivePoint: type.deepDivePoint,
    axes: type.axes,
    isUndetermined: false,
  };
}

function buildTiebreakerNote(tiebreakerType: TypeResult): string {
  return `最後の選択では${tiebreakerType.typeName}の要素も見られます`;
}

/** スコア上の候補タイプ（同点・僅差・複数候補時に決め手で選べる範囲） */
export function getCandidateTypeIds(scores: AxisScores): BrainTypeId[] {
  const topScore = Math.max(...AXIS_ORDER.map((key) => scores[key]));
  const topTier = AXIS_ORDER.filter((key) => scores[key] === topScore);

  if (topTier.length === 2) {
    const pairMatch = TYPE_BY_PAIR.get(axisPairKey(topTier[0], topTier[1]));
    if (pairMatch) return [pairMatch.id];
  }

  if (topTier.length === 1) {
    return [...TYPE_PRIORITY_BY_TOP_AXIS[topTier[0]]];
  }

  const pairCandidates = TYPE_RESULTS.filter((type) =>
    type.axes.every((axis) => topTier.includes(axis)),
  ).map((type) => type.id);

  if (pairCandidates.length > 0) return pairCandidates;

  const top1 = rankAxes(scores)[0];
  return [...TYPE_PRIORITY_BY_TOP_AXIS[top1]];
}

export function determineOutcome(
  scores: AxisScores,
  answers: Record<number, number>,
  tiebreakerTypeId?: BrainTypeId,
): DiagnosisOutcome {
  const undetermined = shouldReturnUndetermined(scores, answers);
  const scoreType = pickType(scores);
  const clear = isClearScoreResult(scores);
  const tiebreakerType = tiebreakerTypeId ? TYPE_BY_ID.get(tiebreakerTypeId) : undefined;

  if (!undetermined && clear) {
    const result = toDiagnosisResult(scoreType);
    if (tiebreakerType && tiebreakerType.id !== scoreType.id) {
      return { result, tiebreakerNote: buildTiebreakerNote(tiebreakerType) };
    }
    return { result };
  }

  if (undetermined) {
    if (tiebreakerType) {
      return { result: toDiagnosisResult(tiebreakerType) };
    }
    return { result: UNDETERMINED_RESULT };
  }

  const candidates = getCandidateTypeIds(scores);
  if (tiebreakerType && candidates.includes(tiebreakerType.id)) {
    return { result: toDiagnosisResult(tiebreakerType) };
  }

  const result = toDiagnosisResult(scoreType);
  if (tiebreakerType && tiebreakerType.id !== scoreType.id) {
    return { result, tiebreakerNote: buildTiebreakerNote(tiebreakerType) };
  }
  return { result };
}

export function determineResult(
  scores: AxisScores,
  answers: Record<number, number>,
  tiebreakerTypeId?: BrainTypeId,
): DiagnosisResult {
  return determineOutcome(scores, answers, tiebreakerTypeId).result;
}

export function getMaxScorePerAxis(): number {
  return QUESTIONS.filter((q) => q.axis === 'intuition').length * 3;
}
