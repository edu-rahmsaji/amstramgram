import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Post } from '$lib/models/Post';
import type { PageServerLoad } from './$types';

const getPost = async (id: string): Promise<Post> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${id}`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		return {
			post: await getPost(params.id)
		}
	} catch (err) {
		console.error("An error occurred while fetching a post : " + (err as Error).message);
		return {}
	}
};
