# Gemini Agent Guide

This document provides guidance for AI coding agents to effectively contribute to the `arisris.com` monorepo.

## About This Project

This is a Bun-based monorepo for the website [arisris.com](https://arisris.com).
The project is structured with applications in the `apps/` directory and shared packages in the `packages/` directory.

### Tech Stack

- **Runtime & Toolkit:** [Bun](https://bun.sh/)
- **Web Framework (www):** [SvelteKit](https://kit.svelte.dev/)
- **Authentication (auth):** [Hono](https://hono.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To set up the development environment, follow these steps:
Be check `bun` is already installed.

1. **Install Bun:** If you don't have Bun installed, follow the [official installation instructions](https://bun.dev/docs/installation).
2. **Clean Install:** Run the following command to perform a clean installation of all dependencies in the workspace:
   ```bash
   bun install
   bun run typegen
   ```
3. **Start Development Servers:** To start the development servers for all applications, run:
   ```bash
   bun run dev
   ```

## Available Scripts

The following scripts are available in the root `package.json` and can be run with `bun run <script_name>`.

### Development

- `bun run dev`: Starts the development servers for all applications.
- `bun run build`: Builds all applications for production.
- `bun run preview`: Previews the production build of the applications.

### Code Quality

This lint & format is powered by biomejs. follow [biome.json](./biome.json) configuration file.

- `bun run lint`: Lints the entire workspace.
- `bun run lint:fix`: Lints and automatically fixes issues in the entire workspace.
- `bun run format`: Formats the entire workspace using Biome.
- `bun run format:fix`: Formats and automatically fixes formatting issues in the entire workspace.

### Other

- `bun run typegen`: Generates types for the project.
- `bun run clean`: Deletes all `node_modules` re-installs all dependencies.

## Package Management

- **Add dependency:**
  ```bash
  bun add --cwd <apps|packages>/<app_name> <package_name>
  ```
- **Add Dev dependency:**
  ```bash
  bun add --cwd <apps|packages>/<app_name> -D <package_name>

- **Remove dependency:**
  ```bash
  bun remove --cwd <apps|packages>/<app_name> <package_name>
  ```

## Package Descriptions

### `apps/`

- **`www`**

  - **Purpose:** The main website for [arisris.com](https://arisris.com).
  - **Framework:** SvelteKit
  - **Description:** This package contains the frontend code for the main website.

- **`auth`**

  - **Purpose:** Authentication service for [auth.arisris.com](https://auth.arisris.com).
  - **Framework:** Hono
  - **Description:** This package handles all user authentication and management.

### `packages/`

- **`tsconfig`**
  - **Porpuse:** Typescript configuration.
  - **Description:** Any package must rely in this pkg.
  

- **`util`**

  - **Porpose:** Utility package.
  - **Description:** This package contains utility.