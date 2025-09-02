![utilsBox](./logo.svg)

# 🧰 utils-box

A modern utility-first TypeScript library packed with reusable **React hooks**, **Next.js enhancements**, and \*
\*general-purpose helpers\*\* — built with performance, testing, and developer experience in mind.

---

## ✨ Features

- ⚛️ **React Hooks** – debounce, local storage, Picture-in-Picture, and more
- 🔁 **Next.js Support** – router/query helpers for App Router
- 🛠 **Utility Helpers** – format bytes, throttle, deep clone, etc.
- 📦 **Tree-shakable** – ESM & CJS builds with full type support
- ✅ **Tested** – Unit tested with [Vitest](https://vitest.dev/)
- 🧪 **Type-safe** – Built entirely with strict TypeScript
- 🧹 **Prettified** – Auto-formatted, linted, and pre-committed
- 🔄 **Local Playground** – Try everything in `doc-web` example app

---

## 📦 Installation (External Usage)

```bash
npm install utils-box
```

or with yarn/pnpm:

```bash
yarn add utils-box
# or
pnpm add utils-box
```

---

## 🧪 Local Development Setup

### 🧱 Monorepo Structure

```
utils-box/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── utils-box/        # This utility package
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── vite.config.ts
├── doc-web/          # Dynamic documentation and  examples/playground
│   ├── app/
│   ├── package.json
│   └── tsconfig.json
```

### 🚀 Install & Build

```bash
pnpm install
pnpm run --filter utils-box... build
```

> Then, `doc-web` can import from `utils-box` as a local dependency:

```ts
import { useDebounce } from 'utils-box/react/useDebounce';
```

---

## 📚 Usage

### ✅ React Hook

```tsx
import { useDebounce } from 'utils-box';

const SearchInput = ({ query }) => {
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // fetch with debouncedQuery
  }, [debouncedQuery]);

  return <input value={query} />;
};
```

### ✅ Utility Helper

```ts
import { formatBytes } from 'utils-box';

console.log(formatBytes(1048576)); // "1 MB"
```

---

## 📂 Package Directory Structure

```
utils-box/
└── src/
    ├── react/        # React hooks
    ├── next/         # Next.js helpers
    ├── utils/        # Pure TS utilities
    └── index.ts      # Public exports
```

---

## 🧪 Run Tests

```bash
pnpm run --filter utils-box test
```

---

## 🧼 Format Code

```bash
pnpm run --filter utils-box format
```

---

## 🧰 Example Playground

Visit `doc-web` at:

```bash
pnpm run --filter doc-web dev
```

> A Next.js 15 playground for trying out your utilities and hooks

---

## 🧱 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -am 'add: your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request 🚀

---

## 📜 License

MIT © [Zhao Hongyu](https://zhaohongyu.netlify.app/)
