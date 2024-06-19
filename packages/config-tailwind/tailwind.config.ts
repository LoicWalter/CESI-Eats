import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        button: {
          primary: {
            default: 'var(--color-button-primary-default)',
            pressed: 'var(--color-button-primary-pressed)',
            disabled: 'var(--color-button-primary-disabled)',
          },
          secondary: {
            borderColorDefault: 'var(--color-button-secondary-border-default)',
            borderColorPressed: 'var(--color-button-secondary-border-pressed)',
            borderColorDisabled: 'var(--color-button-secondary-border-disabled)',
          },
        },

        alternative: '#394D59',
        gray: {
          1: '#131D26',
          2: '#394D59',
          3: '#859097',
          4: '#CCD1D4',
          5: '#F5F5F5',
        },
        black: '#000000',
        white: '#FFFFFF',
        success: '#007B40',
        error: '#F03D3E',
        notification: '#D84910',
      },
      fontFamily: {
        display: ['IBM Plex Sans', 'sans-serif'],
      },
      button: {
        borderRadius: '0.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
