import type { AxisKey } from './types';

export type ChoiceIndex = 0 | 1 | 2 | 3 | 4;

type AxisWeights = Partial<Record<AxisKey, number>>;

export interface MainQuestion {
  id: number;
  text: string;
  options: [string, string, string, string, string];
  /** 選択肢インデックス（A=0 … E=4）ごとの6軸加点 */
  optionScores: [AxisWeights, AxisWeights, AxisWeights, AxisWeights, AxisWeights];
}

/** Q1〜Q18：メインタイプ算出用 */
export const MAIN_QUESTIONS: MainQuestion[] = [
  {
    id: 1,
    text: '自分の特徴について、今の感覚に近いのは？',
    options: [
      'ある程度わかっているので、より深く整理したい',
      'なんとなくわかるけど、まだ言葉にできていない',
      '人から言われることと、自分の感覚にズレがある',
      '自分のことは正直よくわからない',
      'その時々で変わるので、決めきれない',
    ],
    optionScores: [
      { structure: 2, expression: 1 },
      { intuition: 2 },
      { empathy: 2, intuition: 1 },
      { intuition: 1, empathy: 2 },
      { action: 1, intuition: 2 },
    ],
  },
  {
    id: 2,
    text: '周りから言われる自分と、自分の実感は？',
    options: [
      'かなり近い',
      'だいたい近い',
      '半分くらい合っている',
      'けっこうズレている',
      '周りからどう見られているか、あまりわからない',
    ],
    optionScores: [
      { stability: 2, empathy: 1 },
      { empathy: 2 },
      { empathy: 2, structure: 1 },
      { empathy: 2, intuition: 1 },
      { empathy: 1, intuition: 2 },
    ],
  },
  {
    id: 3,
    text: '何かを始めるとき、近いのは？',
    options: [
      'まず動いてみて、やりながら考える',
      'ある程度整理してから動きたい',
      '誰かと話しながら方向性を見つけたい',
      '自分の中で納得してから動きたい',
      '直感的に「これだ」と思えたら動きやすい',
    ],
    optionScores: [
      { action: 3, intuition: 2 },
      { structure: 3, stability: 2 },
      { empathy: 3, expression: 1 },
      { structure: 2, empathy: 2 },
      { intuition: 3, action: 2 },
    ],
  },
  {
    id: 4,
    text: 'グループで作業するとき、近いのは？',
    options: [
      '全体を見て、自然とまとめ役になりやすい',
      '誰かの流れに乗りながら、自分の役割を見つける',
      '新しいアイデアや可能性を出したくなる',
      '必要な作業を見つけて、黙々と支える',
      '場の空気を見ながら、人が動きやすいように調整する',
    ],
    optionScores: [
      { structure: 2, empathy: 3 },
      { empathy: 2, stability: 2 },
      { expression: 3, intuition: 2 },
      { action: 2, stability: 3 },
      { empathy: 3, structure: 2 },
    ],
  },
  {
    id: 5,
    text: '予定や計画について、近いのは？',
    options: [
      '先に全体像が見えると安心する',
      '余白がある方が動きやすい',
      'その場の流れで決める方が楽しい',
      '決めすぎると窮屈だが、最低限の軸はほしい',
      '目的がはっきりしていれば、細かい流れはあとで考えたい',
    ],
    optionScores: [
      { structure: 3, stability: 2 },
      { intuition: 2, action: 2 },
      { action: 3, intuition: 2 },
      { structure: 2, expression: 1 },
      { structure: 2, action: 2 },
    ],
  },
  {
    id: 6,
    text: '締切や期限があるとき、近いのは？',
    options: [
      '早めに進めて余裕を持ちたい',
      '締切が近づくと集中力が出る',
      '誰かと進捗確認しながら進めると動きやすい',
      '気持ちが乗るまで時間がかかるが、入ると一気に進む',
      '全体の流れが見えると、自然に進められる',
    ],
    optionScores: [
      { stability: 3, structure: 2 },
      { action: 3, intuition: 1 },
      { empathy: 3, structure: 1 },
      { intuition: 2, expression: 2 },
      { structure: 3, empathy: 2 },
    ],
  },
  {
    id: 7,
    text: '人と意見が違ったとき、近いのは？',
    options: [
      '違うと思ったことは、できるだけ率直に伝える',
      '関係性を守りながら、伝え方を考える',
      'いったん相手の意図を理解しようとする',
      'その場では合わせて、あとで自分の中で整理する',
      '互いの意見をつなげて、別の形にできないか考える',
    ],
    optionScores: [
      { action: 2, expression: 3 },
      { empathy: 3, stability: 2 },
      { empathy: 3, intuition: 2 },
      { empathy: 2, stability: 2 },
      { expression: 2, structure: 3 },
    ],
  },
  {
    id: 8,
    text: '新しい環境に入ったとき、近いのは？',
    options: [
      'まず動いて、場に慣れていく',
      '周りを観察してから動く',
      '誰かと話すことで安心する',
      '自分のペースがつかめるまで少し時間がかかる',
      '空気感や流れを感じてから、自分の動き方を決める',
    ],
    optionScores: [
      { action: 3, intuition: 2 },
      { structure: 2, empathy: 2 },
      { empathy: 3, expression: 1 },
      { stability: 3, empathy: 2 },
      { empathy: 2, intuition: 3 },
    ],
  },
  {
    id: 9,
    text: '褒められると嬉しいのは？',
    options: [
      '行動力やスピード感',
      '考えの深さや視点',
      '人への配慮や場づくり',
      'センスや独自性',
      '継続力や安定感',
    ],
    optionScores: [
      { action: 3 },
      { structure: 2, intuition: 2 },
      { empathy: 3 },
      { expression: 3, intuition: 2 },
      { stability: 3 },
    ],
  },
  {
    id: 10,
    text: '疲れやすいのはどんなとき？',
    options: [
      '動きたいのに、細かく止められるとき',
      '先が見えないまま進まされるとき',
      '場の空気が悪い・人間関係がギスギスしているとき',
      '自分の考える時間が取れないとき',
      '同じ作業が長く続き、変化や意味を感じにくいとき',
    ],
    optionScores: [
      { action: 3, intuition: 1 },
      { structure: 3, stability: 2 },
      { empathy: 3 },
      { structure: 2, expression: 2 },
      { action: 2, expression: 2 },
    ],
  },
  {
    id: 11,
    text: '力が出やすい環境は？',
    options: [
      'スピード感があり、任せてもらえる環境',
      '目的や流れが整理されている環境',
      '安心して話せる人間関係がある環境',
      '自分の裁量や自由度がある環境',
      '役割が明確で、集中できる環境',
    ],
    optionScores: [
      { action: 3, intuition: 2 },
      { structure: 3, stability: 2 },
      { empathy: 3, stability: 2 },
      { action: 2, expression: 2 },
      { stability: 3, structure: 2 },
    ],
  },
  {
    id: 12,
    text: '迷ったとき、どうしやすい？',
    options: [
      'とりあえず小さく試す',
      '情報を集めて整理する',
      '信頼できる人に話す',
      '自分の感覚が定まるまで待つ',
      'いったん別のことをして、ひらめきを待つ',
    ],
    optionScores: [
      { action: 3 },
      { structure: 3 },
      { empathy: 3 },
      { intuition: 3 },
      { intuition: 2, expression: 2 },
    ],
  },
  {
    id: 13,
    text: '自分らしさが出るのは？',
    options: [
      '先頭に立って動くとき',
      '全体を整理して道筋をつくるとき',
      '人と人の間をつなぐとき',
      '新しいアイデアを形にするとき',
      '黙々と積み上げているとき',
    ],
    optionScores: [
      { action: 3, intuition: 2 },
      { structure: 3, expression: 2 },
      { empathy: 3, expression: 1 },
      { expression: 3, structure: 2 },
      { action: 2, stability: 3 },
    ],
  },
  {
    id: 14,
    text: '逆に、自分らしさが消えやすいのは？',
    options: [
      '指示が細かすぎて自由がないとき',
      '目的が曖昧で、何をすればいいか分からないとき',
      '周囲に気を遣いすぎるとき',
      '変化や刺激が少なすぎるとき',
      '急かされて、自分のペースを失うとき',
    ],
    optionScores: [
      { action: 3, intuition: 1 },
      { structure: 3 },
      { empathy: 3 },
      { action: 2, intuition: 2 },
      { stability: 3, empathy: 2 },
    ],
  },
  {
    id: 15,
    text: '旅行や休日の過ごし方で近いのは？',
    options: [
      '行きたい場所を決めて、しっかり楽しむ',
      '大まかな予定だけ決めて、あとは流れで動く',
      '誰と行くか・誰と過ごすかが大事',
      'ひとりで自由に動ける時間がほしい',
      'あまり予定を詰めず、回復する時間にしたい',
    ],
    optionScores: [
      { structure: 2, action: 2 },
      { intuition: 2, action: 2 },
      { empathy: 3 },
      { expression: 2, intuition: 2 },
      { stability: 3 },
    ],
  },
  {
    id: 16,
    text: '何かを学ぶとき、近いのは？',
    options: [
      'まず実践して、体で覚える',
      '理屈や構造を理解してから進めたい',
      '誰かと話しながら学ぶと入りやすい',
      '自分なりに解釈して、意味づけしたい',
      '手順があると安心して学べる',
    ],
    optionScores: [
      { action: 3 },
      { structure: 3 },
      { empathy: 3 },
      { expression: 2, intuition: 2 },
      { stability: 3, structure: 2 },
    ],
  },
  {
    id: 17,
    text: 'まわりから誤解されやすいことは？',
    options: [
      '強く見えるけど、実は繊細',
      '落ち着いて見えるけど、頭の中は忙しい',
      '合わせているようで、実はかなり考えている',
      '自由に見えるけど、内側にはこだわりがある',
      'マイペースに見えるけど、ちゃんと責任感はある',
    ],
    optionScores: [
      { action: 2, empathy: 3 },
      { structure: 2, intuition: 2 },
      { empathy: 3, structure: 2 },
      { expression: 3, stability: 2 },
      { stability: 3, action: 2 },
    ],
  },
  {
    id: 18,
    text: '今、一番ほしいものは？',
    options: [
      '動き出すきっかけ',
      '整理された方向性',
      '安心できるつながり',
      '自分らしい表現の場',
      '続けられる仕組み',
    ],
    optionScores: [
      { action: 3 },
      { structure: 3 },
      { empathy: 3 },
      { expression: 3 },
      { stability: 3 },
    ],
  },
];

/** @deprecated MAIN_QUESTIONS を使用 */
export const QUESTIONS = MAIN_QUESTIONS;

export const TOTAL_MAIN_QUESTIONS = MAIN_QUESTIONS.length;
export const TOTAL_QUESTIONS = TOTAL_MAIN_QUESTIONS + 1;

export const DIAGNOSIS_INTRO = `この診断では、正解・不正解はありません。

どれも少しずつ当てはまる場合でも、
「今の自分に一番近いもの」を1つ選んでください。

能力の有無ではなく、
無意識に優先しやすい反応や、自然に出やすいパターンを見るための質問です。`;
