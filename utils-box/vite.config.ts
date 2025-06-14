import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import path from 'path';


export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UtilsBox',
      formats: ['es', 'cjs'],
      fileName: (format) => `utils-box.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'next'],
    },
  },
  plugins: [dts()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.spec.ts'], // Optional: makes it explicit
  },
});
