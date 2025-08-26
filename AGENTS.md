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
Bun typically installed in user bases home directory. `~/.bun/bin/bun`
Be carefull to try to using `source ~/.bashrc` first before running bun command.
If `bun` command still not found you may ask user to install it.

1. **Install Bun:** If you don't have Bun installed, follow the [official installation instructions](https://bun.dev/docs/installation).
2. **Clean Install:** Run the following command to perform a clean installation of all dependencies in the workspace:
   ```bash
   bun run clean
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

This lint & format is powered by biomejs

- `bun run lint`: Lints the entire workspace.
- `bun run lint:fix`: Lints and automatically fixes issues in the entire workspace.
- `bun run format`: Formats the entire workspace using Biome.
- `bun run format:fix`: Formats and automatically fixes formatting issues in the entire workspace.

### Other

- `bun run typegen`: Generates types for the project.
- `bun run clean`: Deletes all `node_modules` re-installs all dependencies.

## Package Management

- **Add a dependency to a specific app:**
  ```bash
  cd apps/<app_name>
  bun add <package_name>
  ```
- **Add a dev dependency to a specific app:**
  ```bash
  cd apps/<app_name>
  bun add -D <package_name>
  ```

## Package Descriptions

### `apps/www`

- **Purpose:** The main website for [arisris.com](https://arisris.com).
- **Framework:** SvelteKit
- **Description:** This package contains the frontend code for the main website.

### `apps/auth`

- **Purpose:** Authentication service for [auth.arisris.com](https://auth.arisris.com).
- **Framework:** Hono
- **Description:** This package handles all user authentication and management.