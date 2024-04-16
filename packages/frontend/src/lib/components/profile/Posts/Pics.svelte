<script lang="ts">
	import type { Post } from '$models/Post.js';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	export let pics: Post[];
</script>

{#if pics.length === 0}
	<p>You haven't posted any pics yet...</p>
{:else}
	<div class="relative w-full grid grid-cols-2 gap-[2px]">
		{#each pics as { id, imagePaths, text }}
			<a href="/posts/{id}" class="relative w-full aspect-square overflow-y-hidden flex items-center bg-zinc-800">
				<img src="{PUBLIC_BACKEND_URL}/{JSON.parse(imagePaths)[0]}" alt={text} />
			</a>
		{/each}
	</div>
{/if}
