import type { Post } from '$lib/models/Post';
import type { PageServerLoad } from './$types.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const getPosts = async (userId: string): Promise<Post[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${userId}/posts`);
	const posts = (await response.json()).data as Post[];
    return posts.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
}

export const load: PageServerLoad = async ({ cookies }) => {
	return {
		posts: getPosts(cookies.get("id")!)
	};
};
