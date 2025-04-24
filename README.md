![utilsBox](./assets/logo.svg)

# 🧰 utils-box

A modern utility-first TypeScript library packed with reusable **React hooks**, **Next.js enhancements**, and *
*general-purpose helpers** — built with performance, testing, and developer experience in mind.

---

## ✨ Features

- ⚛️ **React Hooks** – debounce, local storage, interval, and more
- 🔁 **Next.js Support** – router/query helpers designed for App Router
- 🛠 **Utility Helpers** – format bytes, throttle, deep clone, etc.
- 📦 **Tree-shakable** – ESM & CJS builds with full type support
- ✅ **Tested** – Unit tested with [Vitest](https://vitest.dev/)
- 🧪 **Type-safe** – Built entirely with strict TypeScript
- 🧹 **Prettified** – Auto-formatted, linted, and pre-committed

---

## 📦 Installation

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

## 📚 Usage

### ✅ React Hook

```tsx
import {useDebounce} from 'utils-box';

const SearchInput = ({query}) => {
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        // Fetch with debouncedQuery
    }, [debouncedQuery]);

    return <input value={query}/>;
};
```

---

### ✅ Utility Helper

```ts
import {formatBytes} from 'utils-box';

console.log(formatBytes(1048576)); // "1 MB"
```

---

## 📂 Project Structure

```
src/
├── react/          # Generic React hooks
├── next/           # Next.js-specific hooks
├── utils/          # Pure TypeScript helpers
├── index.ts        # Public API entry point
```

---

## 🧪 Run Tests

```bash
npm run test
```

---

## 🧼 Format Code

```bash
npm run format
```

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
