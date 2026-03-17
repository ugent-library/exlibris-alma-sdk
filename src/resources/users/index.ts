import type { AlmaHttpClient } from "@/client";

import { FeesResource } from "./fees";
import { GeneralResource } from "./general";
import { LegantoResource } from "./leganto";
import { LoansResource } from "./loans";
import { PurchaseRequestsResource } from "./purchase-requests";
import { RequestsResource } from "./requests";
import { StaffLoginReportResource } from "./staff-login-report";

export type {
	LegantoNotifications,
	ResourceSharingRequest,
	StaffLoginReport,
	User,
	UserAttachment,
	UserDeposit,
	UserDeposits,
	UserFee,
	UserFees,
	UserLoan,
	UserLoans,
	UserPersonalData,
	UserPurchaseRequest,
	UserPurchaseRequests,
	UserRequest,
	UserRequests,
	Users,
} from "./types";

/**
 * Resource client for the Alma Users API.
 *
 * Exposes sub-resources for all user-related entities:
 * - `users` - user records, ME endpoint, personal data, attachments
 * - `loans` - user loans
 * - `requests` - user requests and resource sharing requests
 * - `fees` - fees and deposits
 * - `purchaseRequests` - user purchase requests
 * - `leganto` - Leganto notifications
 * - `staffLoginReport` - staff login report
 *
 * All methods can also be accessed directly on this resource object via
 * convenience delegations.
 *
 * @example
 * ```typescript
 * const client = new AlmaClient({ apiKey: 'xxx', region: 'eu' });
 *
 * // via sub-resource
 * await client.users.users.retrieveUsersList();
 * await client.users.loans.retrieveUserLoansList('12345');
 *
 * // via direct convenience methods
 * await client.users.retrieveUsersList();
 * await client.users.retrieveUserLoansList('12345');
 * ```
 */
export class UsersResource {
	/** Users sub-resource: user records, ME, personal data, attachments. */
	readonly general: GeneralResource;
	/** Loans sub-resource: user loans. */
	readonly loans: LoansResource;
	/** Requests sub-resource: user requests and resource sharing requests. */
	readonly requests: RequestsResource;
	/** Fees sub-resource: fees and deposits. */
	readonly fees: FeesResource;
	/** Purchase requests sub-resource. */
	readonly purchaseRequests: PurchaseRequestsResource;
	/** Leganto sub-resource: Leganto notifications. */
	readonly leganto: LegantoResource;
	/** Staff login report sub-resource. */
	readonly staffLoginReport: StaffLoginReportResource;

	constructor(client: AlmaHttpClient) {
		this.general = new GeneralResource(client);
		this.loans = new LoansResource(client);
		this.requests = new RequestsResource(client);
		this.fees = new FeesResource(client);
		this.purchaseRequests = new PurchaseRequestsResource(client);
		this.leganto = new LegantoResource(client);
		this.staffLoginReport = new StaffLoginReportResource(client);
	}
}
