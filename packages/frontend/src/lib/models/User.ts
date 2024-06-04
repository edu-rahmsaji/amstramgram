export interface User {
	id: number;
	nickname: string;
	isPrivate: boolean;
	firstName: string;
	lastName: string;
	email: string;
	biography: string;
    avatarPath: string | null;
	meta: {
		postCount: number;
		followerCount: number;
		followingCount: number;
	};
	followingIds: number[],
	/** A parsable date. */
	joinedOn: string;
}

export interface SimplifiedUser {
	id: number;
	nickname: string;
	firstName: string;
	lastName: string;
    avatarPath: string | null;
}
