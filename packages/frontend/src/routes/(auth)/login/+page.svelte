<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { addToast } from '$lib/stores/toast';
    import type { PageServerData, SubmitFunction } from './$types';

    export let data: PageServerData;

    let errorMessage = $page.url.searchParams.get('message');
    let timer: NodeJS.Timeout;
    let loading: boolean = false;

    const customEnhance: SubmitFunction = async () => {
        loading = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            addToast({ type: 'info', message: 'This is taking a while. Please wait.' });
        }, 3000);
        return async ({ result }) => {
            await applyAction(result);
            clearTimeout(timer);
            loading = false;
            if (result.type === 'redirect') {
                goto(result.location);
            }
        };
    };
</script>

<svelte:head>
    <title>Login - Amstramgram</title>
</svelte:head>

<div class="relative w-full h-full flex flex-col justify-center items-center p-5 gap-10">
    {#if errorMessage}
        <div class="relative w-full bg-red-500 text-center text-white rounded-lg">
            {errorMessage}
        </div>
    {/if}
    <h1 class="text-3xl font-semibold">Login</h1>
    <p class="text-gray-500 text-justify">
        The login system with Sanctum is not ready yet... Sorry for the inconvenience.
    </p>
    <form method="post" class="relative flex flex-col justify-center items-center gap-10" use:enhance={customEnhance}>
        <div class="relative w-full flex gap-5">
            <label for="id">Select the id of the user you want to login with.</label>
            <select name="id" class="px-5">
                {#each data.userIds as userId}
                    <option>{userId}</option>
                {/each}
            </select>
        </div>
        <button
            type="submit"
            disabled={loading}
            class="relative px-5 py-3 bg-blue-700 text-white rounded-lg disabled:bg-gray-700 disabled:text-gray-800"
        >
            {loading ? 'Loading' : 'Connect'}
        </button>
    </form>
</div>
