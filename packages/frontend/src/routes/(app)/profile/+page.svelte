<script lang="ts">
	import type { PageData } from './$types';
	import Nav from '$lib/components/profile/Nav.svelte';
	import UserInfo from '$lib/components/profile/UserInfo.svelte';
	import PostTypeSelection from '$lib/components/profile/PostTypeSelection.svelte';
	import Content from '$lib/components/profile/Content.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>My Profile - Amstramgram</title>
</svelte:head>

<div class="relative w-full flex flex-col">
	<Nav />
	<UserInfo />
	<PostTypeSelection type={data.type} />
	{#await data.posts}
		<p>Loading the posts...</p>
	{:then posts}
		<Content {posts} type={data.type} />
	{:catch}
		<p>Something went wrong. Please try again later.</p>
	{/await}
</div>
