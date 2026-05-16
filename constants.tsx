
import { Perspective } from './types';

export const PERSPECTIVE_PROMPTS: Record<Perspective, string> = {
  [Perspective.FIRST_PERSON]: "A first-person perspective (FPV) view looking out from the character's eyes. The character's hands or items might be partially visible in the foreground, showing exactly what they see in this environment.",
  [Perspective.BIRDS_EYE]: "A vast, wide-angle bird's-eye view from high above in the sky, looking down on the entire landscape and scene layout. Everything below looks small and mapped out.",
  [Perspective.GRAND_AERIAL]: "An extreme wide-angle grand aerial view from a very high altitude, capturing the entire city or landscape. The scale is massive, showing grand architecture and geography from a majestic high-altitude drone perspective, emphasizing the vastness of the world.",
  [Perspective.TOP_DOWN]: "A high-angle top-down cinematic drone shot looking directly down at the character and the immediate surroundings within the scene.",
  [Perspective.POV]: "A subjective point-of-view shot looking through the character's eyes, focused on a specific interaction or detail in the environment.",
  [Perspective.PANORAMA]: "A cinematic wide panorama shot showing the character in full (head to toe) standing within the majestic and expansive environment.",
  [Perspective.CLOSE_UP]: "A dramatic cinematic close-up focusing intensely on the character's face or upper body, capturing fine details and emotions against the background scene.",
  [Perspective.WORMS_EYE]: "An extreme low-angle worm's-eye view from the ground level looking straight up at the character and the towering environment elements above.",
  [Perspective.LOW_ANGLE]: "A powerful low-angle shot looking up at the scene, making the character and architecture appear tall and heroic.",
  [Perspective.EYE_LEVEL]: "A natural eye-level perspective shot, balanced and neutral, showing the scene exactly as if standing right there.",
  [Perspective.REVERSE_SHOT]: "A cinematic over-the-shoulder reverse angle shot, looking past the character at the environment or another implied subject.",
  [Perspective.ORBIT_SHOT]: "A dynamic orbital view that circles around the character, capturing a sense of motion and the full 360-degree environment."
};

export const ASPECT_RATIOS: { label: string; value: string }[] = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Landscape (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Classic (3:4)', value: '3:4' }
];
