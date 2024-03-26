<script lang="ts">
	import type { PageData } from './$types.js';
	import { onMount } from 'svelte';
	import UserInfo from '$lib/profile/UserInfo.svelte';
	import PostTypeSelection from '$lib/profile/PostTypeSelection.svelte';
	import Content from '$lib/profile/Content.svelte';
	import { IconMenu as MenuIcon, IconArrowNarrowLeft as BackIcon } from '@tabler/icons-svelte';

	export let data: PageData;
	$: ({ type, user } = data);

	onMount(() => {
		document.title = `${user.nickname} - Amstramgram`;
	});
</script>

{#if !user}
	<p>Unable to retrieve user data. Please try again later.</p>
{:else}
	<nav class="absolute w-full min-h-[60px] px-5 flex justify-between items-center z-50">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="javascript:history.back()">
			<BackIcon class="text-white" />
		</a>
		<MenuIcon class="text-white" />
	</nav>
	<UserInfo {user} />
	<PostTypeSelection {type} />
	{#await data.posts}
		<p>Loading the user's posts...</p>
	{:then posts}
		<Content {posts} {type} />
	{:catch}
		<p>Something went wrong. Please try again later.</p>
	{/await}
{/if}
