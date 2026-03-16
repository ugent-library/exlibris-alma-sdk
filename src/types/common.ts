/**
 * Common type aliases and helpers for the Alma API SDK.
 *
 * Since the Alma API's external JSON Schema references are unavailable,
 * response bodies are typed as `Record<string, unknown>` with a best-effort
 * shape. For full type safety, refer to the Alma API documentation and XSD
 * schemas.
 */

/** Generic Alma API list response wrapper. */
export interface AlmaList<T = Record<string, unknown>> {
	total_record_count?: number;
	[key: string]: unknown;
	_data?: T[];
}

/** A code/description value pair used throughout the Alma API. */
export interface AlmaCodeValue {
	value: string;
	desc?: string;
}

/** Common pagination parameters for list endpoints. */
export interface PaginationParams {
	/** Maximum number of results (0-100). Default: 10. */
	limit?: number;
	/** Zero-based offset of results. Default: 0. */
	offset?: number;
}
