import type { Post } from '$lib/models/Post';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { allowedTypeParams, type TypeParam } from '$lib/models/ProfilePostType.js';

const getPosts = async (): Promise<Post[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/1/posts`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ url }) => {
	const typeParam = (url.searchParams.get('type') ?? '') as TypeParam;

	if (!allowedTypeParams.includes(typeParam)) {
		redirect(303, '/profile');
	}

	return {
		type: typeParam,
		posts: getPosts()
	};
};

export const actions: Actions = {
	default: async () => {
		return fail(422, { message: "This functionality is not implemented yet." });
	}
}
