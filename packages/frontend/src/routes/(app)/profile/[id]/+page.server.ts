import type { Post } from '$lib/models/Post';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { User } from '$lib/models/User';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { allowedTypeParams, type TypeParam } from '$lib/models/ProfilePostType';

const getPosts = async (userId: string): Promise<Post[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${userId}/posts`);
	return (await response.json()).data;
}

const getUser = async (id: string): Promise<User> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${id}`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ url, params }) => {
	const userId = params.id;

	if (userId === "1") {
		redirect(303, "/profile");
	}

	const typeParam = (url.searchParams.get('type') ?? '') as TypeParam;

	if (!allowedTypeParams.includes(typeParam)) {
		redirect(302, url.pathname);
	}

	return {
		type: typeParam,
		posts: getPosts(userId),
		user: await getUser(userId),
	};
};
