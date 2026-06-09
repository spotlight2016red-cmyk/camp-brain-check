import { QUESTIONS } from './questions';
import {
  calculateAxisScores,
  determineResult,
  getMaxScorePerAxis,
  shouldReturnUndetermined,
} from './scoring';
import type { AxisKey } from './types';

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

function runCase(name: string, answers: Record<number, number>) {
  const scores = calculateAxisScores(answers);
  const result = determineResult(scores);
  console.log(`\n${name}`);
  console.log('scores:', scores);
  console.log('type:', result.typeName, `(${result.id})`);
  return { scores, result };
}

if (getMaxScorePerAxis() !== 12) {
  console.error('FAIL: max score per axis should be 12, got', getMaxScorePerAxis());
  process.exit(1);
}

const allMax = runCase('全問「とても当てはまる」(3点)', answersForPattern(3));
const allMin = runCase('全問「当てはまらない」(0点)', answersForPattern(0));
const structureStability = runCase('構造化×安定性を最高', answersForPattern({
  intuition: 0,
  structure: 3,
  action: 0,
  empathy: 0,
  expression: 0,
  stability: 3,
}));
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
const intuitionOnly = runCase('直感性のみ最高', answersForPattern({
  intuition: 3,
  structure: 0,
  action: 0,
  empathy: 0,
  expression: 0,
  stability: 0,
}));

const undeterminedCases = [allMax, allMin, intuitionOnly];
for (const c of undeterminedCases) {
  if (!c.result.isUndetermined || c.result.id !== 'undetermined') {
    console.error('FAIL: expected undetermined for', c.result.id);
    process.exit(1);
  }
}

const determinedCases = [
  [structureStability, 'structure-stability'],
  [actionIntuition, 'action-intuition'],
  [empathyStructure, 'empathy-structure'],
] as const;

for (const [c, expectedId] of determinedCases) {
  if (c.result.id !== expectedId) {
    console.error(`FAIL: expected ${expectedId}, got`, c.result.id);
    process.exit(1);
  }
}

const borderline = calculateAxisScores(answersForPattern({
  intuition: 3,
  structure: 2,
  action: 2,
  empathy: 2,
  expression: 2,
  stability: 2,
}));
if (!shouldReturnUndetermined(borderline)) {
  console.error('FAIL: borderline spread should be undetermined');
  process.exit(1);
}

console.log('\nOK: undetermined and determined patterns behave as expected');
