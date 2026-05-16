
export enum Perspective {
  FIRST_PERSON = 'Character First-Person (第一人称视角)',
  BIRDS_EYE = "Scene Bird's-Eye (鸟瞰视角)",
  GRAND_AERIAL = 'Grand Aerial View (大航拍视角)',
  TOP_DOWN = 'Top-Down Shot (俯拍视角)',
  POV = 'Character POV (POV视角)',
  PANORAMA = 'Character Panorama (全景视角)',
  CLOSE_UP = 'Character Close-up (角色特写)',
  WORMS_EYE = "Worm's-Eye View (虫视角)",
  LOW_ANGLE = 'Low Angle Shot (仰拍镜头)',
  EYE_LEVEL = 'Eye-Level Shot (平视镜头)',
  REVERSE_SHOT = 'Over-the-Shoulder / Reverse (反打镜头)',
  ORBIT_SHOT = 'Orbiting Shot (环绕角色镜头)'
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '3:4';

export interface GenerationResult {
  id: string;
  imageUrl: string;
  perspective: Perspective;
  aspectRatio: AspectRatio;
  timestamp: number;
}
