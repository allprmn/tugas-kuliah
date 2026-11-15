export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- WARNA LIGHT MODE (ABU-PUTIH) ---
        "background": "#f4f4f5",                // Latar belakang abu-abu terang
        "on-background": "#18181b",             // Teks utama (hitam)
        "surface": "#f4f4f5",                   
        "on-surface": "#18181b",                // Teks di atas kartu
        "on-surface-variant": "#71717a",        // Teks sekunder (abu)
        
        // Kartu & Container
        "surface-container-lowest": "#ffffff",  // Putih bersih
        "surface-container-low": "#ffffff",     // Latar kartu
        "surface-container": "#e4e4e7",         // Latar elemen dalam kartu
        "surface-container-high": "#d4d4d8",    // Hover state
        "surface-container-highest": "#a1a1aa", // Border/Limit
        
        // Garis Luar
        "outline": "#a1a1aa",
        "outline-variant": "#e4e4e7",
        
        // Warna Utama (Primary) & Status
        "primary": "#2563eb",                   // Biru utama
        "on-primary": "#ffffff",                // Teks di atas biru
        "primary-container": "#dbeafe",         // Biru sangat muda (badge/latar)
        "on-primary-container": "#1e40af",      // Biru gelap (teks badge)
        
        "secondary": "#0284c7",
        "on-secondary": "#ffffff",
        "secondary-container": "#e0f2fe",
        "on-secondary-container": "#0c4a6e",
        
        "tertiary": "#059669",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#d1fae5",
        "on-tertiary-container": "#065f46",
        
        "error": "#dc2626",
        "on-error": "#ffffff",
        "error-container": "#fee2e2",
        "on-error-container": "#991b1b",
        
        // Sisanya dibiarkan sama (karena menggunakan varian warna di atas)
        "on-secondary-fixed-variant": "#004b73", "on-error": "#690005", "tertiary-container": "#007d55", "on-secondary": "#003351", "on-secondary-container": "#002c47", "on-tertiary-fixed": "#002113", "secondary-fixed": "#cce5ff", "on-tertiary-fixed-variant": "#005236", "primary-fixed-dim": "#b4c5ff", "on-tertiary-container": "#bdffdb", "surface-bright": "#ffffff", "tertiary-fixed": "#6ffbbe", "secondary-fixed-dim": "#93ccff", "primary-fixed": "#dbe1ff", "inverse-on-surface": "#283044", "inverse-primary": "#0053db", "surface-variant": "#e4e4e7", "on-primary-fixed": "#00174b", "inverse-surface": "#18181b", "surface-dim": "#e4e4e7", "tertiary-fixed-dim": "#4edea3", "surface-tint": "#b4c5ff", "on-primary-fixed-variant": "#003ea8", "on-secondary-fixed": "#001d31", "on-tertiary": "#003824"
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