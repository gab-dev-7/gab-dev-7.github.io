/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import scrollbar from "tailwind-scrollbar";
import scrollbarHide from "tailwind-scrollbar-hide";

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        /* --- YOUR CUSTOM TOKYO NIGHT PALETTE --- */

        // The background (Deep Alley Blue)
        "nvim-bg": "#050a14",

        // The text (Soft White/Blue)
        "nvim-fg": "#e6f1ff",

        // Secondary background (slightly lighter for status bars)
        "nvim-gray": "#1a202c",
        "nvim-statusline": "#0f172a",

        // ACCENTS
        // We map 'blue' to your Neon Cyan
        blue: "#00f2ff",

        // We map 'green' to your Lantern Red (Since you didn't want a green portfolio)
        green: "#ff003c",

        /* --- LOGIC FOR CSS VARIABLES (Do not touch) --- */
        skin: {
          hue: withOpacity("--color"),
          muted: withOpacity("--muted"),
          fill: withOpacity("--color-fill"), // Links to the variable in globals.css
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-text-inverted"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-accent-hover": withOpacity("--color-button-accent-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
        nvim: {
          // Updating these to use your new variables too
          blue: "#00f2ff",
          green: "#ff003c",
        },
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
        nvim: {
          green: "#ff003c", // Lantern Red
          blue: "#00f2ff", // Neon Cyan
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-accent-hover": withOpacity("--color-button-accent-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
      ringColor: {
        skin: {
          fill: withOpacity("--color-fill"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    daisyui,
    scrollbar,
    scrollbarHide,
  ],
};

