<script lang="ts">
    import PostCard from '$lib/components/shared/Post/PostCard.svelte';
    import type { PageData } from './$types';
    import { user } from '$lib/stores/user';
    import type { Post } from '$lib/models/Post';

    export let data: PageData;

    function removeOwnPosts(posts: Post[]) {
        return posts.filter(post => post.user.id !== $user.id);
    }
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
        <ul class="relative w-full overflow-auto">
            <h1 class="mx-5 mt-5 text-2xl">Hello {$user.firstName}</h1>
            {#each removeOwnPosts(posts) as post}
                <PostCard {post} />
            {:else}
                <p>No post has been created yet...</p>
            {/each}
        </ul>
    {/if}
{:catch}
    <p>Something went wrong. Please try again later.</p>
{/await}
