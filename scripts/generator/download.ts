import path from "node:path";

import { $ } from "bun";
import { isPlainObject } from "es-toolkit/predicate";

import config from "./config.json" with { type: "json" };
import type { OpenApi } from "./types";

const openApiDefinitionsUrls = Object.keys(config.openApiDefinitions);
const filesToDownloadMap = new Map<string, boolean | null>();

export async function downloadFiles(): Promise<void> {
	openApiDefinitionsUrls.forEach((url) => {
		filesToDownloadMap.set(url, null);
	});

	while (Array.from(filesToDownloadMap.values()).some((f) => f === null)) {
		await startToDownloadFiles();
	}

	await formatSchemaFiles();

	console.log("All files downloaded and formatted successfully.");
}

async function startToDownloadFiles() {
	const newFiles = Array.from(filesToDownloadMap.entries())
		.filter(([_, status]) => status === null)
		.map(([url]) => url);

	await Promise.all(newFiles.map(downloadFile));
}

async function downloadFile(url: string) {
	filesToDownloadMap.set(url, false); // Mark as in progress

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to download ${url}: ${response.statusText}`);
	}

	const definition = (await response.json()) as OpenApi;
	const isRef = !openApiDefinitionsUrls.includes(url);

	await saveFile(url, definition, isRef);

	filesToDownloadMap.set(url, true); // Mark as completed

	findExternalReferences(definition, url);
}

async function saveFile(url: string, data: OpenApi, isRef: boolean) {
	const fileName = path.basename(url);

	await Bun.write(
		path.join(process.cwd(), "schema", isRef ? "refs" : "", fileName),
		JSON.stringify(data, null, 4),
	);

	console.log(`Downloaded and saved ${fileName}`);
}

function findExternalReferences(obj: Record<string, unknown>, baseUrl: string) {
	for (const key in obj) {
		if (key === "$ref" && typeof obj[key] === "string") {
			verifyRef(obj[key], baseUrl);
		} else if (isPlainObject(obj[key])) {
			findExternalReferences(obj[key], baseUrl);
		}
	}
}

function verifyRef(ref: string | undefined, baseUrl: string) {
	if (!ref) return;

	const fullRefUrl = new URL(ref, ref.startsWith("http") ? undefined : baseUrl);
	const refUrl = `${fullRefUrl.origin}${fullRefUrl.pathname}`;

	if (!filesToDownloadMap.has(refUrl)) {
		filesToDownloadMap.set(refUrl, null);
	}
}

async function formatSchemaFiles() {
	await $`bun run biome format --write schema/**/*.json`;
}
