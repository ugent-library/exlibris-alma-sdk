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
	readonly users: GeneralResource;
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
		this.users = new GeneralResource(client);
		this.loans = new LoansResource(client);
		this.requests = new RequestsResource(client);
		this.fees = new FeesResource(client);
		this.purchaseRequests = new PurchaseRequestsResource(client);
		this.leganto = new LegantoResource(client);
		this.staffLoginReport = new StaffLoginReportResource(client);
	}

	// ── Users ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link GeneralResource.retrieveUsersList}
	 */
	retrieveUsersList: GeneralResource["retrieveUsersList"] = (...args) =>
		this.users.retrieveUsersList(...args);

	/**
	 * @see {@link GeneralResource.retrieveUser}
	 */
	retrieveUser: GeneralResource["retrieveUser"] = (...args) =>
		this.users.retrieveUser(...args);

	/**
	 * @see {@link GeneralResource.retrieveMe}
	 */
	retrieveMe: GeneralResource["retrieveMe"] = (...args) =>
		this.users.retrieveMe(...args);

	/**
	 * @see {@link GeneralResource.retrieveUserPersonalData}
	 */
	retrieveUserPersonalData: GeneralResource["retrieveUserPersonalData"] = (
		...args
	) => this.users.retrieveUserPersonalData(...args);

	/**
	 * @see {@link GeneralResource.createUser}
	 */
	createUser: GeneralResource["createUser"] = (...args) =>
		this.users.createUser(...args);

	/**
	 * @see {@link GeneralResource.updateUser}
	 */
	updateUser: GeneralResource["updateUser"] = (...args) =>
		this.users.updateUser(...args);

	/**
	 * @see {@link GeneralResource.operateUser}
	 */
	operateUser: GeneralResource["operateUser"] = (...args) =>
		this.users.operateUser(...args);

	/**
	 * @see {@link GeneralResource.deleteUser}
	 */
	deleteUser: GeneralResource["deleteUser"] = (...args) =>
		this.users.deleteUser(...args);

	/**
	 * @see {@link GeneralResource.retrieveUserAttachment}
	 */
	retrieveUserAttachment: GeneralResource["retrieveUserAttachment"] = (
		...args
	) => this.users.retrieveUserAttachment(...args);

	/**
	 * @see {@link GeneralResource.createUserAttachment}
	 */
	createUserAttachment: GeneralResource["createUserAttachment"] = (...args) =>
		this.users.createUserAttachment(...args);

	// ── Loans ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link LoansResource.retrieveUserLoansList}
	 */
	retrieveUserLoansList: LoansResource["retrieveUserLoansList"] = (...args) =>
		this.loans.retrieveUserLoansList(...args);

	/**
	 * @see {@link LoansResource.retrieveUserLoan}
	 */
	retrieveUserLoan: LoansResource["retrieveUserLoan"] = (...args) =>
		this.loans.retrieveUserLoan(...args);

	/**
	 * @see {@link LoansResource.createUserLoan}
	 */
	createUserLoan: LoansResource["createUserLoan"] = (...args) =>
		this.loans.createUserLoan(...args);

	/**
	 * @see {@link LoansResource.updateUserLoan}
	 */
	updateUserLoan: LoansResource["updateUserLoan"] = (...args) =>
		this.loans.updateUserLoan(...args);

	/**
	 * @see {@link LoansResource.operateUserLoan}
	 */
	operateUserLoan: LoansResource["operateUserLoan"] = (...args) =>
		this.loans.operateUserLoan(...args);

	// ── Requests ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link RequestsResource.retrieveUserRequestsList}
	 */
	retrieveUserRequestsList: RequestsResource["retrieveUserRequestsList"] = (
		...args
	) => this.requests.retrieveUserRequestsList(...args);

	/**
	 * @see {@link RequestsResource.retrieveUserRequest}
	 */
	retrieveUserRequest: RequestsResource["retrieveUserRequest"] = (...args) =>
		this.requests.retrieveUserRequest(...args);

	/**
	 * @see {@link RequestsResource.createUserRequest}
	 */
	createUserRequest: RequestsResource["createUserRequest"] = (...args) =>
		this.requests.createUserRequest(...args);

	/**
	 * @see {@link RequestsResource.updateUserRequest}
	 */
	updateUserRequest: RequestsResource["updateUserRequest"] = (...args) =>
		this.requests.updateUserRequest(...args);

	/**
	 * @see {@link RequestsResource.operateUserRequest}
	 */
	operateUserRequest: RequestsResource["operateUserRequest"] = (...args) =>
		this.requests.operateUserRequest(...args);

	/**
	 * @see {@link RequestsResource.deleteUserRequest}
	 */
	deleteUserRequest: RequestsResource["deleteUserRequest"] = (...args) =>
		this.requests.deleteUserRequest(...args);

	/**
	 * @see {@link RequestsResource.retrieveResourceSharingRequest}
	 */
	retrieveResourceSharingRequest: RequestsResource["retrieveResourceSharingRequest"] =
		(...args) => this.requests.retrieveResourceSharingRequest(...args);

	/**
	 * @see {@link RequestsResource.createResourceSharingRequest}
	 */
	createResourceSharingRequest: RequestsResource["createResourceSharingRequest"] =
		(...args) => this.requests.createResourceSharingRequest(...args);

	/**
	 * @see {@link RequestsResource.operateResourceSharingRequest}
	 */
	operateResourceSharingRequest: RequestsResource["operateResourceSharingRequest"] =
		(...args) => this.requests.operateResourceSharingRequest(...args);

	/**
	 * @see {@link RequestsResource.deleteResourceSharingRequest}
	 */
	deleteResourceSharingRequest: RequestsResource["deleteResourceSharingRequest"] =
		(...args) => this.requests.deleteResourceSharingRequest(...args);

	// ── Fees ──────────────────────────────────────────────────────────────────

	/**
	 * @see {@link FeesResource.retrieveUserFeesList}
	 */
	retrieveUserFeesList: FeesResource["retrieveUserFeesList"] = (...args) =>
		this.fees.retrieveUserFeesList(...args);

	/**
	 * @see {@link FeesResource.retrieveUserFee}
	 */
	retrieveUserFee: FeesResource["retrieveUserFee"] = (...args) =>
		this.fees.retrieveUserFee(...args);

	/**
	 * @see {@link FeesResource.operateUserFee}
	 */
	operateUserFee: FeesResource["operateUserFee"] = (...args) =>
		this.fees.operateUserFee(...args);

	/**
	 * @see {@link FeesResource.operateAllUserFees}
	 */
	operateAllUserFees: FeesResource["operateAllUserFees"] = (...args) =>
		this.fees.operateAllUserFees(...args);

	/**
	 * @see {@link FeesResource.retrieveUserDepositsList}
	 */
	retrieveUserDepositsList: FeesResource["retrieveUserDepositsList"] = (
		...args
	) => this.fees.retrieveUserDepositsList(...args);

	/**
	 * @see {@link FeesResource.retrieveUserDeposit}
	 */
	retrieveUserDeposit: FeesResource["retrieveUserDeposit"] = (...args) =>
		this.fees.retrieveUserDeposit(...args);

	/**
	 * @see {@link FeesResource.createUserDeposit}
	 */
	createUserDeposit: FeesResource["createUserDeposit"] = (...args) =>
		this.fees.createUserDeposit(...args);

	/**
	 * @see {@link FeesResource.operateUserDeposit}
	 */
	operateUserDeposit: FeesResource["operateUserDeposit"] = (...args) =>
		this.fees.operateUserDeposit(...args);

	// ── Purchase Requests ─────────────────────────────────────────────────────

	/**
	 * @see {@link PurchaseRequestsResource.retrieveUserPurchaseRequestsList}
	 */
	retrieveUserPurchaseRequestsList: PurchaseRequestsResource["retrieveUserPurchaseRequestsList"] =
		(...args) =>
			this.purchaseRequests.retrieveUserPurchaseRequestsList(...args);

	/**
	 * @see {@link PurchaseRequestsResource.retrieveUserPurchaseRequest}
	 */
	retrieveUserPurchaseRequest: PurchaseRequestsResource["retrieveUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.retrieveUserPurchaseRequest(...args);

	/**
	 * @see {@link PurchaseRequestsResource.createUserPurchaseRequest}
	 */
	createUserPurchaseRequest: PurchaseRequestsResource["createUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.createUserPurchaseRequest(...args);

	/**
	 * @see {@link PurchaseRequestsResource.operateUserPurchaseRequest}
	 */
	operateUserPurchaseRequest: PurchaseRequestsResource["operateUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.operateUserPurchaseRequest(...args);

	/** @see {@link PurchaseRequestsResource.updateUserPurchaseRequest} */
	updateUserPurchaseRequest: PurchaseRequestsResource["updateUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.updateUserPurchaseRequest(...args);

	// ── Leganto ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link LegantoResource.retrieveLegantoNotifications}
	 */
	retrieveLegantoNotifications: LegantoResource["retrieveLegantoNotifications"] =
		(...args) => this.leganto.retrieveLegantoNotifications(...args);

	// ── Staff Login Report ────────────────────────────────────────────────────

	/**
	 * @see {@link StaffLoginReportResource.retrieveStaffLoginReport}
	 */
	retrieveStaffLoginReport: StaffLoginReportResource["retrieveStaffLoginReport"] =
		(...args) => this.staffLoginReport.retrieveStaffLoginReport(...args);
}
