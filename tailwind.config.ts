import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'negro': '#231f20',
        'Pantone562': '#007366',
        'Pantone499': '#6c3231',
        'BlancoIvory': '#fffdf0',
        'Cobre': '#f29464',
        'Gris': '#ededed',
        'GrisFondo': '#f5f5f5',
        'Verde': '#4ED03B',
        'Rojo': '#FF0000',
        'rojo-pantone': '#8C2226',
        'azul-pantone': '#1B103B',
        "main": '#1e2167',
        "secondary":"#ffd200",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-animated")],
};
export default config;
