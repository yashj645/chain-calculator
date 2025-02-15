import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
      cardShadow: "0px 0px 6px 0px #0000000D",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        borderColor: "var(--border)",
        grey1: "var(--grey1)",
        grey2: "var(--grey2)",
        grey3: "var(--grey3)",
        black1: "var(--black1)",
        orange: "var(--orange)",
        borderOrange: "var(--border-orange)",
        lightOrange: "var(--light-orange)",
        green: "var(--green)",
        borderGreen: "var(--border-green)",
        lightGreen: "var(--light-green)",
      },
    },
  },
  plugins: [],
} satisfies Config;
