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

export type AxisScores = Record<AxisKey, number>;

export const AXIS_ORDER: AxisKey[] = [
  'intuition',
  'structure',
  'action',
  'empathy',
  'expression',
  'stability',
];
