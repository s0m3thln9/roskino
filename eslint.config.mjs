import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const LAYERS = ['app', 'views', 'widgets', 'features', 'entities', 'shared'];
const SLICED_LAYERS = ['views', 'widgets', 'features', 'entities'];

const publicApiPatterns = [
  {
    regex: '^@/(views|widgets|features|entities)/[^/]+/(?!server$|@x/[^/]+$).+',
    message: 'Import slices only through their public API: index.ts, server.ts or @x/<slice>.',
  },
  {
    regex: '^@/shared/[^/]+/(?!server$).+',
    message: 'Import shared segments only through their public API: index.ts or server.ts.',
  },
  {
    regex: '^@/app/[^/]+/.+',
    message: 'Import src/app segments only through their public API.',
  },
];

const layerRules = LAYERS.map((layer, index) => {
  const upperLayers = LAYERS.slice(0, index);
  const patterns = [...publicApiPatterns];

  if (upperLayers.length) {
    patterns.push({
      regex: `^@/(${upperLayers.join('|')})(/|$)`,
      message: `Layer "${layer}" cannot import from upper layers: ${upperLayers.join(', ')}.`,
    });
  }

  if (SLICED_LAYERS.includes(layer)) {
    patterns.push({
      regex: `^@/${layer}/[^/]+(/server)?$`,
      message: `Cross-imports between "${layer}" slices are forbidden. Use relative imports inside a slice and @x between entities.`,
    });
  }

  return {
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: { 'no-restricted-imports': ['error', { patterns }] },
  };
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-restricted-imports': ['error', { patterns: publicApiPatterns }],
    },
  },
  ...layerRules,
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
