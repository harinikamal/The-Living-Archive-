/**
 * The Living Archive — Canonical Themes
 * Represents the fundamental emotional currents and ideas connecting literary entries.
 */

export const THEMES = [
  {
    id: 'longing',
    name: 'Longing',
    description: 'The ache for what is distant, unheld, or yet to arrive.',
    glyph: '◇'
  },
  {
    id: 'belonging',
    name: 'Belonging',
    description: 'Finding shelter in a room, a language, or another human voice.',
    glyph: '◈'
  },
  {
    id: 'grief',
    name: 'Grief',
    description: 'Love that has outlived its vessel and must learn to inhabit silence.',
    glyph: '⬖'
  },
  {
    id: 'freedom',
    name: 'Freedom',
    description: 'The terrifying lightness of untethering from who you were expected to be.',
    glyph: '✧'
  },
  {
    id: 'becoming',
    name: 'Becoming',
    description: 'The gradual, often fractured metamorphosis into one’s own shape.',
    glyph: '✦'
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'The dust motes in late sun; what remains when the house is emptied.',
    glyph: '⬗'
  },
  {
    id: 'home',
    name: 'Home',
    description: 'A threshold, a smell of salt or tea, an address you can never entirely return to.',
    glyph: '▲'
  },
  {
    id: 'solitude',
    name: 'Solitude',
    description: 'The quiet companion of the evening desk, untouched by loneliness.',
    glyph: '◉'
  }
];

export function getThemeByName(name) {
  return THEMES.find(t => t.name.toLowerCase() === name.toLowerCase());
}
