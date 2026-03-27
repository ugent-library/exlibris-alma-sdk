import type { Path } from "@/util/uri";

export type OpenApi = {
	openapi: string;
	info: {
		version: string;
		title: string;
		description: string;
		termsOfService: string;
	};
	externalDocs: {
		description: string;
		url: string;
	};
	servers: {
		url: string;
	}[];
	tags: {
		name: string;
	}[];
	paths: Record<
		Path,
		{
			[method: string]: {
				tags: string[];
				summary: string;
				description: string;
				operationId: string;
				parameters?: {
					name: string;
					in: string;
					description: string;
					required: boolean;
					schema: {
						type: string;
					};
				}[];
				requestBody?: {
					description: string;
					content: Record<ContentType, { schema: { $ref: string } }>;
				};
				responses: Record<
					string,
					{
						description: string;
						content?: Record<ContentType, { schema: { $ref: string } }>;
					}
				>;
			};
		}
	>;
	security: {
		ApiKeyAuth: never[];
	}[];
	components: {
		securitySchemes: {
			ApiKeyAuth: {
				type: string;
				description: string;
				in: string;
				name: string;
			};
		};
		headers: {
			remaining: {
				description: string;
				schema: {
					type: string;
				};
			};
		};
	};
};

type ContentType = "application/json" | "application/xml";
