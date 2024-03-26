<script lang="ts">
	import { IconArrowNarrowLeft } from '@tabler/icons-svelte';
	import type { ActionData, PageData } from './$types.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let form: ActionData;

	onMount(async () => {
		if (form?.success) {
			await goto(`/posts/${data.post?.id}`)
		}
	})

	let text: string = data.post?.text ?? "";
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
	<form method="post">
		<input name="_method" type="hidden" value="PUT" />
		<textarea name="text" class="mx-5 border border-blue-500 h-52" bind:value={text}></textarea>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/posts/{data.post.id}">Cancel</a>
		<button type="submit">Update</button>
	</form>
{/if}
