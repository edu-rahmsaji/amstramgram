<script lang="ts">
	import { page } from '$app/stores';
import {
		IconHeart as HeartIcon,
		IconBookmark as BookmarkIcon,
		IconArrowUpRight as GotoIcon
	} from '@tabler/icons-svelte';

	export let id: number;
	export let likes: number | undefined;
</script>

<div class="relative w-full p-5 flex flex-col gap-5">
	<div class="relative w-full flex justify-between items-center">
		<div class="relative flex gap-5">
			<div class="flex gap-1">
				<HeartIcon />
				<span>{likes}</span>
			</div>
			<BookmarkIcon />
		</div>
		{#if $page.url.pathname !== `/posts/${id}`}
			<a href="/posts/{id}" class="flex gap-2 border-bottom-2 border-black">Open <GotoIcon /></a>
		{/if}
	</div>
</div>
