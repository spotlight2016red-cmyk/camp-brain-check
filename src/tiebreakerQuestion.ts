import type { BrainTypeId } from './types';

/** 決め手質問 Ver.1.1 */
export const TIEBREAKER_QUESTION_TEXT = '最後に、今の自分に一番近いものを選ぶなら？';

export const TIEBREAKER_OPTIONS: { label: string; typeId: BrainTypeId }[] = [
  {
    label: '感覚やひらめきを、言葉や形にして届けたい',
    typeId: 'intuition-expression',
  },
  {
    label: '人や場の空気を感じ取り、本質に触れることが多い',
    typeId: 'intuition-empathy',
  },
  {
    label: '情報を整理して、道筋や仕組みをつくると落ち着く',
    typeId: 'structure-stability',
  },
  {
    label: 'バラバラの想いや情報をつなげて、企画や形にしたい',
    typeId: 'structure-expression',
  },
  {
    label: 'まず動いてみることで、道が見えてくる',
    typeId: 'action-intuition',
  },
  {
    label: '手を動かしながら、着実に形にしていくのが合っている',
    typeId: 'action-stability',
  },
  {
    label: '誰かに寄り添い、安心して進めるように支えることが多い',
    typeId: 'empathy-stability',
  },
  {
    label: '全体を見ながら、人や場が動きやすいように整えることが多い',
    typeId: 'empathy-structure',
  },
];
