import { QUESTIONS } from './questions';
import { TYPE_RESULTS, type TypeResult } from './typeResults';
import { AVATAR_BY_ID } from './avatarData';
import { AXIS_ORDER, type AxisKey, type AxisScores } from './types';

export interface DiagnosisResult extends TypeResult {
  avatarImage: string;
}

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

export function determineResult(scores: AxisScores): DiagnosisResult {
  const ranked = AXIS_ORDER.map((key) => ({ key, score: scores[key] }))
    .sort((a, b) => b.score - a.score || AXIS_ORDER.indexOf(a.key) - AXIS_ORDER.indexOf(b.key));

  const top1 = ranked[0].key;
  const top2 = ranked[1].key;

  let typeResult = TYPE_BY_PAIR.get(axisPairKey(top1, top2));

  if (!typeResult) {
    typeResult =
      TYPE_RESULTS.find((t) => {
        const pair = new Set(t.axes);
        return pair.has(top1) && pair.has(top2);
      }) ?? TYPE_RESULTS[0];
  }

  return {
    ...typeResult,
    avatarImage: AVATAR_BY_ID[typeResult.id].image,
  };
}

export function getMaxScorePerAxis(): number {
  return QUESTIONS.filter((q) => q.axis === 'intuition').length * 5;
}
