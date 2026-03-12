import type { AlmaHttpClient } from "@/client";

import { UsersFeesResource } from "./fees";
import { UsersLegantoResource } from "./leganto";
import { UsersLoansResource } from "./loans";
import { UsersPurchaseRequestsResource } from "./purchase-requests";
import { UsersRequestsResource } from "./requests";
import { UsersStaffLoginReportResource } from "./staff-login-report";
import { UsersUsersResource } from "./users";

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
	readonly users: UsersUsersResource;
	/** Loans sub-resource: user loans. */
	readonly loans: UsersLoansResource;
	/** Requests sub-resource: user requests and resource sharing requests. */
	readonly requests: UsersRequestsResource;
	/** Fees sub-resource: fees and deposits. */
	readonly fees: UsersFeesResource;
	/** Purchase requests sub-resource. */
	readonly purchaseRequests: UsersPurchaseRequestsResource;
	/** Leganto sub-resource: Leganto notifications. */
	readonly leganto: UsersLegantoResource;
	/** Staff login report sub-resource. */
	readonly staffLoginReport: UsersStaffLoginReportResource;

	constructor(client: AlmaHttpClient) {
		this.users = new UsersUsersResource(client);
		this.loans = new UsersLoansResource(client);
		this.requests = new UsersRequestsResource(client);
		this.fees = new UsersFeesResource(client);
		this.purchaseRequests = new UsersPurchaseRequestsResource(client);
		this.leganto = new UsersLegantoResource(client);
		this.staffLoginReport = new UsersStaffLoginReportResource(client);
	}

	// ── Users ─────────────────────────────────────────────────────────────────

	/** @see {@link UsersUsersResource.retrieveUsersList} */
	retrieveUsersList: UsersUsersResource["retrieveUsersList"] = (...args) =>
		this.users.retrieveUsersList(...args);

	/** @see {@link UsersUsersResource.retrieveUser} */
	retrieveUser: UsersUsersResource["retrieveUser"] = (...args) =>
		this.users.retrieveUser(...args);

	/** @see {@link UsersUsersResource.retrieveMe} */
	retrieveMe: UsersUsersResource["retrieveMe"] = (...args) =>
		this.users.retrieveMe(...args);

	/** @see {@link UsersUsersResource.retrieveUserPersonalData} */
	retrieveUserPersonalData: UsersUsersResource["retrieveUserPersonalData"] = (
		...args
	) => this.users.retrieveUserPersonalData(...args);

	/** @see {@link UsersUsersResource.createUser} */
	createUser: UsersUsersResource["createUser"] = (...args) =>
		this.users.createUser(...args);

	/** @see {@link UsersUsersResource.updateUser} */
	updateUser: UsersUsersResource["updateUser"] = (...args) =>
		this.users.updateUser(...args);

	/** @see {@link UsersUsersResource.operateUser} */
	operateUser: UsersUsersResource["operateUser"] = (...args) =>
		this.users.operateUser(...args);

	/** @see {@link UsersUsersResource.deleteUser} */
	deleteUser: UsersUsersResource["deleteUser"] = (...args) =>
		this.users.deleteUser(...args);

	/** @see {@link UsersUsersResource.retrieveUserAttachment} */
	retrieveUserAttachment: UsersUsersResource["retrieveUserAttachment"] = (
		...args
	) => this.users.retrieveUserAttachment(...args);

	/** @see {@link UsersUsersResource.createUserAttachment} */
	createUserAttachment: UsersUsersResource["createUserAttachment"] = (
		...args
	) => this.users.createUserAttachment(...args);

	/** @see {@link UsersUsersResource.test} */
	test: UsersUsersResource["test"] = (...args) => this.users.test(...args);

	// ── Loans ─────────────────────────────────────────────────────────────────

	/** @see {@link UsersLoansResource.retrieveUserLoansList} */
	retrieveUserLoansList: UsersLoansResource["retrieveUserLoansList"] = (
		...args
	) => this.loans.retrieveUserLoansList(...args);

	/** @see {@link UsersLoansResource.retrieveUserLoan} */
	retrieveUserLoan: UsersLoansResource["retrieveUserLoan"] = (...args) =>
		this.loans.retrieveUserLoan(...args);

	/** @see {@link UsersLoansResource.createUserLoan} */
	createUserLoan: UsersLoansResource["createUserLoan"] = (...args) =>
		this.loans.createUserLoan(...args);

	/** @see {@link UsersLoansResource.updateUserLoan} */
	updateUserLoan: UsersLoansResource["updateUserLoan"] = (...args) =>
		this.loans.updateUserLoan(...args);

	/** @see {@link UsersLoansResource.operateUserLoan} */
	operateUserLoan: UsersLoansResource["operateUserLoan"] = (...args) =>
		this.loans.operateUserLoan(...args);

	// ── Requests ──────────────────────────────────────────────────────────────

	/** @see {@link UsersRequestsResource.retrieveUserRequestsList} */
	retrieveUserRequestsList: UsersRequestsResource["retrieveUserRequestsList"] =
		(...args) => this.requests.retrieveUserRequestsList(...args);

	/** @see {@link UsersRequestsResource.retrieveUserRequest} */
	retrieveUserRequest: UsersRequestsResource["retrieveUserRequest"] = (
		...args
	) => this.requests.retrieveUserRequest(...args);

	/** @see {@link UsersRequestsResource.createUserRequest} */
	createUserRequest: UsersRequestsResource["createUserRequest"] = (...args) =>
		this.requests.createUserRequest(...args);

	/** @see {@link UsersRequestsResource.updateUserRequest} */
	updateUserRequest: UsersRequestsResource["updateUserRequest"] = (...args) =>
		this.requests.updateUserRequest(...args);

	/** @see {@link UsersRequestsResource.operateUserRequest} */
	operateUserRequest: UsersRequestsResource["operateUserRequest"] = (...args) =>
		this.requests.operateUserRequest(...args);

	/** @see {@link UsersRequestsResource.deleteUserRequest} */
	deleteUserRequest: UsersRequestsResource["deleteUserRequest"] = (...args) =>
		this.requests.deleteUserRequest(...args);

	/** @see {@link UsersRequestsResource.retrieveResourceSharingRequest} */
	retrieveResourceSharingRequest: UsersRequestsResource["retrieveResourceSharingRequest"] =
		(...args) => this.requests.retrieveResourceSharingRequest(...args);

	/** @see {@link UsersRequestsResource.createResourceSharingRequest} */
	createResourceSharingRequest: UsersRequestsResource["createResourceSharingRequest"] =
		(...args) => this.requests.createResourceSharingRequest(...args);

	/** @see {@link UsersRequestsResource.operateResourceSharingRequest} */
	operateResourceSharingRequest: UsersRequestsResource["operateResourceSharingRequest"] =
		(...args) => this.requests.operateResourceSharingRequest(...args);

	/** @see {@link UsersRequestsResource.deleteResourceSharingRequest} */
	deleteResourceSharingRequest: UsersRequestsResource["deleteResourceSharingRequest"] =
		(...args) => this.requests.deleteResourceSharingRequest(...args);

	// ── Fees ──────────────────────────────────────────────────────────────────

	/** @see {@link UsersFeesResource.retrieveUserFeesList} */
	retrieveUserFeesList: UsersFeesResource["retrieveUserFeesList"] = (...args) =>
		this.fees.retrieveUserFeesList(...args);

	/** @see {@link UsersFeesResource.retrieveUserFee} */
	retrieveUserFee: UsersFeesResource["retrieveUserFee"] = (...args) =>
		this.fees.retrieveUserFee(...args);

	/** @see {@link UsersFeesResource.operateUserFee} */
	operateUserFee: UsersFeesResource["operateUserFee"] = (...args) =>
		this.fees.operateUserFee(...args);

	/** @see {@link UsersFeesResource.operateAllUserFees} */
	operateAllUserFees: UsersFeesResource["operateAllUserFees"] = (...args) =>
		this.fees.operateAllUserFees(...args);

	/** @see {@link UsersFeesResource.retrieveUserDepositsList} */
	retrieveUserDepositsList: UsersFeesResource["retrieveUserDepositsList"] = (
		...args
	) => this.fees.retrieveUserDepositsList(...args);

	/** @see {@link UsersFeesResource.retrieveUserDeposit} */
	retrieveUserDeposit: UsersFeesResource["retrieveUserDeposit"] = (...args) =>
		this.fees.retrieveUserDeposit(...args);

	/** @see {@link UsersFeesResource.createUserDeposit} */
	createUserDeposit: UsersFeesResource["createUserDeposit"] = (...args) =>
		this.fees.createUserDeposit(...args);

	/** @see {@link UsersFeesResource.operateUserDeposit} */
	operateUserDeposit: UsersFeesResource["operateUserDeposit"] = (...args) =>
		this.fees.operateUserDeposit(...args);

	// ── Purchase Requests ─────────────────────────────────────────────────────

	/** @see {@link UsersPurchaseRequestsResource.retrieveUserPurchaseRequestsList} */
	retrieveUserPurchaseRequestsList: UsersPurchaseRequestsResource["retrieveUserPurchaseRequestsList"] =
		(...args) =>
			this.purchaseRequests.retrieveUserPurchaseRequestsList(...args);

	/** @see {@link UsersPurchaseRequestsResource.retrieveUserPurchaseRequest} */
	retrieveUserPurchaseRequest: UsersPurchaseRequestsResource["retrieveUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.retrieveUserPurchaseRequest(...args);

	/** @see {@link UsersPurchaseRequestsResource.createUserPurchaseRequest} */
	createUserPurchaseRequest: UsersPurchaseRequestsResource["createUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.createUserPurchaseRequest(...args);

	/** @see {@link UsersPurchaseRequestsResource.operateUserPurchaseRequest} */
	operateUserPurchaseRequest: UsersPurchaseRequestsResource["operateUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.operateUserPurchaseRequest(...args);

	/** @see {@link UsersPurchaseRequestsResource.updateUserPurchaseRequest} */
	updateUserPurchaseRequest: UsersPurchaseRequestsResource["updateUserPurchaseRequest"] =
		(...args) => this.purchaseRequests.updateUserPurchaseRequest(...args);

	// ── Leganto ───────────────────────────────────────────────────────────────

	/** @see {@link UsersLegantoResource.retrieveLegantoNotifications} */
	retrieveLegantoNotifications: UsersLegantoResource["retrieveLegantoNotifications"] =
		(...args) => this.leganto.retrieveLegantoNotifications(...args);

	// ── Staff Login Report ────────────────────────────────────────────────────

	/** @see {@link UsersStaffLoginReportResource.retrieveStaffLoginReport} */
	retrieveStaffLoginReport: UsersStaffLoginReportResource["retrieveStaffLoginReport"] =
		(...args) => this.staffLoginReport.retrieveStaffLoginReport(...args);
}
