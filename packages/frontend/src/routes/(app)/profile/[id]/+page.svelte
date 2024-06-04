<script lang="ts">
    import type { PageData } from './$types';
    import UserMetric from '$lib/components/profile/UserMetric.svelte';
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconTexture from '@tabler/icons-svelte/IconTexture.svelte';
    import IconUserPlus from '@tabler/icons-svelte/IconUserPlus.svelte';
    import IconUserMinus from '@tabler/icons-svelte/IconUserMinus.svelte';
    import IconMessagePlus from '@tabler/icons-svelte/IconMessagePlus.svelte';
    import { user } from '$lib/stores/user';
    import { addToast } from '$lib/stores/toast';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import IconUserFilled from '@tabler/icons-svelte/IconUserFilled.svelte';

    export let data: PageData;

    async function follow() {
        await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/follow/${data.user.id}`);
        $user.followingIds = [...$user.followingIds, data.user.id];
        $user.meta.followingCount += 1;
        data.user.meta.followerCount += 1;
    }

    async function unfollow() {
        await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/unfollow/${data.user.id}`);
        $user.followingIds = $user.followingIds.filter((id) => id !== data.user.id);
        $user.meta.followingCount -= 1;
        data.user.meta.followerCount -= 1;
    }
</script>

<svelte:head>
    <title>{data.user.nickname} - Amstramgram</title>
</svelte:head>

<div class="relative w-full min-h-full flex flex-col overflow-auto pb-5">
    <nav class="absolute w-full top-0 left-0 h-20 p-5 flex justify-start items-center z-20">
        <button on:click={() => history.back()} class="flex gap-5 items-center text-white">
            <IconChevronLeft />
            <span>Back</span>
        </button>
    </nav>
    {#if !data.user}
        <p>Unable to retrieve user data. Please try again later.</p>
    {:else}
        <div
            class="relative w-full min-h-[550px] flex flex-col justify-end p-5 gap-5 bg-blue-500 bg-center shadow-[inset_0_-350px_200px_-200px_rgba(17,17,17,1)]"
        >
            {#if data.user.avatarPath}
                {@const path = `${PUBLIC_BACKEND_URL}/${data.user.avatarPath}`}
                <div
                    style="background-image: url('{path}');"
                    class="relative w-20 bg-cover bg-center aspect-square rounded-full flex justify-center items-center"
                ></div>
            {:else}
                <div class="relative w-20 aspect-square bg-black rounded-full flex justify-center items-center">
                    <IconUserFilled class="relative size-12 text-white" />
                </div>
            {/if}
            <h1 class="text-4xl text-white">{data.user.nickname}</h1>
            <h2 class="text-white">{data.user.firstName} {data.user.lastName}</h2>
            <div class="relative w-full flex justify-center gap-10">
                <UserMetric value={data.user.meta.postCount} label="posts" />
                <UserMetric value={data.user.meta.followingCount} label="following" />
                <UserMetric value={data.user.meta.followerCount} label="followers" />
            </div>
            <p class="text-white text-sm text-justify">{data.user.biography}</p>
            <div class="relative w-full h-[50px] flex justify-between items-center gap-5">
                <button
                    on:click={() => {
                        addToast({ type: 'info', message: 'This feature is not available yet.' });
                    }}
                    type="button"
                    class="relative h-full flex-grow rounded bg-white text-black flex justify-center items-center gap-3"
                >
                    <span>Message</span>
                    <IconMessagePlus />
                </button>
                {#if $user.followingIds.find((f) => f === Number(data.userId))}
                    <button
                        on:click={unfollow}
                        class="relative h-full flex-grow rounded bg-blue-700 text-white flex justify-center items-center gap-3"
                    >
                        <span>Followed</span>
                        <IconUserMinus />
                    </button>
                {:else}
                    <button on:click={follow} class="relative h-full flex-grow rounded bg-white text-black flex justify-center items-center gap-3">
                        <span>Follow</span>
                        <IconUserPlus />
                    </button>
                {/if}
            </div>
        </div>
        {#await data.posts}
            <p>Loading the posts...</p>
        {:then posts}
            {#each posts as post}
                <PostCard {post} />
            {:else}
                <div class="relative w-full flex-grow flex flex-col justify-center items-center gap-10">
                    <IconTexture class="size-20" />
                    <span>They haven't posted anything yet...</span>
                </div>
            {/each}
        {:catch}
            <p>Something went wrong. Please try again later.</p>
        {/await}
    {/if}
</div>
