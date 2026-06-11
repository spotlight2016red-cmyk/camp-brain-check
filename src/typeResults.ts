import type { AxisKey, BrainTypeId } from './types';

export interface TypeResult {
  id: BrainTypeId;
  axes: [AxisKey, AxisKey];
  typeName: string;
  avatarName: string;
  description: string;
  strongEnvironment: string;
  fatiguePattern: string;
  practicalUsage: string;
  deepDivePoint: string;
}

export const TYPE_RESULTS: TypeResult[] = [
  {
    id: 'intuition-expression',
    axes: ['intuition', 'expression'],
    typeName: '直感表現タイプ',
    avatarName: 'ひらめきの旅人',
    description: 'ひらめきを言葉や形にして届ける力があります。感覚で掴んだものを、そのまま外に出すことで周囲を動かせます。',
    strongEnvironment: '自由に発想を試せる場・即フィードバックがある場・創作や企画の初期フェーズ',
    fatiguePattern: '細部の詰めやルールの厳守が続く環境・ひらめきを否定される場',
    practicalUsage:
      'ひらめきや感覚を頭の中だけに留めず、メモ・言葉・小さな形にして外へ出すと力が出やすいタイプです。まずは思いついたことを短く書き出したり、人に話してみることから始めると流れが生まれます。',
    deepDivePoint: 'ひらめきをどう形にし、どこまで届けたいのか。自分の表現の「型」を見つける',
  },
  {
    id: 'intuition-empathy',
    axes: ['intuition', 'empathy'],
    typeName: '直感共感タイプ',
    avatarName: 'こころの受信士',
    description: '相手の気持ちや空気を敏感に受け取り、言葉にならない違和感にも気づけます。深い理解を土台に関係を育てます。',
    strongEnvironment: '少人数の対話・信頼関係がある場・相手の本音を聴ける時間',
    fatiguePattern: '感情のケアが一方通行・空気を読み続けるだけの場・自分の意見を出せない環境',
    practicalUsage:
      '人や場から受け取った感覚を大切にしながらも、全部を抱え込みすぎないことが大切です。感じたことを一度メモに出し、「自分の感情」と「相手から受け取ったもの」を分けると整いやすくなります。',
    deepDivePoint: '受け取りすぎる境界線と、自分の感覚を大切にする方法',
  },
  {
    id: 'structure-stability',
    axes: ['structure', 'stability'],
    typeName: '構造整理タイプ',
    avatarName: '地図づくりの賢者',
    description: '情報を整理し、再現できる仕組みに落とし込む力があります。全体像を見て、持続可能な形をつくれます。',
    strongEnvironment: '計画を立てられる場・役割が明確・継続的に改善できる環境',
    fatiguePattern: '曖昧な方針のまま走り続ける場・急な方針転換・整理する時間がない状態',
    practicalUsage:
      '頭の中が散らかっている時ほど、紙やメモに書き出して順番をつけると力が出やすいタイプです。日常では、やることを3つに絞る、手順を見える化するなど、小さな整理が安心につながります。',
    deepDivePoint: '完璧な地図を求めすぎないことと、変化に合わせて更新する柔らかさ',
  },
  {
    id: 'structure-expression',
    axes: ['structure', 'expression'],
    typeName: '企画設計タイプ',
    avatarName: '流れを編む設計士',
    description: 'アイデアを構造にし、人が動きやすい流れとして設計できます。見せ方と仕組みの両方を整える力があります。',
    strongEnvironment: '企画・設計の主導権がある場・チームで形にできる環境・プレゼンや共有の機会',
    fatiguePattern: '設計なしに実行だけが求められる場・自分の意図が伝わらない状態',
    practicalUsage:
      'バラバラの情報や想いを、企画・流れ・形に変えることで力を発揮しやすいタイプです。思いついたことをすぐ完成させようとせず、まずは目的・対象・流れの3つに分けて整理すると進みやすくなります。',
    deepDivePoint: '設計へのこだわりと、現場の声を取り込むバランス',
  },
  {
    id: 'action-intuition',
    axes: ['action', 'intuition'],
    typeName: '行動突破タイプ',
    avatarName: '道ひらきの冒険者',
    description: 'まず動き、試しながら道を切り開く力があります。直感を信じて一歩踏み出すことで、新しい可能性を開けます。',
    strongEnvironment: '試行錯誤が歓迎される場・スピード感がある環境・自分で決められる裁量',
    fatiguePattern: '動く前に完璧な計画を求められる場・失敗が許されない文化',
    practicalUsage:
      '考え続けるより、小さく動くことで流れが見えてくるタイプです。大きく始めるより、まず15分だけ試す、1人に話す、1つだけ動かすなど、小さな実験を日常に入れると力が出やすくなります。',
    deepDivePoint: '衝動的な行動と、振り返りを通じた学びの循環',
  },
  {
    id: 'action-stability',
    axes: ['action', 'stability'],
    typeName: '現場実践タイプ',
    avatarName: '積み上げの職人',
    description: 'コツコツ実行し、確実に積み上げる力があります。現場で手を動かし、信頼される成果を出せます。',
    strongEnvironment: 'ルーティンと改善の両立・成果が見える場・継続的な取り組み',
    fatiguePattern: '方針が毎回変わる場・準備なしの突発タスク・評価基準が曖昧な環境',
    practicalUsage:
      '手を動かしながら、少しずつ改善していくことで力を発揮しやすいタイプです。完璧な計画より、今日できる一手を決めて実行し、終わった後に少し振り返る流れを作ると安定しやすくなります。',
    deepDivePoint: '「続ける力」を活かしつつ、新しい挑戦への余白をどうつくるか',
  },
  {
    id: 'empathy-stability',
    axes: ['empathy', 'stability'],
    typeName: '共感伴走タイプ',
    avatarName: '灯りの伴走者',
    description: '相手のペースに寄り添い、安心できる関係を長く育てられます。支える立場で場の安定をつくる力があります。',
    strongEnvironment: '継続的な関係性・感謝や信頼が言葉になる場・伴走型の役割',
    fatiguePattern: '自分のケアが後回しになる場・境界線のない支援要求・孤独な支え役',
    practicalUsage:
      '人に寄り添い、安心できる関係を育てることで力を発揮しやすいタイプです。ただし相手に合わせすぎると疲れやすいので、自分の休む時間や境界線も先に決めておくと、無理なく支え続けられます。',
    deepDivePoint: '伴走しながらも、自分のエネルギーを守る方法',
  },
  {
    id: 'empathy-structure',
    axes: ['empathy', 'structure'],
    typeName: '場づくり調和タイプ',
    avatarName: '場を整える守り人',
    description: '人の関係性と役割を整え、みんなが働きやすい場をつくれます。調整と構造化のバランスが取れた力があります。',
    strongEnvironment: 'ファシリテーションの機会・チームづくり・対立の調整が必要な場',
    fatiguePattern: '調整役だけが負担を抱える場・感謝されない橋渡し役・全員の機嫌を取る状態',
    practicalUsage:
      '人や場の動きを見ながら、全体が進みやすいように整えることで力を発揮しやすいタイプです。日常では、誰が何に困っているか、どこが詰まっているかを見つけ、小さく整える役割を意識すると強みになります。',
    deepDivePoint: '場を整える喜びと、自分の本音を置き去りにしないこと',
  },
];
