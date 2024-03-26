<script lang="ts">
	import Post from '$lib/shared/Post/Post.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	onMount(() => {
		document.title = 'Home - Amstramgram';
	});
</script>

{#if !data.posts}
	<p>Unable to retrieve the posts. Please try again later.</p>
{:else}
	{#await data.posts}
		<p>Loading the posts...</p>
	{:then posts}
		{#each posts as post}
			<Post {post} />
		{:else}
			<p>No post has been created yet...</p>
		{/each}
	{:catch}
		<p>Something went wrong. Please try again later.</p>
	{/await}
{/if}
