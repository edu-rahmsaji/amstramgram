import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { User } from "$lib/models/User";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

async function getUsers(): Promise<User[]> {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user`);
    return (await response.json()).data as User[];
}

export const load: PageServerLoad = async () => {
    return {
        userIds: (await getUsers()).map(u => u.id).sort((a, b) => a - b)
    }
};

export const actions: Actions = {
    default: async ({ cookies, url, request }) => {
        cookies.set("id", (await request.formData()).get("id")!.toString(), { path: "/" });

        const redirectTo = url.searchParams.get("redirectTo") ?? "/feed";

        throw redirect(303, redirectTo);
    }
};
