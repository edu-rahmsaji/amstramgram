<script lang="ts">
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
    import { getContext } from 'svelte';
    import type { PageData } from './$types';
    import type { User } from '$lib/models/User';
    import type { Writable } from 'svelte/store';

    export let data: PageData;

	const user = getContext<Writable<User | undefined>>("user");
</script>

<svelte:head>
    <title>Home - Amstramgram</title>
</svelte:head>

{#await data.posts}
    <p>Loading your feed...</p>
{:then posts}
    {#if !posts}
        <p>Unable to retrieve the posts. Please try again later.</p>
    {:else}
		{#if $user}
			<h1>Hello {$user.firstName}</h1>
		{/if}
        {#each posts as post}
            <PostCard {post} />
        {:else}
            <p>No post has been created yet...</p>
        {/each}
    {/if}
{:catch}
    <p>Something went wrong. Please try again later.</p>
{/await}
