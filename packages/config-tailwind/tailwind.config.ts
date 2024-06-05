import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
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
        button: {
          alternative: {
            default: '#394D59',
            pressed: '#131D26',
            disabled: 'rgba(57, 77, 89, 0.5)',
          },
        },
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
