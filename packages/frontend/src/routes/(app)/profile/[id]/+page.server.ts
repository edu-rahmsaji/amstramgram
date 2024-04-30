import type { Post } from '$lib/models/Post';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { User } from '$lib/models/User';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const getPosts = async (userId: string): Promise<Post[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${userId}/posts`);
	return (await response.json()).data;
}

const getUser = async (id: string): Promise<User> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${id}`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId = params.id;

	if (userId === cookies.get("id")!) {
		redirect(303, "/profile");
	}

	return {
		userId: userId,
		posts: getPosts(userId),
		user: await getUser(userId)
	};
};
