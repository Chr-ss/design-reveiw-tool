import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    files: ["**/*.tsx"],
    rules: {
      indent: ["error", "tab", { SwitchCase: 1 }],
      "react/jsx-indent": ["error", "tab"],
      "react/jsx-indent-props": ["error", "tab"],
    },
  },
];
