<script lang="ts">
	import type { PageData } from './$types.js';
	import { onMount } from 'svelte';
	import Nav from '$lib/profile/Nav.svelte';
	import UserInfo from '$lib/profile/UserInfo.svelte';
	import PostTypeSelection from '$lib/profile/PostTypeSelection.svelte';
	import Content from '$lib/profile/Content.svelte';

	export let data: PageData;
	$: ({ type, user } = data);

	onMount(() => {
		document.title = 'My Profile - Amstramgram';
	});
</script>

{#if !user}
	<p>Unable to retrieve user data. Please try again later.</p>
{:else}
	<Nav />
	<UserInfo {user} />
	<PostTypeSelection {type} />
	{#await data.posts}
		<p>Loading the posts...</p>
	{:then posts}
		<Content {posts} {type} />
	{:catch}
		<p>Something went wrong. Please try again later.</p>
	{/await}
{/if}
