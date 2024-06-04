import type { PageServerLoad } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { User } from "$lib/models/User";

async function getAllUsers(userId: number) {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user`);
    const result = await response.json();
    return (result.data as User[]).filter(user => user.id !== userId);
}

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        allUsers: getAllUsers(Number(cookies.get("id")!))
    }
}
