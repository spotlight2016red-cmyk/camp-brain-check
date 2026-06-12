import { MAIN_QUESTIONS } from './questions';
import {
  calculateAxisScores,
  determineMainType,
  determineOutcome,
  getMaxScorePerAxis,
  toStoredDiagnosisData,
} from './scoring';
import { TYPE_RESULTS } from './typeResults';
import type { AxisKey, BrainTypeId } from './types';

const TYPE_BY_ID = new Map(TYPE_RESULTS.map((type) => [type.id, type]));

function answersFavoringType(typeId: BrainTypeId): Record<number, number> {
  const type = TYPE_BY_ID.get(typeId);
  if (!type) throw new Error(`Unknown type: ${typeId}`);
  const [axisA, axisB] = type.axes;
  const answers: Record<number, number> = {};

  for (const question of MAIN_QUESTIONS) {
    let bestChoice = 0;
    let bestScore = -1;

    question.options.forEach((_, choice) => {
      const weights = question.optionScores[choice];
      const score = (weights[axisA] ?? 0) + (weights[axisB] ?? 0);
      if (score > bestScore) {
        bestScore = score;
        bestChoice = choice;
      }
    });

    answers[question.id] = bestChoice;
  }

  return answers;
}

function answersFavoringAxes(axisBoosts: Partial<Record<AxisKey, number>>): Record<number, number> {
  const answers: Record<number, number> = {};

  for (const question of MAIN_QUESTIONS) {
    let bestChoice = 0;
    let bestScore = -1;

    question.options.forEach((_, choice) => {
      const weights = question.optionScores[choice];
      let score = 0;
      for (const [axis, boost] of Object.entries(axisBoosts) as [AxisKey, number][]) {
        score += (weights[axis] ?? 0) * boost;
      }
      if (score > bestScore) {
        bestScore = score;
        bestChoice = choice;
      }
    });

    answers[question.id] = bestChoice;
  }

  return answers;
}

function runCase(
  name: string,
  answers: Record<number, number>,
  subTypeId: BrainTypeId,
) {
  const scores = calculateAxisScores(answers);
  const mainType = determineMainType(scores);
  const outcome = determineOutcome(answers, subTypeId);
  console.log(`\n${name}`);
  console.log('scores:', scores);
  console.log('main:', outcome.result.typeName, `(${outcome.mainType})`);
  console.log('sub:', outcome.subTypeName, `(${outcome.subType})`);
  console.log('pattern:', outcome.patternType);
  console.log('stored:', toStoredDiagnosisData(outcome));
  return { scores, outcome, answers };
}

const maxScore = getMaxScorePerAxis();
if (maxScore <= 0) {
  console.error('FAIL: max score per axis should be positive, got', maxScore);
  process.exit(1);
}

const actionIntuitionAnswers = answersFavoringAxes({ action: 3, intuition: 2 });
const actionIntuition = runCase(
  '行動×直感を優先',
  actionIntuitionAnswers,
  'empathy-structure',
);

if (actionIntuition.outcome.mainType !== 'action-intuition') {
  console.error('FAIL: expected action-intuition main type, got', actionIntuition.outcome.mainType);
  process.exit(1);
}

if (actionIntuition.outcome.patternType !== 'composite') {
  console.error('FAIL: expected composite pattern');
  process.exit(1);
}

if (actionIntuition.outcome.subType !== 'empathy-structure') {
  console.error('FAIL: expected empathy-structure sub type');
  process.exit(1);
}

const structureExpressionAnswers = answersFavoringType('structure-expression');
const matched = runCase(
  '企画設計を優先 + 同じサブタイプ',
  structureExpressionAnswers,
  'structure-expression',
);

if (matched.outcome.mainType !== 'structure-expression') {
  console.error('FAIL: expected structure-expression main type');
  process.exit(1);
}

if (matched.outcome.patternType !== 'matched') {
  console.error('FAIL: expected matched pattern');
  process.exit(1);
}

const stored = toStoredDiagnosisData(matched.outcome);
if (stored.mainType !== 'structure_expression' || stored.subType !== 'structure_expression') {
  console.error('FAIL: stored keys should use underscore format');
  process.exit(1);
}

if (!matched.outcome.combinedDescription.includes('本人の実感')) {
  console.error('FAIL: matched combined description should mention self-awareness');
  process.exit(1);
}

if (!actionIntuition.outcome.combinedDescription.includes('一方で')) {
  console.error('FAIL: composite combined description should include sub factor');
  process.exit(1);
}

const empathyStabilityAnswers = answersFavoringAxes({ empathy: 3, stability: 2 });
const empathyStability = runCase(
  '共感×安定を優先',
  empathyStabilityAnswers,
  'intuition-expression',
);

if (empathyStability.outcome.mainType !== 'empathy-stability') {
  console.error('FAIL: expected empathy-stability main type, got', empathyStability.outcome.mainType);
  process.exit(1);
}

console.log('\nOK: main/sub type scoring behaves as expected');
