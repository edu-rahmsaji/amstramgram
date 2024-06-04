import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { User } from "$lib/models/User";
import type { LayoutServerLoad } from "./$types";

async function getUser(id: string): Promise<User | undefined> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${id}`);
        return (await response.json()).data as User;
    }  catch (error) {
		console.error("An error occurred while fetching the user : " + (error as Error).message);
		return undefined;
	}
}

export const load: LayoutServerLoad = async ({ cookies }) => {
    const userId = cookies.get("id");

    return {
        user: userId ? await getUser(userId) : null
    }
};
