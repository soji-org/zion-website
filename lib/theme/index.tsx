import { semanticColors, themeAlphaColors } from "../colors";

const DARK_ALTERNATE_TEXT = "#C4C4C4";

export type ThemeTokens = {
  BACKGROUND_COLOR: string;
  TEXT_COLOR: string;
  GREY_BODY_COLOR: string;
  SMALL_TEXT_COLOR: string;
  INPUT_BACKGROUND: string;
  INPUT_BORDER: string;
  CARD_BACKGROUND: string;
  BUTTON_TEXT: string;
  ALTERNATE_TEXT: string;
};

export const lightTheme: ThemeTokens = {
  BACKGROUND_COLOR: semanticColors.surface.page,
  TEXT_COLOR: semanticColors.text.primary,
  GREY_BODY_COLOR: semanticColors.surface.pageMuted,
  SMALL_TEXT_COLOR: semanticColors.text.secondary,
  INPUT_BACKGROUND: themeAlphaColors.light.INPUT_BACKGROUND,
  INPUT_BORDER: themeAlphaColors.light.INPUT_BORDER,
  CARD_BACKGROUND: themeAlphaColors.light.CARD_BACKGROUND,
  BUTTON_TEXT: semanticColors.text.inverse,
  ALTERNATE_TEXT: semanticColors.text.secondary,
};

export const darkTheme: ThemeTokens = {
  BACKGROUND_COLOR: semanticColors.surface.inversePage,
  TEXT_COLOR: semanticColors.text.inverse,
  GREY_BODY_COLOR: semanticColors.surface.inverseMuted,
  SMALL_TEXT_COLOR: semanticColors.text.inverseSecondary,
  INPUT_BACKGROUND: themeAlphaColors.dark.INPUT_BACKGROUND,
  INPUT_BORDER: themeAlphaColors.dark.INPUT_BORDER,
  CARD_BACKGROUND: themeAlphaColors.dark.CARD_BACKGROUND,
  BUTTON_TEXT: semanticColors.text.inverse,
  ALTERNATE_TEXT: DARK_ALTERNATE_TEXT,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeMode = keyof typeof themes;
export type Theme = (typeof themes)[ThemeMode];
