![utilsBox](./logo.svg)

# utils-box

A modern utility-first TypeScript library packed with reusable **React hooks**, **Next.js enhancements**, and \*
\*general-purpose helpers\*\* — built with performance, testing, and developer experience in mind.

---

## Features

- ️**React Hooks** – debounce, local storage, Picture-in-Picture, and more
- **Next.js Support** – router/query helpers for App Router
- **Utility Helpers** – format bytes, throttle, deep clone, etc.
- **Tree-shakable** – ESM & CJS builds with full type support
- **Tested** – Unit tested with [Vitest](https://vitest.dev/)
- **Type-safe** – Built entirely with strict TypeScript
- **Prettified** – Auto-formatted, linted, and pre-committed
- **Local Playground** – Try everything in `doc-web` example app

---

## Installation (External Usage)

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

## Local Development Setup

### Monorepo Structure

```perl
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

### Install & Build

```bash
pnpm install
pnpm run --filter utils-box... build
```

> Then, doc-web can import from utils-box as a local dependency:

```ts
import { useDebounce } from 'utils-box/react/useDebounce';
```

---

## Usage

### React Hook

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

### Utility Helper

```ts
import { formatBytes } from 'utils-box';

console.log(formatBytes(1048576)); // "1 MB"
```

---

## Package Directory Structure

```perl
utils-box/
└── src/
    ├── react/        # React hooks
    ├── next/         # Next.js helpers
    ├── utils/        # Pure TS utilities
    └── index.ts      # Public exports
```

---

## Run Tests

```bash
pnpm run --filter utils-box... test
```

---

### Format Code

```bash
pnpm run --filter utils-box format     # write fixes with Prettier
pnpm run --filter utils-box format:check
```

---

## Tooling & Automation

This repo is wired for a consistent DX: Prettier, ESLint (flat config), Husky + lint-staged, strict commit messages, and
a CI lint job you can also run locally with act.

### Prettier

- Config: `.prettierrc.json`

- Ignore: `.prettierignore` (includes `node_modules`, `dist`, `coverage`, `.pnpm-store/`, etc.)

- Commands:

  ```bash
  pnpm format        # prettier --write .
  pnpm format:check  # prettier --check .
  ```

  > We do not ignore `package.json` — Prettier formats it nicely.

### ESLint (Flat Config)

- Config: `eslint.config.mjs` (flat config)

- TypeScript via `@typescript-eslint/*`

- React via `eslint-plugin-react` & `react-hooks`

- Import hygiene via `eslint-plugin-import` (grouping + alpha)

- Prettier compatibility via `eslint-config-prettier`

#### Lint targets

- App code: `src/**/*.{ts,tsx}`

- Config/setup files: `vite.config.ts`, `vitest.*.ts`, `vitest.setup.ts`, `*.config.ts`, `config/**/*.ts`

#### Helpful scripts

```bash
pnpm lint:fix  # ESLint autofix only on src/**/*.{ts,tsx}
```

> If you use `parserOptions.project`, ensure `tsconfig.eslint.json` includes the config/setup files above.

### Git Hooks (Husky + lint-staged)

- Husky is bootstrapped with `"prepare": "husky"`.

- pre-commit runs:

  ```bash
  pnpm lint-staged
  pnpm format:check
  ```

- lint-staged rules:

  - `**/*.{ts,tsx}` → `eslint --max-warnings=0 --fix` then `prettier --write`

  - `{*.ts,*.config.ts,config/**/*.ts,vite.config.ts,vitest.*.ts}` → same

  - `**/*.{json,md,mdx,yml,yaml}` → `prettier --write`

  > If `.husky/` was ignored by `.gitignore`, unignore it (e.g. add `!.husky/*`) so hooks are committed.

### Commit Messages Convention

#### Format:

```
type(scope): subject
```

_Allowed types:_ `feat | fix | refactor | doc | chore | test | ci`
_Scope:_ required, in parentheses • _Subject_: required, after `:`

Examples:

```
feat(utils): add new util helper
fix(useDebounce): fix debounce timing
refactor(useDebounce): simplify hook logic
```

### Enforcement

- Fast regex gate in `.husky/commit-msg` (clear error messages)

- Then `commitlint` for deeper checks (length, casing, etc.)

> Husky v9+ note: do not source `husky.sh` inside `commit-msg` (remove any legacy `husky.sh` lines).

### CI: Lint in GitHub Actions

- Runs on `ubuntu-latest`, _Node 20.x, pnpm_

- Caches pnpm store (store dir set to `~/.pnpm-store`)

- Prettier checks tracked files only (avoids `node_modules`, caches)

- ESLint runs with `--max-warnings=0`, `--no-warn-ignored`, and safe globs

#### High level:

- `actions/checkout@v4`

- `actions/setup-node@v4` (`node-version: 20`, `cache: pnpm`)

- `pnpm/action-setup@v4` + `pnpm config set store-dir ~/.pnpm-store` (cache this path)

- `pnpm install`

- _Prettier (tracked)_

- _ESLint (flat config)_

### Run the CI workflow locally (Docker)

Use [`act?](https://github.com/nektos/act) to simulate GitHub Actions:

```bash
pnpm ci:act         # run the whole .github/workflows/ci.yml
pnpm ci:act:lint    # run only the lint job
pnpm ci:act:test    # run only the test job (if defined)
pnpm ci:act:build   # run only the build job (if defined)
# Apple Silicon tip:
pnpm ci:act:lint -- --container-architecture linux/amd64
```

---

## Contributing

- Fork the repo

- Create your feature branch: git checkout -b feat/your-feature

- Commit changes: git commit -am 'feat(scope): your subject'

- Push to the branch: git push origin feat/your-feature

- Open a Pull Request

### Local Dev Loop (test in another project without publishing)

You can develop **utils-box** and try it live in another app using a local link.

- In utils-box, terminal A:

  ```bash
  pnpm run build:watch
  ```

- In your **test app** (e.g. `/dev/my-app/react`), terminal B:

  ```bash
  # remove any previous install (ok if it wasn't installed)
  pnpm remove utils-box || true

  # add a symlink to your local package (adjust the path if needed)
  pnpm add link:../../utils-box

  # start your app's dev server
  pnpm dev
  ```

Now edit code in `utils-box/src/**` → it rebuilds to `dist/` → your test app auto-picks changes (HMR or after a
refresh).

---

### License

MIT [©Zhao Hongyu](https://zhaohongyu.netlify.app/)
