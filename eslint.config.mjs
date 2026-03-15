import nextConfig from "eslint-config-next";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...nextConfig,
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
