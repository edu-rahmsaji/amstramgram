<script lang="ts">
	import type { PageData } from './$types';
	import Nav from '$lib/components/profile/Nav.svelte';
	import UserMetric from '$lib/components/profile/UserMetric.svelte';
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
	import { user } from "$lib/stores/user";
	import IconTexture from '@tabler/icons-svelte/IconTexture.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Profile - Amstramgram</title>
</svelte:head>

<div class="relative w-full min-h-full flex flex-col overflow-auto pb-5">
	<Nav />
	<div
        class="relative w-full min-h-[450px] flex flex-col justify-end p-5 gap-5 bg-blue-500 bg-center shadow-[inset_0_-350px_200px_-200px_rgba(17,17,17,1)]"
    >
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
