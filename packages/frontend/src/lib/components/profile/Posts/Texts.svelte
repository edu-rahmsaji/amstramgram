<script lang="ts">
	import type { Post } from '$models/Post.js';
	import { IconHeart } from '@tabler/icons-svelte';

	export let texts: Post[];
</script>

{#if texts.length === 0}
	<p>You haven't posted any texts yet...</p>
{:else}
	<div class="relative w-full grid grid-cols-1 gap-5 p-5">
		{#each texts as { text, likes }}
			<div class="relative w-full overflow-y-hidden flex flex-col items-center last-of-type:">
				<p class="text-justify">{text}</p>
				<div class="flex">
					<IconHeart /> {likes}
				</div>
			</div>
		{/each}
	</div>
{/if}
