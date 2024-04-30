import type { SimplifiedUser } from "./User";

export interface Post {
	id: number;
	/** A simplified version of a user. */
	user: SimplifiedUser;
	text: string;
	likes: number;
	userWhoLikedIds: number[],
	/** A parsable date. */
	postedAt: string;
}
