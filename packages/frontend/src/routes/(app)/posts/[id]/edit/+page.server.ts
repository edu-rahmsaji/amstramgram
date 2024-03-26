import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Post } from '$models/Post.js';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

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

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();

		const data = {
			text: form.get("text")?.toString()
		}

		await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
                "content-type": "application/json"
            }
		});

		return {
            success: true
        }
	}
};
