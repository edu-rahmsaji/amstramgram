<script lang="ts">
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconTrash from '@tabler/icons-svelte/IconTrash.svelte';
    import IconEdit from '@tabler/icons-svelte/IconEdit.svelte';
    import type { PageData } from './$types.js';
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$lib/models/ApiResponse';
    import { addToast } from '$lib/stores/toast';
    import { user } from '$lib/stores/user';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const destroy = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${data.post?.id}`, {
            method: 'DELETE'
        });

        const result: ApiResponse = await response.json();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        }

        addToast({ type: 'success', message: 'Post deleted successfully.' });
        history.back();
        $user.meta.postCount -= 1;
    };
</script>

<svelte:head>
    <title>Post by {data.post?.user.nickname} - Amstramgram</title>
</svelte:head>

<nav class="relative w-full h-20 p-5 flex justify-start items-center">
    <button on:click={() => history.back()} class="flex gap-5 py-2">
        <IconChevronLeft />
        <span>Back</span>
    </button>
</nav>
{#if !data.post}
    <p>Something went wrong. Please try again later.</p>
{:else}
    <PostCard post={data.post} />
    {#if data.post.user.id === $user.id}
        <div class="relative w-full h-[50px] flex justify-between items-center gap-5 px-5">
            <button
                on:click={() => goto(`/posts/${data.post.id}/edit`)}
                type="button"
                class="relative h-full flex-grow rounded bg-blue-700 text-white flex justify-center items-center gap-3"
            >
                <span>Edit</span>
                <IconEdit />
            </button>
            <button on:click={destroy} class="relative h-full flex-grow rounded bg-red-500 text-white flex justify-center items-center gap-3">
                <span>Delete</span>
                <IconTrash class="text-white" />
            </button>
        </div>
    {/if}
{/if}
