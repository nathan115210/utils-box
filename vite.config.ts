import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    // keep ESM + CJS; preserve folder layout under dist/
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'next'],
      output: [
        {
          dir: 'dist',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          sourcemap: true,
        },
        {
          dir: 'dist',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named',
          sourcemap: true,
        },
      ],
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
      insertTypesEntry: true, // create dist/types/index.d.ts
      tsconfigPath: 'tsconfig.json',
      rollupTypes: true,
      include: ['src'],
      exclude: ['**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}', '**/__tests__/**'],
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.spec.ts'],
  },
});
