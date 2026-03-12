/**
 * Type aliases for the Alma Bibliographic API.
 *
 * Response bodies from the Alma API are loosely typed because the external
 * JSON Schema references in the OpenAPI spec are unavailable. The shapes below
 * are best-effort representations. Refer to https://developers.exlibrisgroup.com/alma/apis/docs/xsd/
 * for the full XSD definitions.
 */

/** A bibliographic record. */
export type Bib = Record<string, unknown>;

/** A list of bibliographic records. */
export type Bibs = Record<string, unknown>;

/** A holdings record. */
export type Holding = Record<string, unknown>;

/** A list of holdings records. */
export type Holdings = Record<string, unknown>;

/** A physical item. */
export type Item = Record<string, unknown>;

/** A list of items. */
export type Items = Record<string, unknown>;

/** An item or bib loan. */
export type Loan = Record<string, unknown>;

/** A list of loans. */
export type Loans = Record<string, unknown>;

/** A title or item request. */
export type BibRequest = Record<string, unknown>;

/** A list of requests. */
export type BibRequests = Record<string, unknown>;

/** Request options for a title or item. */
export type RequestOptions = Record<string, unknown>;

/** Booking availability. */
export type BookingAvailability = Record<string, unknown>;

/** A physical collection. */
export type Collection = Record<string, unknown>;

/** A list of collections. */
export type Collections = Record<string, unknown>;

/** An electronic collection (database). */
export type ElectronicCollection = Record<string, unknown>;

/** A list of electronic collections. */
export type ElectronicCollections = Record<string, unknown>;

/** A digital representation. */
export type Representation = Record<string, unknown>;

/** A list of digital representations. */
export type Representations = Record<string, unknown>;

/** A file in a digital representation. */
export type RepresentationFile = Record<string, unknown>;

/** A list of files in a digital representation. */
export type RepresentationFiles = Record<string, unknown>;

/** An authority record. */
export type Authority = Record<string, unknown>;

/** A list of authority records. */
export type Authorities = Record<string, unknown>;

/** A portfolio (electronic resource). */
export type Portfolio = Record<string, unknown>;

/** A list of portfolios. */
export type Portfolios = Record<string, unknown>;

/** A reminder on a bib record. */
export type BibReminder = Record<string, unknown>;

/** A list of reminders on bib records. */
export type BibReminders = Record<string, unknown>;
