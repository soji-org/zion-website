import type { Config } from "tailwindcss";
import { baseColors, semanticColors } from "./lib/colors";

export default {
  darkMode: "media",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "'IBM Plex Sans'", "'Hanken Grotesk'", "Barlow", "'Host Grotesk'", "'DM Sans'", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "'IBM Plex Sans'", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "'IBM Plex Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        // Legacy aliases mapped to the current brand palette.
        cream: semanticColors.surface.pageMuted,
        charcoal: semanticColors.text.primary,
        ember: semanticColors.brand.primary,
        sage: semanticColors.pastel.purple,

        // Semantic color contract for app code.
        brand: {
          primary: semanticColors.brand.primary,
          primaryHover: semanticColors.brand.primaryHover,
          highlight: semanticColors.brand.highlight,
        },
        surface: {
          page: semanticColors.surface.page,
          muted: semanticColors.surface.pageMuted,
          card: semanticColors.surface.card,
          inverse: semanticColors.surface.inversePage,
          inverseMuted: semanticColors.surface.inverseMuted,
        },
        ink: {
          DEFAULT: semanticColors.text.primary,
          muted: semanticColors.text.secondary,
          subtle: semanticColors.text.tertiary,
          inverse: semanticColors.text.inverse,
          "inverse-muted": semanticColors.text.inverseSecondary,
        },
        status: {
          success: semanticColors.status.success,
          info: semanticColors.status.info,
          destructive: semanticColors.status.destructive,
        },
        pastel: {
          purple: semanticColors.pastel.purple,
          "purple-start": semanticColors.pastel.purpleGradientStart,
          "purple-end": semanticColors.pastel.purpleGradientEnd,
        },

        // Raw palette access when a design needs exact tokens.
        palette: {
          primary: {
            DEFAULT: baseColors.primary.PURPLE,
            100: baseColors.primary.PURPLE_100,
          },
          black: {
            DEFAULT: baseColors.black.BLACK,
            app: baseColors.black.APP_BLACK,
            100: baseColors.black.BLACK_100,
            200: baseColors.black.BLACK_200,
            300: baseColors.black.BLACK_300,
            400: baseColors.black.BLACK_400,
          },
          charcoal: {
            DEFAULT: baseColors.black.CHARCOAL,
            100: baseColors.black.CHARCOAL_100,
          },
          white: {
            DEFAULT: baseColors.neutral.WHITE,
            100: baseColors.neutral.WHITE_100,
          },
          grey: {
            100: baseColors.neutral.GREY_100,
            200: baseColors.neutral.GREY_200,
            300: baseColors.neutral.GREY_300,
            400: baseColors.neutral.GREY_400,
            500: baseColors.neutral.GREY_500,
            600: baseColors.neutral.GREY_600,
            700: baseColors.neutral.GREY_700,
            800: baseColors.neutral.GREY_800,
            900: baseColors.neutral.GREY_900,
            1000: baseColors.neutral.GREY_1000,
            1100: baseColors.neutral.GREY_1100,
            1200: baseColors.neutral.GREY_1200,
          },
          gray: {
            100: baseColors.neutral.GRAY_100,
            200: baseColors.neutral.GRAY_200,
            300: baseColors.neutral.GRAY_300,
            400: baseColors.neutral.GRAY_400,
            500: baseColors.neutral.GRAY_500,
            550: baseColors.neutral.GRAY_550,
          },
          accent: {
            success: baseColors.accent.GREEN_SUCCESS,
            successLight: baseColors.accent.GREEN_LIGHT,
            info: baseColors.accent.INFO_DARK,
            lemon: baseColors.accent.LEMON_PRIMARY,
            destructive: baseColors.accent.RED,
          },
          pastel: {
            yellow: baseColors.pastel.LIGHT_YELLOW,
            pink: baseColors.pastel.LIGHT_PINK,
            orange: baseColors.pastel.LIGHT_ORANGE,
            blue: baseColors.pastel.LIGHT_BLUE,
            green: baseColors.accent.LIGHT_GREEN,
            green100: baseColors.pastel.LIGHT_GREEN_100,
            purple: baseColors.pastel.LIGHT_PURPLE,
            purpleStart: baseColors.pastel.LIGHT_PURPLE_GRADIENT_START,
            purpleEnd: baseColors.pastel.LIGHT_PURPLE_GRADIENT_END,
          },
        },

        // System Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
