<script lang="ts">
	import type { Post } from '$lib/models/Post';
    import { formattedDate } from './utils';
	import HeartIcon from '@tabler/icons-svelte/IconHeart.svelte';
	import BookmarkIcon from '@tabler/icons-svelte/IconBookmark.svelte';
	import GotoIcon from '@tabler/icons-svelte/IconArrowUpRight.svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

	export let post: Post;
	$: ({ id, user: creator, postedAt, text, likes, userWhoLikedIds } = post);
	
	async function like() {
		await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/like/${post.id}`)
		post.likes += 1;
		post.userWhoLikedIds = [...post.userWhoLikedIds, $user.id];
	}

	async function unlike() {
		await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}/unlike/${post.id}`)
		post.likes -= 1;
		post.userWhoLikedIds = post.userWhoLikedIds.filter(id => id !== $user.id);
	}
</script>

<!--
@component

Renders an all-included post with metadata and buttons.

There are three distinct sections.

__The first section displays:__
* The poster's avatar
* The poster's nickname
* The date of the post

__The second section displays either a text and/or (an) image(s):__
* If a text is set, it shows up as standalone if no images was provided
* If there's a least 1 image: displays an image carousel if there are multiple images, or a static image placeholder if there is one
* When both are set, the text is displayed under the image(s)

__The third section displays:__
* The like count of the post
* 3 buttons : like, bookmark and open the comments section

-->

<div class="relative w-full flex flex-col">
	<div class="relative w-full h-20 flex">
		<a href="/profile/{creator.id}" class="relative w-full h-full p-5 flex justify-start items-center gap-5 cursor-pointer">
			<div class="relative h-full aspect-square rounded-full bg-black"></div>
			<div class="relative flex flex-col items-start justify-between">
				<p class="font-medium">{creator.nickname}</p>
				<p class="font-medium text-gray-500 text-xs">{formattedDate(postedAt)}</p>
			</div>
		</a>
	</div>
	<div class="flex flex-col gap-5">
		<p class="text-sm text-justify px-5">{text}</p>
	</div>
	<div class="relative w-full p-5 flex flex-col gap-5">
		<div class="relative w-full flex justify-between items-center">
			<div class="relative flex gap-5">
				<div class="flex gap-1">
					{#if userWhoLikedIds.includes($user.id)}
						<button on:click={unlike}>
							<HeartIcon class="fill-red-500 text-red-500" />
						</button>
					{:else}
						<button on:click={like}>
							<HeartIcon class="fill-white text-black" />
						</button>
					{/if}
					<span>{likes}</span>
				</div>
				<BookmarkIcon />
			</div>
			{#if $page.url.pathname !== `/posts/${id}`}
				<a href="/posts/{id}" class="flex gap-2 border-bottom-2 border-black">Open <GotoIcon /></a>
			{/if}
		</div>
	</div>
</div>
