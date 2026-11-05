/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#004b73", "primary": "#b4c5ff", "on-surface": "#dae2fd",
        "on-error": "#690005", "tertiary-container": "#007d55", "on-secondary": "#003351",
        "on-secondary-container": "#002c47", "on-tertiary-fixed": "#002113", "secondary-fixed": "#cce5ff",
        "surface-container-lowest": "#060e20", "surface-container-highest": "#2d3449",
        "on-tertiary-fixed-variant": "#005236", "primary-fixed-dim": "#b4c5ff",
        "on-tertiary-container": "#bdffdb", "error": "#ffb4ab", "surface-bright": "#31394d",
        "tertiary-fixed": "#6ffbbe", "secondary-fixed-dim": "#93ccff", "surface": "#0b1326",
        "primary-fixed": "#dbe1ff", "background": "#0b1326", "on-surface-variant": "#c3c6d7",
        "tertiary": "#4edea3", "inverse-on-surface": "#283044", "primary-container": "#2563eb",
        "outline": "#8d90a0", "inverse-primary": "#0053db", "outline-variant": "#434655",
        "on-primary-container": "#eeefff", "surface-variant": "#2d3449", "on-primary-fixed": "#00174b",
        "on-error-container": "#ffdad6", "secondary-container": "#3198dc", "secondary": "#93ccff",
        "inverse-surface": "#dae2fd", "surface-container-high": "#222a3d", "surface-dim": "#0b1326",
        "surface-container": "#171f33", "error-container": "#93000a", "tertiary-fixed-dim": "#4edea3",
        "surface-tint": "#b4c5ff", "on-background": "#dae2fd", "on-primary-fixed-variant": "#003ea8",
        "on-secondary-fixed": "#001d31", "on-tertiary": "#003824", "surface-container-low": "#131b2e",
        "on-primary": "#002a78"
      },
      borderRadius: {
        DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"
      },
      spacing: {
        "space-xs": "0.25rem", "margin-sm": "1rem", "space-lg": "1.5rem", "margin": "2rem",
        "space-md": "1rem", "gutter": "1.5rem", "gutter-sm": "1rem", "space-xl": "2.5rem", "space-sm": "0.5rem"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans"], "body-lg": ["Inter"], "body-md": ["Inter"],
        "headline-lg": ["Plus Jakarta Sans"], "label-md": ["Inter"], "label-lg": ["Inter"],
        "body-sm": ["Inter"], "headline-md": ["Plus Jakarta Sans"], "display-mobile": ["Plus Jakarta Sans"],
        "label-sm": ["Inter"], "headline-sm": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "display": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-lg": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "headline-md": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "24px", fontWeight: "600" }],
      }
    }
  },
  plugins: [],
}