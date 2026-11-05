/**
 * Curatorial Mineral & Darkroom Cover Gradients
 * 博物馆矿物与暗房展板封面渐变色板
 */

export const CURATORIAL_GRADIENTS = [
  "from-[#C8432B] via-[#9E2E1D] to-[#1D1210]", // 0: Curatorial Vermilion
  "from-[#332B66] via-[#4A3BC2] to-[#141222]", // 1: Royal Ultramarine
  "from-[#194434] via-[#245E47] to-[#0D1E17]", // 2: Malachite Green
  "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]", // 3: Imperial Plum
  "from-[#A66C14] via-[#C8432B] to-[#21170F]", // 4: Archive Ochre
  "from-[#1B455C] via-[#2A6888] to-[#0E1E28]", // 5: Aegean Cerulean
  "from-[#7D2630] via-[#B5402A] to-[#1A1012]", // 6: Alizarin Crimson
  "from-[#3D2E6B] via-[#604A9E] to-[#161222]", // 7: Deep Amethyst
  "from-[#1E4C3B] via-[#32755B] to-[#0E1F19]", // 8: Celadon Jade
  "from-[#8A4E16] via-[#BA6B22] to-[#1F150C]", // 9: Raw Sienna Amber
  "from-[#1E365E] via-[#35578F] to-[#101828]", // 10: Prussian Cobalt
  "from-[#662B50] via-[#944073] to-[#1F101A]", // 11: Byzantine Magenta
  "from-[#2F522F] via-[#497A49] to-[#111D11]", // 12: Verdigris Forest
  "from-[#1B4A52] via-[#2A727D] to-[#0E1F23]", // 13: Pelagic Teal
  "from-[#4F2D6B] via-[#7B3A9B] to-[#1A1024]", // 14: Nocturne Violet
  "from-[#8C3A27] via-[#B35237] to-[#1E110E]", // 15: Burnt Terracotta
  "from-[#24453A] via-[#3B6B5C] to-[#0F1E19]", // 16: Alpine Cypress
  "from-[#2B3A67] via-[#41589C] to-[#12182B]", // 17: Twilight Indigo
  "from-[#614728] via-[#8F6A3D] to-[#1E170F]", // 18: Patina Bronze
  "from-[#354347] via-[#52686F] to-[#161B1D]", // 19: Obsidian Slate
] as const;

export type CuratorialGradient = (typeof CURATORIAL_GRADIENTS)[number];

export const VALID_CURATORIAL_GRADIENTS: ReadonlySet<string> = new Set(
  CURATORIAL_GRADIENTS
);
