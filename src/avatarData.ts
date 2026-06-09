import type { BrainTypeId } from './types';

export interface CampAvatar {
  id: BrainTypeId;
  name: string;
  image: string;
}

export const CAMP_AVATARS: CampAvatar[] = [
  { id: 'intuition-expression', name: 'ひらめきの旅人', image: '/avatars/intuition-expression.svg' },
  { id: 'intuition-empathy', name: 'こころの受信士', image: '/avatars/intuition-empathy.svg' },
  { id: 'structure-stability', name: '地図づくりの賢者', image: '/avatars/structure-stability.svg' },
  { id: 'structure-expression', name: '流れを編む設計士', image: '/avatars/structure-expression.svg' },
  { id: 'action-intuition', name: '道ひらきの冒険者', image: '/avatars/action-intuition.svg' },
  { id: 'action-stability', name: '積み上げの職人', image: '/avatars/action-stability.svg' },
  { id: 'empathy-stability', name: '灯りの伴走者', image: '/avatars/empathy-stability.svg' },
  { id: 'empathy-structure', name: '場を整える守り人', image: '/avatars/empathy-structure.svg' },
];

export const AVATAR_BY_ID = Object.fromEntries(
  CAMP_AVATARS.map((a) => [a.id, a]),
) as Record<BrainTypeId, CampAvatar>;
