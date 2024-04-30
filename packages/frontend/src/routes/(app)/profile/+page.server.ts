import type { Post } from '$lib/models/Post';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { allowedTypeParams, type TypeParam } from '$lib/models/ProfilePostType.js';

const getPosts = async (userId: string): Promise<Post[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${userId}/posts`);
	return (await response.json()).data as Post[];
}

export const load: PageServerLoad = async ({ cookies }) => {
	return {
		posts: getPosts(cookies.get("id")!)
	};
};
