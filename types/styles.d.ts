// Next.js handles CSS imports at build time. This declaration also lets
// TypeScript validate side-effect-only global CSS imports when
// `noUncheckedSideEffectImports` is enabled by the editor or CLI.
declare module "*.css" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
