import { MAIN_QUESTIONS } from './questions';
import { TYPE_RESULTS, type TypeResult } from './typeResults';
import { buildCombinedDescription } from './combinedDescriptions';
import { SUB_TYPE_FACTOR_DESCRIPTIONS } from './subTypeFactors';
import { getTypeKey } from './typeKey';
import {
  AXIS_ORDER,
  type AxisKey,
  type AxisScores,
  type BrainTypeId,
  type DiagnosisOutcome,
  type DiagnosisResult,
  type PatternType,
} from './types';

export type { DiagnosisOutcome, DiagnosisResult, PatternType };

const TYPE_BY_ID = new Map(TYPE_RESULTS.map((type) => [type.id, type]));

const TYPE_PRIORITY_BY_TOP_AXIS: Record<AxisKey, BrainTypeId[]> = {
  intuition: ['intuition-expression', 'intuition-empathy', 'action-intuition'],
  structure: ['structure-stability', 'structure-expression', 'empathy-structure'],
  action: ['action-intuition', 'action-stability'],
  empathy: ['empathy-stability', 'empathy-structure', 'intuition-empathy'],
  expression: ['intuition-expression', 'structure-expression'],
  stability: ['structure-stability', 'empathy-stability', 'action-stability'],
};

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

function pickMainType(scores: AxisScores): TypeResult {
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
    practicalUsage: type.practicalUsage,
    deepDivePoint: type.deepDivePoint,
    axes: type.axes,
    isUndetermined: false,
  };
}

/** Q1〜Q18の回答（選択肢インデックス 0〜4）から6軸スコアを算出 */
export function calculateAxisScores(answers: Record<number, number>): AxisScores {
  const scores: AxisScores = {
    intuition: 0,
    structure: 0,
    action: 0,
    empathy: 0,
    expression: 0,
    stability: 0,
  };

  for (const question of MAIN_QUESTIONS) {
    const choice = answers[question.id];
    if (choice === undefined) continue;

    const weights = question.optionScores[choice];
    if (!weights) continue;

    for (const axis of AXIS_ORDER) {
      scores[axis] += weights[axis] ?? 0;
    }
  }

  return scores;
}

export function determineMainType(scores: AxisScores): TypeResult {
  return pickMainType(scores);
}

export function determineOutcome(
  answers: Record<number, number>,
  subTypeId: BrainTypeId,
): DiagnosisOutcome {
  const scores = calculateAxisScores(answers);
  const mainType = pickMainType(scores);
  const subType = TYPE_BY_ID.get(subTypeId);
  if (!subType) throw new Error(`Unknown sub type: ${subTypeId}`);

  const patternType: PatternType = mainType.id === subTypeId ? 'matched' : 'composite';

  const subTypeDescription =
    patternType === 'matched'
      ? `${subType.typeName}としての傾向が、本人の自己認識とも重なっており、自然に出やすい資質として表れやすい状態です。`
      : SUB_TYPE_FACTOR_DESCRIPTIONS[subTypeId];

  return {
    mainType: mainType.id,
    subType: subTypeId,
    mainTypeDescription: mainType.description,
    subTypeDescription,
    combinedDescription: buildCombinedDescription(mainType.id, subTypeId, patternType),
    patternType,
    result: toDiagnosisResult(mainType),
    subTypeName: subType.typeName,
    subTypeResult: toDiagnosisResult(subType),
  };
}

export function getMaxScorePerAxis(): number {
  let max = 0;
  for (const question of MAIN_QUESTIONS) {
    for (const weights of question.optionScores) {
      for (const axis of AXIS_ORDER) {
        max = Math.max(max, weights[axis] ?? 0);
      }
    }
  }
  return MAIN_QUESTIONS.length * max;
}

/** 保存用JSON（内部コードは参加者画面には出さない） */
export function toStoredDiagnosisData(outcome: DiagnosisOutcome) {
  return {
    mainType: getTypeKey(outcome.mainType),
    subType: getTypeKey(outcome.subType),
    mainTypeDescription: outcome.mainTypeDescription,
    subTypeDescription: outcome.subTypeDescription,
    combinedDescription: outcome.combinedDescription,
    patternType: outcome.patternType,
  };
}
