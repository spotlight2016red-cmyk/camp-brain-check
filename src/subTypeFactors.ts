import type { BrainTypeId } from './types';

/** 各タイプがサブ要因として働くときの説明 */
export const SUB_TYPE_FACTOR_DESCRIPTIONS: Record<BrainTypeId, string> = {
  'intuition-expression':
    '感覚やひらめきを言葉や形にして届けたいという資質が、表に出やすい反応を補い、思いを外に届ける力を加えます。',
  'intuition-empathy':
    '人や場の空気を感じ取り、本質に触れる感覚が、表に出やすい反応を補い、深い理解や共感の視点を加えます。',
  'structure-stability':
    '情報を整理して道筋や仕組みをつくる感覚が、表に出やすい反応を補い、安定して続けられる土台を加えます。',
  'structure-expression':
    'バラバラの想いや情報をつなげて企画や形にしたい感覚が、表に出やすい反応を補い、設計や表現の視点を加えます。',
  'action-intuition':
    'まず動いてみることで道が見えてくる感覚が、表に出やすい反応を補い、試行と発見の視点を加えます。',
  'action-stability':
    '手を動かしながら着実に形にしていく感覚が、表に出やすい反応を補い、実行と積み上げの視点を加えます。',
  'empathy-stability':
    '誰かに寄り添い、安心して進めるように支える感覚が、表に出やすい反応を補い、伴走と安定の視点を加えます。',
  'empathy-structure':
    '全体を見ながら人や場が動きやすいように整える感覚が、表に出やすい反応を補い、調整と場づくりの視点を加えます。',
};
