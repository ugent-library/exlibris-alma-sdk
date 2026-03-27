import path from "node:path";

import { $ } from "bun";

import config from "./config.json" with { type: "json" };
import type { OpenApi } from "./types";

const filesToDownloadMap = new Map<string, boolean | null>();

export async function downloadFiles(): Promise<void> {
	config.files.forEach((url) => {
		filesToDownloadMap.set(url, null);
	});

	while (Array.from(filesToDownloadMap.values()).some((f) => f === null)) {
		await startToDownloadFiles();
	}

	await formatSchemaFiles();

	console.log("All files downloaded and formatted successfully.");
}
async function startToDownloadFiles() {
	await Promise.all(
		Array.from(filesToDownloadMap.entries())
			.filter(([_, d]) => d === null)
			.map(([url]) => downloadFile(url)),
	);
}

async function downloadFile(url: string) {
	filesToDownloadMap.set(url, false); // Mark as in progress

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to download ${url}: ${response.statusText}`);
	}

	const definition = (await response.json()) as OpenApi;
	const isRef = !config.files.includes(url);

	await saveFile(url, definition, isRef);

	filesToDownloadMap.set(url, true); // Mark as completed

	if (!isRef) {
		findExternalReferences(definition);
	}
}

async function saveFile(url: string, data: OpenApi, isRef: boolean) {
	const fileName = path.basename(url);

	await Bun.write(
		path.join(process.cwd(), "schema", isRef ? "refs" : "", fileName),
		JSON.stringify(data, null, 4),
	);

	console.log(`Downloaded and saved ${fileName}`);
}

function findExternalReferences(definition: OpenApi) {
	Object.values(definition.paths).forEach((pathConfig) => {
		Object.values(pathConfig).forEach((methodConfig) => {
			verifyRef(
				methodConfig.requestBody?.content["application/json"]?.schema.$ref,
			);

			Object.values(methodConfig.responses).forEach((response) => {
				verifyRef(response.content?.["application/json"]?.schema.$ref);
			});
		});
	});
}

function verifyRef(ref: string | undefined) {
	if (!ref) return;

	if (!ref.startsWith("http")) {
		return;
	}

	const url = new URL(ref);
	const baseUrl = `${url.origin}${url.pathname}`;

	if (!filesToDownloadMap.has(baseUrl)) {
		filesToDownloadMap.set(baseUrl, null);
	}
}

async function formatSchemaFiles() {
	await $`bun run biome format --write schema/**/*.json`;
}
