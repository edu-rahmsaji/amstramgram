<script lang="ts">
    import type { PageData } from './$types';
    import Nav from '$lib/components/profile/Nav.svelte';
    import UserMetric from '$lib/components/profile/UserMetric.svelte';
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
    import { user } from '$lib/stores/user';
    import IconTexture from '@tabler/icons-svelte/IconTexture.svelte';
    import IconUserFilled from '@tabler/icons-svelte/IconUserFilled.svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ChangeEventHandler } from 'svelte/elements';
    import { addToast } from '$lib/stores/toast';

    export let data: PageData;

    let avatarNode: HTMLInputElement;

    const updateAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.currentTarget.files?.item(0);

        if (!file) return;

        const form = new FormData();

        form.append('avatar', file);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/avatar`, {
            method: 'POST',
            body: form,
            headers: {
                accept: 'application/json'
            }
        });
        const result = await response.json();

        $user.avatarPath = result.path;

        addToast({ type: 'success', message: 'Updated avatar successfully' });
    };

    const deleteAvatar = async () => {
        await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/avatar`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            }
        });

        $user.avatarPath = null;
    };
</script>

<svelte:head>
    <title>Profile - Amstramgram</title>
</svelte:head>

<div class="relative w-full min-h-full flex flex-col overflow-auto pb-5">
    <Nav />
    <div
        class="relative w-full min-h-[450px] flex flex-col justify-end p-5 gap-5 bg-blue-500 bg-center shadow-[inset_0_-350px_200px_-200px_rgba(17,17,17,1)]"
    >
        <input type="file" bind:this={avatarNode} class="hidden" on:change={updateAvatar} />
        {#if $user.avatarPath}
            {@const path = `${PUBLIC_BACKEND_URL}/${$user.avatarPath}`}
            <button
                style="background-image: url('{path}');"
                on:click={() => {
                    if (window.confirm('Do you want to delete your avatar ?')) {
                        deleteAvatar();
                    } else {
                        avatarNode.click();
                    }
                }}
                class="relative w-20 bg-cover bg-center aspect-square rounded-full flex justify-center items-center"
            ></button>
        {:else}
            <button on:click={() => avatarNode.click()} class="relative w-20 aspect-square bg-black rounded-full flex justify-center items-center">
                <IconUserFilled class="relative size-12 text-white" />
            </button>
        {/if}
        <h1 class="text-4xl text-white">{$user.nickname}</h1>
        <h2 class="text-white">{$user.firstName} {$user.lastName}</h2>
        <div class="relative w-full flex justify-center gap-10">
            <UserMetric value={$user.meta.postCount} label="posts" />
            <UserMetric value={$user.meta.followingCount} label="following" />
            <UserMetric value={$user.meta.followerCount} label="followers" />
        </div>
        <p class="text-white text-sm text-justify">{$user.biography}</p>
    </div>
    {#await data.posts}
        <p>Loading the posts...</p>
    {:then posts}
        {#each posts as post}
            <PostCard {post} />
        {:else}
            <div class="relative w-full flex-grow flex flex-col justify-center items-center gap-10">
                <IconTexture class="size-20" />
                <span>You haven't posted anything yet...</span>
            </div>
        {/each}
    {:catch}
        <p>Something went wrong. Please try again later.</p>
    {/await}
</div>
