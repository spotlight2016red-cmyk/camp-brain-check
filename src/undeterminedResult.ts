import type { DiagnosisResult } from './types';

export const UNDETERMINED_RESULT: DiagnosisResult = {
  id: 'undetermined',
  typeName: 'まだ傾向がはっきり出ていないタイプ',
  avatarName: 'これから見えてくる人',
  description:
    '今回の回答では、特定の傾向が強く出ませんでした。これは悪い結果ではなく、まだ一つのタイプに絞らない方がよい状態とも言えます。合宿では、対話やワークを通して、あなたの反応や感覚を丁寧に見ていきます。',
  isUndetermined: true,
};
