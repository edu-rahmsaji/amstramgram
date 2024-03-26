<script lang="ts">
	import type { Post } from "$models/Post.js";
	import type { TypeParam } from "$models/ProfilePostType.js";
	import Pics from "./Posts/Pics.svelte";
	import Texts from "./Posts/Texts.svelte";

    export let posts: Post[] | undefined;
    export let type: TypeParam;
</script>

{#if !posts}
    <p>Unable to retrieve the posts. Please try again later.</p>
{:else if type === ''}
    {@const pics = posts.filter((post) => JSON.parse(post.imagePaths).length > 0) ?? []}
    <Pics pics={pics ?? []} />
{:else}
    {@const texts = posts.filter((post) => JSON.parse(post.imagePaths).length === 0) ?? []}
    <Texts texts={texts ?? []} />
{/if}
