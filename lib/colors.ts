// ========================================
// Base Colors
// ========================================

export const baseColors = {
  primary: {
    PURPLE: "#7D30E0",
    PURPLE_100: "#6D3EF4",
  },
  black: {
    BLACK: "#000000",
    APP_BLACK: "#161616",
    BLACK_100: "#1A1A1A",
    BLACK_200: "#1F1A1A",
    BLACK_300: "#1C1C1C",
    BLACK_400: "#101010",
    CHARCOAL: "#333333",
    CHARCOAL_100: "#222222",
  },
  neutral: {
    WHITE: "#FFFFFF",
    WHITE_100: "#F5F5F5",
    GREY_100: "#FEFEFE82",
    GREY_200: "#757575",
    GREY_300: "#E8E8E8",
    GREY_400: "#AEAEAE",
    GREY_500: "#B6B6B6",
    GREY_600: "#F9F8FA",
    GREY_700: "#989899",
    GREY_800: "#4C4C4D",
    GREY_900: "#E4E4E5",
    GREY_1000: "#FAFAFA",
    GREY_1100: "#E5E5E5",
    GREY_1200: "#828282",
    GRAY_100: "#F2F2F2",
    GRAY_200: "#E0E0E0",
    GRAY_300: "#4F4F4F",
    GRAY_400: "#B1B1B2",
    GRAY_500: "#BFBFBF",
    GRAY_550: "#E4E4E4",
  },
  accent: {
    GREEN_LIGHT: "#34C759",
    LIGHT_GREEN: "#A8DFAD",
    GREEN_SUCCESS: "#388E3C",
    INFO_DARK: "#0288D1",
    LEMON_PRIMARY: "#F5FF90",
    RED: "#CB382D",
  },
  pastel: {
    LIGHT_YELLOW: "#FFFFB5",
    LIGHT_PINK: "#FFE1E9",
    LIGHT_ORANGE: "#FFD8BE",
    LIGHT_BLUE: "#C4FBF8",
    LIGHT_GREEN_100: "#BDFCC3",
    LIGHT_PURPLE: "#D7ABFF",
    LIGHT_PURPLE_GRADIENT_START: "#E8D6FF",
    LIGHT_PURPLE_GRADIENT_END: "#CBB0FF",
  },
} as const;

export const { PURPLE, PURPLE_100 } = baseColors.primary;

export const {
  BLACK,
  APP_BLACK,
  BLACK_100,
  BLACK_200,
  BLACK_300,
  BLACK_400,
  CHARCOAL,
  CHARCOAL_100,
} = baseColors.black;

export const {
  WHITE,
  WHITE_100,
  GREY_100,
  GREY_200,
  GREY_300,
  GREY_400,
  GREY_500,
  GREY_600,
  GREY_700,
  GREY_800,
  GREY_900,
  GREY_1000,
  GREY_1100,
  GREY_1200,
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  GRAY_500,
  GRAY_550,
} = baseColors.neutral;

export const {
  GREEN_LIGHT,
  LIGHT_GREEN,
  GREEN_SUCCESS,
  INFO_DARK,
  LEMON_PRIMARY,
  RED,
} = baseColors.accent;

export const {
  LIGHT_YELLOW,
  LIGHT_PINK,
  LIGHT_ORANGE,
  LIGHT_BLUE,
  LIGHT_GREEN_100,
  LIGHT_PURPLE,
  LIGHT_PURPLE_GRADIENT_START,
  LIGHT_PURPLE_GRADIENT_END,
} = baseColors.pastel;

export const themeAlphaColors = {
  light: {
    INPUT_BACKGROUND: WHITE,
    INPUT_BORDER: GREY_300,
    CARD_BACKGROUND: WHITE,
  },
  dark: {
    INPUT_BACKGROUND: "rgba(255,255,255,0.05)",
    INPUT_BORDER: "rgba(255,255,255,0.1)",
    CARD_BACKGROUND: "rgba(255,255,255,0.06)",
  },
} as const;

export const semanticColors = {
  brand: {
    primary: PURPLE,
    primaryHover: PURPLE_100,
    highlight: LEMON_PRIMARY,
  },
  surface: {
    page: WHITE,
    pageMuted: GREY_600,
    card: WHITE,
    inversePage: APP_BLACK,
    inverseMuted: CHARCOAL,
  },
  text: {
    primary: APP_BLACK,
    secondary: GREY_800,
    tertiary: GREY_200,
    inverse: WHITE,
    inverseSecondary: GRAY_400,
  },
  border: {
    subtle: GREY_300,
    strong: GREY_1100,
    inverse: themeAlphaColors.dark.INPUT_BORDER,
  },
  status: {
    success: GREEN_SUCCESS,
    successLight: GREEN_LIGHT,
    info: INFO_DARK,
    destructive: RED,
  },
  pastel: {
    yellow: LIGHT_YELLOW,
    pink: LIGHT_PINK,
    orange: LIGHT_ORANGE,
    blue: LIGHT_BLUE,
    green: LIGHT_GREEN,
    greenStrong: LIGHT_GREEN_100,
    purple: LIGHT_PURPLE,
    purpleGradientStart: LIGHT_PURPLE_GRADIENT_START,
    purpleGradientEnd: LIGHT_PURPLE_GRADIENT_END,
  },
} as const;

export const palette = {
  base: baseColors,
  semantic: semanticColors,
  themeAlpha: themeAlphaColors,
} as const;

export const colors = {
  primary: { DEFAULT: PURPLE, 100: PURPLE_100 },
  black: {
    DEFAULT: BLACK,
    app: APP_BLACK,
    100: BLACK_100,
    200: BLACK_200,
    300: BLACK_300,
    400: BLACK_400,
  },
  charcoal: { DEFAULT: CHARCOAL, 100: CHARCOAL_100 },
  white: { DEFAULT: WHITE, 100: WHITE_100 },
  grey: {
    100: GREY_100,
    200: GREY_200,
    300: GREY_300,
    400: GREY_400,
    500: GREY_500,
    600: GREY_600,
    700: GREY_700,
    800: GREY_800,
    900: GREY_900,
    1000: GREY_1000,
    1100: GREY_1100,
    1200: GREY_1200,
  },
  gray: {
    100: GRAY_100,
    200: GRAY_200,
    300: GRAY_300,
    400: GRAY_400,
    500: GRAY_500,
    550: GRAY_550,
  },
  green: { light: GREEN_LIGHT, success: GREEN_SUCCESS },
  info: { dark: INFO_DARK },
  lemon: { primary: LEMON_PRIMARY },
  red: { DEFAULT: RED },
  pastel: {
    yellow: LIGHT_YELLOW,
    pink: LIGHT_PINK,
    orange: LIGHT_ORANGE,
    blue: LIGHT_BLUE,
    green: LIGHT_GREEN,
    green100: LIGHT_GREEN_100,
    purple: LIGHT_PURPLE,
    purpleGradientStart: LIGHT_PURPLE_GRADIENT_START,
    purpleGradientEnd: LIGHT_PURPLE_GRADIENT_END,
  },
} as const;
