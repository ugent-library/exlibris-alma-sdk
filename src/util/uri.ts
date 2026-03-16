export type Path = `/${string}`;

export function path(
	strings: TemplateStringsArray,
	...segments: (string | number | undefined)[]
): Path {
	const path = strings.reduce((result, string, i) => {
		const segment =
			segments[i] !== undefined ? encodeURIComponent(String(segments[i])) : "";
		return result + string + segment;
	}, "");

	return isValidPath(path) ? path : `/${path}`;
}

function isValidPath(path: string): path is Path {
	return path.startsWith("/");
}
