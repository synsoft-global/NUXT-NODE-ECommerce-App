import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#2E47BA",
          50: "#f2f4f8",
          100: "#e0e9f4",
          200: "#8293E0",
          800: "#0D1333",
        },
        dark: {
          DEFAULT: "#203551",
        },
        custom: {
          DEFAULT: "#6C7E95",
          50: "#f5f6fc",  // used
          100: "#E0E9F4",  // used
          200: "#f5f6fc",  // used
          800: "#203551", // used
        },
      },
    },
  },
};
