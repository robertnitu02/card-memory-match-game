type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]?: U;
};

export const TableDimensionByDifficulty: EnumDictionary<number, number> = {
  0: 4,
  1: 6,
  2: 8,
};

export const Icons = [
  '🐉',
  '🌊',
  '🥃',
  '🌮',
  '🤿',
  '🎰',
  '🌌',
  '🗽',
  '🍎',
  '🧀',
  '🥗',
  '🧊',
  '🏍',
  '🌠',
  '📡',
  '📟',
  '⚒',
  '💎',
  '🧮',
  '💜',
  '☢',
  '♻',
  '♦',
  '♣',
  '👻',
  '🦿',
  '🦷',
  '🩸',
  '💅',
  '🕴',
  '🥼',
  '🩱',
  '🌪',
  '💥',
  '🦐',
  '🎅🏾',
];
