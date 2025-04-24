import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'HooksUtilsLib',
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
    }
});
