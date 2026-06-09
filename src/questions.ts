import type { AxisKey } from './types';

export interface Question {
  id: number;
  text: string;
  axis: AxisKey;
}

/** 診断質問 Ver.1.1（ニュートラル寄りの文言） */
export const QUESTIONS: Question[] = [
  { id: 1, text: '初めてのことに向き合う時、まず大まかな方向性や可能性をつかみたい。', axis: 'intuition' },
  { id: 2, text: '物事を進める時、全体の流れや順番が見えていると安心する。', axis: 'structure' },
  { id: 3, text: '考えすぎるより、まず小さく試してみる方が動きやすい。', axis: 'action' },
  { id: 4, text: '人の表情や空気の変化に気づきやすい。', axis: 'empathy' },
  { id: 5, text: '感じたことや考えたことを、言葉・絵・形にして表すと整理される。', axis: 'expression' },
  { id: 6, text: '同じことを継続したり、一定のリズムを守ったりすることで力を発揮しやすい。', axis: 'stability' },
  { id: 7, text: '細かい説明がなくても、「なんとなくこうなりそう」と流れを感じることがある。', axis: 'intuition' },
  { id: 8, text: '情報が散らかっていると、整理して見やすくしたくなる。', axis: 'structure' },
  { id: 9, text: '動きながら考える方が、自分らしい答えにたどり着きやすい。', axis: 'action' },
  { id: 10, text: '相手の表情や話し方の変化から、気持ちの変化に気づくことがある。', axis: 'empathy' },
  { id: 11, text: '考えたことを、メモや図、言葉にして整理することが多い。', axis: 'expression' },
  { id: 12, text: '急な変化よりも、ある程度見通しがある状態の方が落ち着いて力を出せる。', axis: 'stability' },
  { id: 13, text: '物事の細部よりも、まず全体像や意味をつかむ方が得意だ。', axis: 'intuition' },
  { id: 14, text: '複雑な話を聞くと、要点や構造を整理したくなる。', axis: 'structure' },
  { id: 15, text: '失敗を恐れて止まるより、やってみてから調整する方が合っている。', axis: 'action' },
  { id: 16, text: '人が安心して話せるように、相手のペースに合わせることが多い。', axis: 'empathy' },
  { id: 17, text: '頭の中にあるイメージを、文章・図・企画・作品などに変えるのが好きだ。', axis: 'expression' },
  { id: 18, text: '自分の役割ややることが明確な時、安定して力を発揮しやすい。', axis: 'stability' },
  { id: 19, text: '目の前の出来事から、別の可能性や意味を連想しやすい。', axis: 'intuition' },
  { id: 20, text: '物事を進める前に、目的・手順・優先順位を確認したくなる。', axis: 'structure' },
  { id: 21, text: '現場で手を動かしながら、改善点を見つけていくのが得意だ。', axis: 'action' },
  { id: 22, text: '周りの人が無理をしていないか、自然と気になることがある。', axis: 'empathy' },
  { id: 23, text: 'バラバラの考えや情報をつなげて、ひとつの企画や形にするのが得意だ。', axis: 'expression' },
  { id: 24, text: '場の空気や人の動きが乱れていると、整えたり支えたりしたくなる。', axis: 'stability' },
];

/** 表示ラベル（インデックス = 点数: 0〜3） */
export const ANSWER_LABELS = [
  '当てはまらない',       // 0点
  'あまり当てはまらない', // 1点
  '少し当てはまる',       // 2点
  'とても当てはまる',     // 3点
] as const;

export const ANSWER_SCORES = [0, 1, 2, 3] as const;
