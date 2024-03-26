export type User = {
	id: number;
	nickname: string;
	isPrivate: boolean;
	firstName: string;
	lastName: string;
	email: string;
	biography: string;
	meta: {
		postCount: number;
		followerCount: number;
		followingCount: number;
	};
	/** A parsable date. */
	joinedOn: string;
}

export type SimplifiedUser = {
	id: number;
	nickname: string;
	firstName: string;
	lastName: string;
}
