import type { Actions, PageServerLoad } from './$types';
import type { User } from '$lib/models/User';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Message } from '$lib/models/Message';
import { fail } from '@sveltejs/kit';

const getRecipient = async (id: string): Promise<User> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${id}`);
	return (await response.json()).data;
}

const getConversationData = async (userOneId: string, userTwoId: string): Promise<Message[]> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v2/${userOneId}/chat/${userTwoId}`);
	return (await response.json()).data;
}

export const load: PageServerLoad = async ({ cookies, params }) => {
	console.log(await getConversationData(cookies.get("id")!, params.recipientId))

	return {
		recipient: await getRecipient(params.recipientId),
		conversation: await getConversationData(cookies.get("id")!, params.recipientId)
	};
};

export const actions: Actions = {
	send: async ({ cookies, params, request }) => {
		const form = await request.formData();
		const content = form.get("content")?.toString();

		if (!content || content === "") {
			return fail(422, { message: "Enter a message to send !" })
		}

		const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v2/${cookies.get("id")}/chat`, {
			method: "POST",
			body: JSON.stringify({
				receiverId: params.recipientId,
				content: content
			}),
			headers: {
				"accept": "application/json",
				"content-type": "application/json"
			}
		});
		const result = await response.json();
		return {
			message: result.data
		};
	}
}
