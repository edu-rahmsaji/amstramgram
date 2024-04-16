import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const id = event.cookies.get("id");

	if (!id && !["/", "/login", "/register"].includes(event.url.pathname)) {
		const redirectTo = event.url.pathname;
		const message = "Please login to access more features.";
		throw redirect(303, `/login?redirectTo=${redirectTo}&message=${message}`);
	}

	const response = await resolve(event);
	return response;
};
