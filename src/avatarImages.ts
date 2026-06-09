import type { DiagnosisTypeId } from './types';
import { getTypeKey } from './typeKey';

export function getAvatarImageUrl(typeId: DiagnosisTypeId): string | null {
  const typeKey = getTypeKey(typeId);
  return typeKey ? `/avatars/${typeKey}.png` : null;
}
