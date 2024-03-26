import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();

        const data = {
            userId: 1,
            text: form.get("text")?.toString()
        }

        await fetch(`${PUBLIC_BACKEND_URL}/api/posts`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });
        
        return {
            success: true
        }
    }
};
