import { QUESTIONS } from './questions';
import {
  calculateAxisScores,
  determineOutcome,
  determineResult,
  getMaxScorePerAxis,
  isClearScoreResult,
  shouldReturnUndetermined,
} from './scoring';
import type { AxisKey, BrainTypeId } from './types';

function answersForPattern(
  pattern: Record<AxisKey, number> | number,
): Record<number, number> {
  const score = typeof pattern === 'number' ? pattern : null;

  return Object.fromEntries(
    QUESTIONS.map((q) => [
      q.id,
      score ?? (pattern as Record<AxisKey, number>)[q.axis],
    ]),
  );
}

function runCase(
  name: string,
  answers: Record<number, number>,
  tiebreakerTypeId?: BrainTypeId,
) {
  const scores = calculateAxisScores(answers);
  const outcome = determineOutcome(scores, answers, tiebreakerTypeId);
  console.log(`\n${name}`);
  console.log('scores:', scores);
  console.log('type:', outcome.result.typeName, `(${outcome.result.id})`);
  if (outcome.subTypeName) console.log('sub:', outcome.subTypeName);
  return { scores, outcome, answers };
}

if (getMaxScorePerAxis() !== 12) {
  console.error('FAIL: max score per axis should be 12, got', getMaxScorePerAxis());
  process.exit(1);
}

const allMax = runCase('全問「とても当てはまる」(3点)', answersForPattern(3));
const allMaxWithTiebreaker = runCase(
  '全問同じ回答 + 決め手で直感共感',
  answersForPattern(3),
  'intuition-empathy',
);
const allMin = runCase('全問「当てはまらない」(0点)', answersForPattern(0));

const structureStability = runCase('構造化×安定性を最高', answersForPattern({
  intuition: 0,
  structure: 3,
  action: 0,
  empathy: 0,
  expression: 0,
  stability: 3,
}));

const clearWithDifferentTiebreaker = runCase(
  '構造化×安定性が明確 + 決め手で共感伴走',
  answersForPattern({
    intuition: 0,
    structure: 3,
    action: 0,
    empathy: 0,
    expression: 0,
    stability: 3,
  }),
  'empathy-stability',
);

const actionIntuition = runCase('行動性×直感性を最高', answersForPattern({
  intuition: 3,
  structure: 0,
  action: 3,
  empathy: 0,
  expression: 0,
  stability: 0,
}));

const empathyStructure = runCase('共感性×構造化を最高', answersForPattern({
  intuition: 0,
  structure: 3,
  action: 0,
  empathy: 3,
  expression: 0,
  stability: 0,
}));

/** Ver.1.1 の軸割り当てに合わせた「直感性優位」パターン（11 / 8 / 6 / 8 / 8 / 8） */
const intuitionDominantAnswers = {
  1: 3, 7: 3, 13: 3, 19: 2,
  2: 2, 8: 2, 14: 2, 20: 2,
  3: 2, 9: 2, 15: 1, 21: 1,
  4: 2, 10: 2, 16: 2, 22: 2,
  5: 2, 11: 2, 17: 2, 23: 2,
  6: 2, 12: 2, 18: 2, 24: 2,
};

const intuitionDominant = runCase('直感性が明確に高い（実例パターン）', intuitionDominantAnswers);

const intuitionDominantWithTiebreaker = runCase(
  '直感性優位 + 決め手で場づくり（候補外）',
  intuitionDominantAnswers,
  'empathy-structure',
);

const intuitionDominantWithCandidateTiebreaker = runCase(
  '直感性優位 + 決め手で直感共感（候補内）',
  intuitionDominantAnswers,
  'intuition-empathy',
);

for (const c of [allMax, allMin]) {
  if (!c.outcome.result.isUndetermined || c.outcome.result.id !== 'undetermined') {
    console.error('FAIL: expected undetermined without tiebreaker, got', c.outcome.result.id);
    process.exit(1);
  }
}

if (allMaxWithTiebreaker.outcome.result.id !== 'intuition-empathy') {
  console.error('FAIL: tiebreaker should set type when scores are undetermined');
  process.exit(1);
}

if (clearWithDifferentTiebreaker.outcome.result.id !== 'structure-stability') {
  console.error('FAIL: clear score result should not be overridden by tiebreaker');
  process.exit(1);
}

if (clearWithDifferentTiebreaker.outcome.subTypeName !== '共感伴走タイプ') {
  console.error('FAIL: expected sub type for clear but different choice');
  process.exit(1);
}

const determinedCases = [
  [structureStability, 'structure-stability'],
  [actionIntuition, 'action-intuition'],
  [empathyStructure, 'empathy-structure'],
  [intuitionDominant, 'intuition-expression'],
] as const;

for (const [c, expectedId] of determinedCases) {
  if (c.outcome.result.id !== expectedId) {
    console.error(`FAIL: expected ${expectedId}, got`, c.outcome.result.id);
    process.exit(1);
  }
}

if (intuitionDominantWithTiebreaker.outcome.result.id !== 'intuition-expression') {
  console.error('FAIL: out-of-candidate tiebreaker should not override score type');
  process.exit(1);
}

if (intuitionDominantWithTiebreaker.outcome.subTypeName !== '場づくり調和タイプ') {
  console.error('FAIL: expected sub type for out-of-candidate choice');
  process.exit(1);
}

if (intuitionDominantWithCandidateTiebreaker.outcome.result.id !== 'intuition-empathy') {
  console.error('FAIL: in-candidate tiebreaker should resolve ambiguous score');
  process.exit(1);
}

if (!isClearScoreResult(structureStability.scores)) {
  console.error('FAIL: structure+stability should be a clear score result');
  process.exit(1);
}

if (isClearScoreResult(calculateAxisScores(intuitionDominantAnswers))) {
  console.error('FAIL: intuition dominant with tied second place should not be clear');
  process.exit(1);
}

if (
  determineResult(
    calculateAxisScores(answersForPattern(3)),
    answersForPattern(3),
    'action-stability',
  ).id !== 'action-stability'
) {
  console.error('FAIL: tiebreaker should work for undetermined scores');
  process.exit(1);
}

const borderlineAnswers = answersForPattern({
  intuition: 3,
  structure: 2,
  action: 2,
  empathy: 2,
  expression: 2,
  stability: 2,
});
const borderlineScores = calculateAxisScores(borderlineAnswers);
if (shouldReturnUndetermined(borderlineScores, borderlineAnswers)) {
  console.error('FAIL: borderline pattern should not be undetermined');
  process.exit(1);
}
if (determineResult(borderlineScores, borderlineAnswers).id !== 'intuition-expression') {
  console.error('FAIL: borderline pattern should map to intuition-expression without tiebreaker');
  process.exit(1);
}

console.log('\nOK: scoring and tiebreaker patterns behave as expected');
