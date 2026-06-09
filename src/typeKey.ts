import type { BrainTypeId, DiagnosisTypeId } from './types';

const TYPE_KEY_BY_ID: Record<BrainTypeId, string> = {
  'intuition-expression': 'intuitive_expression',
  'intuition-empathy': 'intuitive_empathy',
  'structure-stability': 'structure_stability',
  'structure-expression': 'structure_expression',
  'action-intuition': 'action_intuition',
  'action-stability': 'action_stability',
  'empathy-stability': 'empathy_stability',
  'empathy-structure': 'empathy_structure',
};

export function getTypeKey(typeId: DiagnosisTypeId): string | null {
  if (typeId === 'undetermined') return null;
  return TYPE_KEY_BY_ID[typeId];
}
