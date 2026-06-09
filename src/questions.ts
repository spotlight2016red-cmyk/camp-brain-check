import type { AxisKey } from './types';

export interface Question {
  id: number;
  text: string;
  axis: AxisKey;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: 'ふとした瞬間に「これだ」と感じることがある', axis: 'intuition' },
  { id: 2, text: '理由を説明するより、感覚で判断することが多い', axis: 'intuition' },
  { id: 3, text: '新しいアイデアが突然浮かぶことがある', axis: 'intuition' },
  { id: 4, text: '論理より直感を信じて決める場面がある', axis: 'intuition' },
  { id: 5, text: '情報を整理してから動くことが多い', axis: 'structure' },
  { id: 6, text: '全体像を把握してから取り組みたい', axis: 'structure' },
  { id: 7, text: '手順やルールを明確にすると安心する', axis: 'structure' },
  { id: 8, text: '複雑なことを分類・体系化するのが得意だ', axis: 'structure' },
  { id: 9, text: '考えるより先に動いてみることが多い', axis: 'action' },
  { id: 10, text: '決断を先延ばしにせず、すぐ実行する', axis: 'action' },
  { id: 11, text: 'チャレンジや新しいことに積極的だ', axis: 'action' },
  { id: 12, text: '行動することで状況が変わると感じる', axis: 'action' },
  { id: 13, text: '相手の気持ちを察するのが得意だ', axis: 'empathy' },
  { id: 14, text: '人の話を聴くと、自分のことのように感じる', axis: 'empathy' },
  { id: 15, text: '場の空気や雰囲気に敏感だ', axis: 'empathy' },
  { id: 16, text: '相手の立場に立って考えることが多い', axis: 'empathy' },
  { id: 17, text: '自分の考えを言葉や形で表現するのが好きだ', axis: 'expression' },
  { id: 18, text: '伝えることで人を動かせると感じる', axis: 'expression' },
  { id: 19, text: 'プレゼンや共有の場が苦にならない', axis: 'expression' },
  { id: 20, text: 'アイデアを外に出すことに喜びを感じる', axis: 'expression' },
  { id: 21, text: 'コツコツ続けることが得意だ', axis: 'stability' },
  { id: 22, text: '変化より、安定した環境を好む', axis: 'stability' },
  { id: 23, text: '計画的に進めると力を発揮しやすい', axis: 'stability' },
  { id: 24, text: '信頼関係を長く育てることを大切にする', axis: 'stability' },
];

export const ANSWER_LABELS = [
  '全く当てはまらない',
  'あまり当てはまらない',
  'どちらともいえない',
  'やや当てはまる',
  'とても当てはまる',
] as const;
