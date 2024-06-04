// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./src/app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        primary: '#994D1C',
        secondary: '#6B240C',
        button: {
          primary: {
            default: '#994D1C',
            pressed: '#6B240C',
            disabled: 'rgba(107, 36, 12, 0.5)',
          },
          secondary: {
            borderColorDefault: '#994D1C',
            borderColorPressed: '#6B240C',
            borderColorDisabled: 'rgba(107, 36, 12, 0.5)',
          },
        },
      },
    },
  },
};

export default config;
