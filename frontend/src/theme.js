import {extendTheme} from '@chakra-ui/react';
import COLORS from './utils/colors';

const theme = extendTheme({
  fonts: {
    body: 'Raleway, sans-serif',
    heading: 'Raleway, sans-serif',
    mono: 'Raleway, sans-serif',
  },
  colors: {
    primary: {
      300: COLORS.primary,
      500: COLORS.primaryDark,
    },
    secondary: {
      300: COLORS.secondary,
    },
    white: {
      300: COLORS.white,
    },
    black: {
      300: COLORS.black,
    },
  },
});

export default theme;
