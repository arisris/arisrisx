import { join } from "node:path";
import { $ } from "bun";

// --- Configuration ---
const args = process.argv.slice(2);
const packageName = args.find((arg) => !arg.startsWith("-"));
const typeFlagIndex = args.indexOf("-t");
const packageType = typeFlagIndex !== -1 ? args[typeFlagIndex + 1] : "packages";

// --- Validation ---
if (!packageName) {
  console.error("Error: Please provide a package name.");
  console.log(
    "Usage: bun scripts/create-package.ts <package-name> [-t <apps|packages>]",
  );
  process.exit(1);
}

if (packageType !== "apps" && "packages") {
  console.error(
    "Error: Invalid package type specified with -t. Must be 'apps' or 'packages'.",
  );
  process.exit(1);
}

// --- Helper Functions ---
const writeJson = (path: string, data: object) =>
  Bun.write(path, `${JSON.stringify(data, null, 2)}\n`);

const writeText = (path: string, content: string) => Bun.write(path, content);

// --- File Content Definitions ---
const packageJsonName =
  packageType === "apps"
    ? `@arisris/app-${packageName}`
    : `@arisris/${packageName}`;

const files = {
  "package.json": {
    name: packageJsonName,
    version: "1.0.0",
    description: "",
    main: "src/index.ts",
    type: "module",
    scripts: {},
    dependencies: {},
    devDependencies: {
      "@arisris/tsconfig": "workspace:*",
    },
  },
  "tsconfig.json": {
    extends: "@arisris/tsconfig/tsconfig.base.json",
  },
  "src/index.ts": `export function sayHello(name?: string) {\n  return \`Hello, \${name ?? "World"}!\`;\n}\n`,
  "README.md": `# ${packageJsonName}\n\n## Description\n\n`,
};

// --- Package Creation Logic ---
(async () => {
  // biome-ignore lint/style/noNonNullAssertion: true
  const directory = join(process.cwd(), packageType, packageName!);
  await $`mkdir -p ${join(directory, "src")}`;
  console.log(`✅ Created directory: ${directory}`);

  for (const [filename, content] of Object.entries(files)) {
    const filePath = join(directory, filename);
    if (typeof content === "object") {
      await writeJson(filePath, content);
    } else {
      await writeText(filePath, content);
    }
    console.log(`✅ Created ${filename}`);
  }

  console.log(
    `\n🎉 Successfully created new ${packageType.slice(
      0,
      -1,
    )}: "${packageName}"`,
  );
})();