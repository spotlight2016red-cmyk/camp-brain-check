import type { DiagnosisTypeId } from './types';
import { getTypeKey } from './typeKey';

export function getTypeCardImageUrl(typeId: DiagnosisTypeId): string | null {
  const typeKey = getTypeKey(typeId);
  return typeKey ? `/cards/${typeKey}.png` : null;
}
