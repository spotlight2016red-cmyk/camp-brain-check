export type AxisKey =
  | 'intuition'
  | 'structure'
  | 'action'
  | 'empathy'
  | 'expression'
  | 'stability';

export const AXES: Record<AxisKey, { label: string; color: string }> = {
  intuition: { label: '直感性', color: '#FF9966' },
  structure: { label: '構造化', color: '#42A5F5' },
  action: { label: '行動性', color: '#66BB6A' },
  empathy: { label: '共感性', color: '#EC407A' },
  expression: { label: '表現性', color: '#FFB366' },
  stability: { label: '安定性', color: '#8D6E63' },
};

export type BrainTypeId =
  | 'intuition-expression'
  | 'intuition-empathy'
  | 'structure-stability'
  | 'structure-expression'
  | 'action-intuition'
  | 'action-stability'
  | 'empathy-stability'
  | 'empathy-structure';

export type DiagnosisTypeId = BrainTypeId | 'undetermined';

export interface DiagnosisResult {
  id: DiagnosisTypeId;
  typeName: string;
  avatarName: string;
  description: string;
  strongEnvironment?: string;
  fatiguePattern?: string;
  practicalUsage?: string;
  deepDivePoint?: string;
  axes?: [AxisKey, AxisKey];
  isUndetermined: boolean;
}

export type PatternType = 'matched' | 'composite';

export interface DiagnosisOutcome {
  /** Q1〜Q18から算出 */
  mainType: BrainTypeId;
  /** Q19で本人が選択 */
  subType: BrainTypeId;
  mainTypeDescription: string;
  subTypeDescription: string;
  combinedDescription: string;
  patternType: PatternType;
  /** メインタイプの表示用データ */
  result: DiagnosisResult;
  subTypeName: string;
  /** サブタイプの表示用データ */
  subTypeResult: DiagnosisResult;
}

export type AxisScores = Record<AxisKey, number>;

export const AXIS_ORDER: AxisKey[] = [
  'intuition',
  'structure',
  'action',
  'empathy',
  'expression',
  'stability',
];
