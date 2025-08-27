### `AGENTS.md`

# Agent Guide

**Version: 2.0**

This document provides structured guidance for AI agents to effectively contribute to the `arisris.com` monorepo.

---

## 🎯 Primary Goal

Your primary goal is to assist in the development, maintenance, and deployment of the `arisris.com` monorepo by executing tasks as instructed, automating workflows, and ensuring code quality.

---

## 🗺️ Project Overview

-   **Description**: A Bun-based monorepo for the website [arisris.com](https://arisris.com).
-   **Structure**:
    -   `apps/`: Contains deployable applications.
    -   `packages/`: Houses shared libraries and utilities.
    -   `scripts/`: Contains automation and management scripts.
-   **Tech Stack**:
    -   **Runtime**: Bun
    -   **Web Framework (`www`)**: SvelteKit
    -   **Authentication (`auth`)**: Hono
    -   **Language**: TypeScript

---

## 🗂️ Key Files Manifest

-   **`package.json`**: (Root) Defines all workspaces and root-level scripts.
-   **`AGENTS.md`**: (Root) This guide. Your primary source of instructions.
-   **`biome.json`**: (Root) Configuration for linting and formatting.
-   **`apps/www/svelte.config.js`**: SvelteKit configuration for the main website.
-   **`apps/auth/src/index.ts`**: Main entry point for the Hono authentication service.
-   **`packages/tsconfig/tsconfig.base.json`**: The base TypeScript configuration for all packages.
-   **`scripts/`**: Directory containing all automation scripts (`create-package.ts`, `set-version.ts`, etc.).

---

## ⚙️ Standard Workflows

Execute the following workflows using the provided commands.

### **1. Initial Project Setup**

To set up the development environment from a clean state:

```bash
bun install
````

The `postinstall` script will automatically run `bun run typegen`.

### **2. Development**

To start the development servers for all applications:

```bash
bun run dev
```

### **3. Creating a New Package**

To create a new shared utility or library:

```bash
bun scripts/create-package.ts <package-name>
```

To create a new application:

```bash
bun scripts/create-package.ts <app-name> -t apps
```

### **4. Code Quality Checks**

To lint and format the entire workspace and automatically fix issues:

```bash
bun run format:fix
bun run lint:fix
```

### **5. Releasing a New Version**

To bump the version number, commit, and tag a new release:

```bash
# For a patch release (e.g., 1.0.0 -> 1.0.1)
bun scripts/set-version.ts patch

# For a minor release (e.g., 1.0.1 -> 1.1.0)
bun scripts/set-version.ts minor

# For a major release (e.g., 1.1.0 -> 2.0.0)
bun scripts/set-version.ts major
```

After running the script, you will still need to manually push the commit and tag.

### **6. Cleaning the Project**

To remove all build artifacts without deleting `node_modules`:

```bash
bun run clean:dist
```

To perform a full reset (removes `node_modules` and reinstalls):

```bash
bun run clean
```

-----

## 📜 Rules & Constraints

  - **Always use Bun**: This project is standardized on Bun. Do not use `npm`, `yarn`, or `pnpm`.
  - **Follow Linting Rules**: Before finalizing any code changes, always run `bun run lint:fix` and `bun run format:fix`.
  - **Use a Single Command**: When possible, prefer using the root `package.json` scripts over running commands in individual workspaces.
  - **Check this Guide First**: Before performing any task, review the workflows in this document.
