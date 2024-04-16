import type { SimplifiedUser } from "./User";

export interface Post {
	id: number;
	/** A simplified version of a user. */
	user: SimplifiedUser;
	text: string;
	/** A parsable string array. */
	imagePaths: string;
	likes: number;
	/** A parsable date. */
	postedAt: string;
}
