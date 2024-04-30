import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Post } from '$lib/models/Post';
import type { PageServerLoad } from './$types';

const getPost = async (id: string): Promise<Post> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${id}`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ params }) => {
	return {
		post: await getPost(params.id)
	}
};
