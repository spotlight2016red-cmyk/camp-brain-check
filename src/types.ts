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
  deepDivePoint?: string;
  axes?: [AxisKey, AxisKey];
  isUndetermined: boolean;
}

export interface DiagnosisOutcome {
  result: DiagnosisResult;
  /** 6軸結果を優先し、決め手が別タイプだった場合の補足 */
  tiebreakerNote?: string;
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
