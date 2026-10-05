import type { ProgramCategory } from '../model/schema';

export const PROGRAM_CATEGORY_BORDER: Record<ProgramCategory, string> = {
  plenary: 'border-program-plenary',
  presentation: 'border-program-presentation',
  screening: 'border-program-screening',
  pitching: 'border-program-pitching',
  business: 'border-program-business',
  'public-talk': 'border-program-public-talk',
  break: 'border-program-break',
};
