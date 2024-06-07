import type { Config } from 'tailwindcss';

enum CustomerColors {
  PRIMARY = '#DD231B',
  SECONDARY = '#A8130A',
  DISABLED = 'rgba(221, 35, 27, 0.5)',
}
enum DeliveryBoyColors {
  PRIMARY = '#49ADF4',
  SECONDARY = '#005BC6',
  DISABLED = 'rgba(36, 124, 227, 0.5)',
}
enum RestaurantColors {
  PRIMARY = '#994D1C',
  SECONDARY = '#6B240C',
  DISABLED = 'rgba(107, 36, 12, 0.5)',
}

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        customer: {
          primary: CustomerColors.PRIMARY,
          secondary: CustomerColors.SECONDARY,
          button: {
            primary: {
              default: CustomerColors.PRIMARY,
              pressed: CustomerColors.SECONDARY,
              disabled: CustomerColors.DISABLED,
            },
            secondary: {
              borderColorDefault: CustomerColors.PRIMARY,
              borderColorPressed: CustomerColors.SECONDARY,
              borderColorDisabled: CustomerColors.DISABLED,
            },
          },
        },
        deliveryBoy: {
          primary: DeliveryBoyColors.PRIMARY,
          secondary: DeliveryBoyColors.SECONDARY,
          button: {
            primary: {
              default: DeliveryBoyColors.PRIMARY,
              pressed: DeliveryBoyColors.SECONDARY,
              disabled: DeliveryBoyColors.DISABLED,
            },
            secondary: {
              borderColorDefault: DeliveryBoyColors.PRIMARY,
              borderColorPressed: DeliveryBoyColors.SECONDARY,
              borderColorDisabled: DeliveryBoyColors.DISABLED,
            },
          },
        },
        restaurant: {
          primary: RestaurantColors.PRIMARY,
          secondary: RestaurantColors.SECONDARY,
          button: {
            primary: {
              default: RestaurantColors.PRIMARY,
              pressed: RestaurantColors.SECONDARY,
              disabled: RestaurantColors.DISABLED,
            },
            secondary: {
              borderColorDefault: RestaurantColors.PRIMARY,
              borderColorPressed: RestaurantColors.SECONDARY,
              borderColorDisabled: RestaurantColors.DISABLED,
            },
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
