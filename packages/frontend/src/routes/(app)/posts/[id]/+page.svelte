<script lang="ts">
	import { IconArrowNarrowLeft } from '@tabler/icons-svelte';
	import type { PageData } from './$types.js';
	import Post from '$lib/components/shared/Post/PostCard.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ApiResponse } from '$lib/models/ApiResponse';
    import { addToast } from '../../../../lib/stores/toast.js';

	export let data: PageData;

	const destroy = async () => {
		const response = await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${data.post?.id}`, {
			method: 'DELETE'
		});

		const result: ApiResponse = await response.json();

		if (!result.success) {
			addToast({ type: "error", message: result.message })
			return;
		}

		addToast({ type: "success", message: "Post deleted successfully." })

		history.back();
	};
</script>

<nav class="relative w-full min-h-[60px] px-5 flex justify-start items-center z-50">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="javascript:history.back()" class="flex gap-3 border-b-2 border-black py-1">
		<IconArrowNarrowLeft class="text-black" />
		<span>Back</span>
	</a>
</nav>
{#if !data.post}
	<p>Something went wrong. Please try again later.</p>
{:else}
	<Post post={data.post} />
	{#if data.post.user.id}
		<a href="/posts/{data.post.id}/edit">Edit this post</a>
		<button on:click={destroy}>Delete this post</button>
	{/if}
{/if}
