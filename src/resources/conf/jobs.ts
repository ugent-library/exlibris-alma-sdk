import type { AlmaHttpClient } from "@/client";

import type {
	Job,
	JobInstance,
	JobInstanceEvents,
	JobInstanceMatches,
	JobInstances,
	Jobs,
} from "./types";

/**
 * Methods for managing scheduled jobs and job instances in the Alma
 * Configuration API.
 */
export class ConfJobsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of scheduled jobs.
	 *
	 * @param params - Optional filters.
	 * @param params.limit - Maximum results (0–100).
	 * @param params.offset - Results offset.
	 * @param params.category - Job category filter.
	 * @returns A list of jobs.
	 */
	async retrieveJobs(params?: {
		limit?: number;
		offset?: number;
		category?: string;
	}): Promise<Jobs> {
		return this.client.get<Jobs>("/almaws/v1/conf/jobs", params);
	}

	/**
	 * Retrieves a single job by its ID.
	 *
	 * @param jobId - The job ID.
	 * @returns The job object.
	 */
	async retrieveJob(jobId: string): Promise<Job> {
		return this.client.get<Job>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}`,
		);
	}

	/**
	 * Submits a job for execution.
	 *
	 * @param jobId - The job ID.
	 * @param body - Job submission parameters.
	 * @param params - Optional query parameters.
	 * @param params.op - The operation to perform (e.g. `"run"`).
	 * @returns The resulting job instance.
	 */
	async submitJob(
		jobId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<JobInstance> {
		return this.client.post<JobInstance>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}`,
			body,
			params,
		);
	}

	/**
	 * Retrieves a list of instances (runs) for a job.
	 *
	 * @param jobId - The job ID.
	 * @param params - Optional pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of job instances.
	 */
	async retrieveJobInstances(
		jobId: string,
		params?: { limit?: number; offset?: number },
	): Promise<JobInstances> {
		return this.client.get<JobInstances>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}/instances`,
			params,
		);
	}

	/**
	 * Retrieves a single job instance.
	 *
	 * @param jobId - The job ID.
	 * @param instanceId - The instance ID.
	 * @returns The job instance.
	 */
	async retrieveJobInstance(
		jobId: string,
		instanceId: string,
	): Promise<JobInstance> {
		return this.client.get<JobInstance>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}/instances/${encodeURIComponent(instanceId)}`,
		);
	}

	/**
	 * Cancels or performs an action on a running job instance.
	 *
	 * @param jobId - The job ID.
	 * @param instanceId - The instance ID.
	 * @param params - Operation parameters.
	 * @param params.op - The operation (e.g. `"cancel"`).
	 * @returns Updated job instance.
	 */
	async operateJobInstance(
		jobId: string,
		instanceId: string,
		params?: { op?: string },
	): Promise<JobInstance> {
		return this.client.post<JobInstance>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}/instances/${encodeURIComponent(instanceId)}`,
			{},
			params,
		);
	}

	/**
	 * Retrieves events for a job instance.
	 *
	 * @param jobId - The job ID.
	 * @param instanceId - The instance ID.
	 * @returns Job instance events.
	 */
	async retrieveJobInstanceEvents(
		jobId: string,
		instanceId: string,
	): Promise<JobInstanceEvents> {
		return this.client.get<JobInstanceEvents>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}/instances/${encodeURIComponent(instanceId)}/events`,
		);
	}

	/**
	 * Retrieves matches (processed records) for a job instance.
	 *
	 * @param jobId - The job ID.
	 * @param instanceId - The instance ID.
	 * @returns Job instance matches.
	 */
	async retrieveJobInstanceMatches(
		jobId: string,
		instanceId: string,
	): Promise<JobInstanceMatches> {
		return this.client.get<JobInstanceMatches>(
			`/almaws/v1/conf/jobs/${encodeURIComponent(jobId)}/instances/${encodeURIComponent(instanceId)}/matches`,
		);
	}
}
