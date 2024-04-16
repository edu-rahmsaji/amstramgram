import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Post } from '$lib/models/Post';
import type { PageServerLoad } from './$types';

const getPosts = async (): Promise<Post[] | undefined> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts`);
	return (await response.json()).data as Post[];
}

export const load: PageServerLoad = async () => {
	return {
		posts: getPosts()
	}
};
