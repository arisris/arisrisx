import { file, Glob } from "bun";
import { join } from "node:path";

// Get the new version from the command-line arguments.
const newVersion = process.argv[2];

// Exit if no version number is provided.
if (!newVersion) {
  console.error("Error: Please provide a new version number as an argument.");
  console.log("Usage: bun <script_name>.ts <new_version>");
  process.exit(1);
}

console.log(`Updating all package versions to: ${newVersion}...`);

// Asynchronously iterate over each file found by the glob.
for await (const filename of new Glob("{apps,packages}/**/package.json").scan({
  cwd: process.cwd(),
})) {
  const dest = join(process.cwd(), filename);
  try {
    // Read the package.json file and parse it as a JavaScript object.
    const pkgFile = file(dest);
    const pkgContent = await pkgFile.json();

    // Update the version property.
    pkgContent.version = newVersion;

    // Stringify the updated object with 2-space indentation to maintain formatting
    // and write it back to the file. Appending a newline is a standard practice.
    await Bun.write(dest, JSON.stringify(pkgContent, null, 2) + "\n");

    console.log(`✅ Updated ${pkgContent.name}`);
  } catch (e) {
    // Log an error if a file cannot be processed.
    console.error(`❌ Failed to update ${filename}:`, e);
  }
}

console.log("\nVersion update complete! ✨");
