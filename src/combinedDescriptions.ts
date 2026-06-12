import type { BrainTypeId, PatternType } from './types';
import { TYPE_RESULTS } from './typeResults';

const TYPE_BY_ID = new Map(TYPE_RESULTS.map((type) => [type.id, type]));

const MAIN_CENTER: Record<BrainTypeId, string> = {
  'intuition-expression':
    '感覚やひらめきを、言葉や形にして届けていく力があります。',
  'intuition-empathy':
    '人や場の空気を感じ取り、言葉にならない違和感にも気づける力があります。',
  'structure-stability':
    '情報を整理し、再現できる仕組みに落とし込む力があります。',
  'structure-expression':
    'バラバラの情報や想いをつなげて、企画や形にしていく力があります。',
  'action-intuition':
    'まず動いてみることで流れをつかみ、現実の中で道を見つけていく力があります。',
  'action-stability':
    '手を動かしながら、着実に形に積み上げていく力があります。',
  'empathy-stability':
    '誰かに寄り添い、安心して進めるように支える力があります。',
  'empathy-structure':
    '全体を見ながら、人や場が動きやすいように整える力があります。',
};

const SUB_COMPOSITE_INTROS: Record<BrainTypeId, string> = {
  'intuition-expression':
    '感覚やひらめきを、言葉や形にして届けたいという感覚も持っています。',
  'intuition-empathy':
    '人や場の空気を感じ取り、本質に触れる感覚も持っています。',
  'structure-stability':
    '情報を整理して、道筋や仕組みをつくると落ち着く感覚も持っています。',
  'structure-expression':
    'バラバラの想いや情報をつなげて、企画や形にしたい感覚も持っています。',
  'action-intuition':
    'まず動いてみることで、道が見えてくる感覚も持っています。',
  'action-stability':
    '手を動かしながら、着実に形にしていく感覚も持っています。',
  'empathy-stability':
    '誰かに寄り添い、安心して進めるように支える感覚も持っています。',
  'empathy-structure':
    '周囲の人や場の状態を感じ取りながら、全体が動きやすくなるように調整する感覚も持っています。',
};

const MATCHED_CLOSINGS: Record<BrainTypeId, string> = {
  'intuition-expression':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、その力をどの場面で、誰のために、どのように使うかを整理していくことで、より大きな力として発揮されていきます。',
  'intuition-empathy':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、受け取る力を大切にしながら、自分の感覚をどう活かすかを整理していくことで、より安定して力を発揮されていきます。',
  'structure-stability':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、整理する力を活かしつつ、変化にも対応できる柔らかさを保つことで、より安定して力を発揮されていきます。',
  'structure-expression':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、その力をどの場面で、誰のために、どのように使うかを整理していくことで、より大きな力として発揮されていきます。',
  'action-intuition':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、動く力を活かしつつ、振り返りや方向性の整理を組み合わせることで、より安定して力を発揮されていきます。',
  'action-stability':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、積み上げる力を活かしつつ、新しい挑戦への余白をつくることで、より安定して力を発揮されていきます。',
  'empathy-stability':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、伴走する力を活かしつつ、自分のエネルギーを守る方法を見ていくことで、より無理なく力を発揮されていきます。',
  'empathy-structure':
    'その力は診断上にも表れており、本人の実感としても近い可能性があります。今後は、場を整える力を活かしつつ、自分の本音も大切にするバランスを見ていくことで、より安定して力を発揮されていきます。',
};

const COMPOSITE_SYNERGY: Partial<Record<BrainTypeId, Partial<Record<BrainTypeId, string>>>> = {
  'action-intuition': {
    'empathy-structure':
      'そのため、単独で突き進むよりも、人や場の流れを見ながら動くことで、本来の力が発揮されやすいタイプです。',
  },
};

const DEFAULT_COMPOSITE_SYNERGY =
  'そのため、中心の傾向とサブ要因を組み合わせて見ることで、あなたらしさがより立体的に見えてきます。';

export function buildCombinedDescription(
  mainTypeId: BrainTypeId,
  subTypeId: BrainTypeId,
  patternType: PatternType,
): string {
  if (patternType === 'matched') {
    const main = TYPE_BY_ID.get(mainTypeId);
    if (!main) return '';
    return `${main.description}\n${MATCHED_CLOSINGS[mainTypeId]}`;
  }

  const synergy =
    COMPOSITE_SYNERGY[mainTypeId]?.[subTypeId] ?? DEFAULT_COMPOSITE_SYNERGY;

  return `あなたの中心には、${MAIN_CENTER[mainTypeId]}\n一方で、${SUB_COMPOSITE_INTROS[subTypeId]}\n${synergy}`;
}
