import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Post } from '$lib/models/Post';
import type { User } from '$lib/models/User';
import type { PageServerLoad } from './$types';

const getPosts = async (): Promise<Post[] | undefined> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts`);
	return (await response.json()).data as Post[];
}

/* const getFriendSuggestions = async (): Promise<User[] | undefined> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user`);
	const allUsers = await response.json() as User[];

	return allUsers
} */

export const load: PageServerLoad = async () => {
	return {
		posts: getPosts()
	}
};
