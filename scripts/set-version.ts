import { join } from "node:path";
import { file, Glob } from "bun";

type IncrementType = "major" | "minor" | "patch";

// --- Argument Parsing ---
const incrementType = (process.argv[2] as IncrementType) || "patch";

if (!["major", "minor", "patch"].includes(incrementType)) {
  console.error(
    "Error: Invalid increment type. Please use 'major', 'minor', or 'patch'.",
  );
  console.log("Usage: bun scripts/set-version.ts [major|minor|patch]");
  process.exit(1);
}

// --- Version Calculation ---
async function getNextVersion(): Promise<string> {
  const rootPackageJsonPath = join(process.cwd(), "package.json");
  const pkg = await file(rootPackageJsonPath).json();
  const currentVersion = pkg.version || "0.0.0";

  let [major, minor, patch] = currentVersion.split(".").map(Number);

  switch (incrementType) {
    case "major":
      major++;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor++;
      patch = 0;
      break;
    case "patch":
      patch++;
      break;
  }
  return `${major}.${minor}.${patch}`;
}

// --- File Update Logic ---
async function updatePackageVersion(filePath: string, newVersion: string) {
  try {
    const pkgFile = file(filePath);
    const pkgContent = await pkgFile.json();
    pkgContent.version = newVersion;
    await Bun.write(filePath, `${JSON.stringify(pkgContent, null, 2)}\n`);
    console.log(`✅ Updated ${pkgContent.name} to ${newVersion}`);
  } catch (e) {
    console.error(`❌ Failed to update ${filePath}:`, e);
  }
}

// --- Main Execution ---
async function main() {
  const newVersion = await getNextVersion();
  console.log(
    `🚀 Bumping version from current to ${newVersion} (${incrementType})...`,
  );

  const glob = new Glob("{apps,packages}/**/package.json");
  for await (const filename of glob.scan({
    cwd: process.cwd(),
    absolute: true,
  })) {
    await updatePackageVersion(filename, newVersion);
  }

  // Also update the root package.json
  await updatePackageVersion(join(process.cwd(), "package.json"), newVersion);

  console.log("\n✨ Version update complete!");
}

main();
