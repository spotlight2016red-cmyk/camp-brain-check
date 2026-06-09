import { QUESTIONS } from './questions';
import { TYPE_RESULTS, type TypeResult } from './typeResults';
import { UNDETERMINED_RESULT } from './undeterminedResult';
import {
  AXIS_ORDER,
  type AxisKey,
  type AxisScores,
  type DiagnosisResult,
} from './types';

export type { DiagnosisResult };

const AXIS_SPREAD_THRESHOLD = 2;
const EXTREMELY_LOW_MAX_AXIS = 4;
const TOP_TWO_AXIS_GAP_THRESHOLD = 2;
const TYPE_PAIR_GAP_THRESHOLD = 2;

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

function scoreValues(scores: AxisScores): number[] {
  return AXIS_ORDER.map((key) => scores[key]);
}

function pairScore(scores: AxisScores, type: TypeResult): number {
  return scores[type.axes[0]] + scores[type.axes[1]];
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

function hasInsufficientApproximationGap(scores: AxisScores, top1: AxisKey): boolean {
  const candidates = TYPE_RESULTS.filter((type) => type.axes.includes(top1));
  const pairScores = candidates
    .map((type) => pairScore(scores, type))
    .sort((a, b) => b - a);

  return pairScores[0] - pairScores[1] <= TYPE_PAIR_GAP_THRESHOLD;
}

export function shouldReturnUndetermined(scores: AxisScores): boolean {
  const values = scoreValues(scores);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (max === min) return true;
  if (max - min <= AXIS_SPREAD_THRESHOLD) return true;
  if (max <= EXTREMELY_LOW_MAX_AXIS) return true;

  const ranked = rankAxes(scores);
  const top1 = ranked[0];
  const top2 = ranked[1];
  const exactMatch = TYPE_BY_PAIR.get(axisPairKey(top1, top2));

  if (exactMatch) return false;

  if (scores[top1] - scores[top2] <= TOP_TWO_AXIS_GAP_THRESHOLD) return true;
  if (hasInsufficientApproximationGap(scores, top1)) return true;

  return false;
}

function pickBestTypeForTopAxis(scores: AxisScores, top1: AxisKey): TypeResult {
  const candidates = TYPE_RESULTS.filter((type) => type.axes.includes(top1));
  const ranked = rankAxes(scores);

  return candidates.reduce((best, candidate) => {
    const candidatePair = pairScore(scores, candidate);
    const bestPair = pairScore(scores, best);

    if (candidatePair > bestPair) return candidate;
    if (candidatePair < bestPair) return best;

    const candidateRankSum = candidate.axes
      .map((axis) => ranked.indexOf(axis))
      .reduce((sum, index) => sum + index, 0);
    const bestRankSum = best.axes
      .map((axis) => ranked.indexOf(axis))
      .reduce((sum, index) => sum + index, 0);

    return candidateRankSum < bestRankSum ? candidate : best;
  });
}

export function determineResult(scores: AxisScores): DiagnosisResult {
  if (shouldReturnUndetermined(scores)) {
    return UNDETERMINED_RESULT;
  }

  const ranked = rankAxes(scores);
  const top1 = ranked[0];
  const top2 = ranked[1];
  const exactMatch = TYPE_BY_PAIR.get(axisPairKey(top1, top2));

  if (exactMatch) {
    return toDiagnosisResult(exactMatch);
  }

  return toDiagnosisResult(pickBestTypeForTopAxis(scores, top1));
}

export function getMaxScorePerAxis(): number {
  return QUESTIONS.filter((q) => q.axis === 'intuition').length * 3;
}
