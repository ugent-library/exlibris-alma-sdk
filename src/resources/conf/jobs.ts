import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @param params.limit - Maximum results (0-100).
	 * @param params.offset - Results offset.
	 * @param params.category - Job category filter.
	 * @returns A list of jobs.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9qb2Jz/
	 */
	async retrieveJobs(params?: {
		limit?: number;
		offset?: number;
		category?: string;
		type?: string;
		profile_id?: string;
	}): Promise<Jobs> {
		return this.client.get<Jobs>("/conf/jobs", params);
	}

	/**
	 * Retrieves a single job by its ID.
	 *
	 * @param jobId - The job ID.
	 * @returns The job object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9qb2JzL3tqb2JfaWR9/
	 */
	async retrieveJob(jobId: string): Promise<Job> {
		return this.client.get<Job>(path`/conf/jobs/${jobId}`);
	}

	/**
	 * Submits a job for execution.
	 *
	 * @param jobId - The job ID.
	 * @param body - Job submission parameters.
	 * @param params - Optional query parameters.
	 * @param params.op - The operation to perform (e.g. `"run"`).
	 * @returns The resulting job instance.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UE9TVCAvYWxtYXdzL3YxL2NvbmYvam9icy97am9iX2lkfQ==/
	 */
	async submitJob(
		jobId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<JobInstance> {
		return this.client.post<JobInstance>(
			path`/conf/jobs/${jobId}`,
			body,
			params,
		);
	}

	/**
	 * Retrieves a list of instances (runs) for a job.
	 *
	 * @param jobId - The job ID.
	 * @param params - Filter and pagination parameters.
	 * @param params.submit_date_from - Filter instances submitted from this date.
	 * @param params.submit_date_to - Filter instances submitted up to this date.
	 * @param params.status - Filter by instance status.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of job instances.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9qb2JzL3tqb2JfaWR9L2luc3RhbmNlcw==/
	 */
	async retrieveJobInstances(
		jobId: string,
		params: {
			submit_date_from: string;
			submit_date_to: string;
			status: string;
			limit?: number;
			offset?: number;
		},
	): Promise<JobInstances> {
		return this.client.get<JobInstances>(
			path`/conf/jobs/${jobId}/instances`,
			params,
		);
	}

	/**
	 * Retrieves a single job instance.
	 *
	 * @param jobId - The job ID.
	 * @param instanceId - The instance ID.
	 * @returns The job instance.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9qb2JzL3tqb2JfaWR9L2luc3RhbmNlcy97aW5zdGFuY2VfaWR9/
	 */
	async retrieveJobInstance(
		jobId: string,
		instanceId: string,
	): Promise<JobInstance> {
		return this.client.get<JobInstance>(
			path`/conf/jobs/${jobId}/instances/${instanceId}`,
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
			path`/conf/jobs/${jobId}/instances/${instanceId}`,
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
		params?: { limit?: number; offset?: number },
	): Promise<JobInstanceEvents> {
		return this.client.get<JobInstanceEvents>(
			path`/conf/jobs/${jobId}/instances/${instanceId}/events`,
			params,
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
		params?: { population?: string; limit?: number; offset?: number },
	): Promise<JobInstanceMatches> {
		return this.client.get<JobInstanceMatches>(
			path`/conf/jobs/${jobId}/instances/${instanceId}/matches`,
			params,
		);
	}
}
