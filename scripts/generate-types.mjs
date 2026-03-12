#!/usr/bin/env node

/**
 * Patches Alma OpenAPI spec files by replacing external $refs (which return 404)
 * with inline `{}` (resolves to `unknown` in openapi-typescript), then runs
 * openapi-typescript to produce typed declarations.
 */

import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const specs = ["conf", "bibs", "acq", "users"];

mkdirSync(join(root, "src/types/generated"), { recursive: true });
mkdirSync(join(root, "specs/patched"), { recursive: true });

for (const name of specs) {
	const inputPath = join(root, "specs", `${name}.json`);
	const patchedPath = join(root, "specs/patched", `${name}.json`);
	const outputPath = join(root, "src/types/generated", `${name}.d.ts`);

	const raw = readFileSync(inputPath, "utf8");
	const spec = JSON.parse(raw);

	// Replace all external $ref values (http/https URLs) with empty schema {}
	const patched = JSON.parse(
		JSON.stringify(spec, (_key, value) => {
			if (
				typeof value === "object" &&
				value !== null &&
				"$ref" in value &&
				typeof value.$ref === "string" &&
				(value.$ref.startsWith("http://") || value.$ref.startsWith("https://"))
			) {
				return {};
			}
			return value;
		}),
	);

	writeFileSync(patchedPath, JSON.stringify(patched, null, 2));
	console.log(`✓ Patched ${name}.json`);

	execSync(
		`bunx openapi-typescript ${patchedPath} -o ${outputPath} --properties-required-by-default`,
		{ stdio: "inherit", cwd: root },
	);
	console.log(`✓ Generated ${name}.d.ts`);
}

console.log("\n✨ All types generated successfully.");
