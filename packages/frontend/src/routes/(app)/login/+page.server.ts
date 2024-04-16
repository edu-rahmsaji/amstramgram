import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ cookies, url }) => {
        cookies.set("id", "1", { path: "/" });

        const redirectTo = url.searchParams.get("redirectTo") ?? "/";

        throw redirect(303, redirectTo);
    }
};
