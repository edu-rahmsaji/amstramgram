<script lang="ts">
	import { IconArrowNarrowLeft as LeftArrow } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types.js';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	onMount(async () => {
		if (form?.success) {
			await goto("/profile")
		}
	})

	let text: string = '';
	let image: File;

	onMount(() => {
		document.title = 'New Post - Amstramgram';
	});
</script>

<nav class="relative w-full h-20 p-5 flex justify-start items-center">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="javascript:history.back()" class="flex gap-5 border-b-2 py-2 border-black">
		<LeftArrow />
		<span>Go back</span>
	</a>
</nav>
<form method="post">
	<textarea name="text" bind:value={text}></textarea>
	<button type="submit">Create post</button>
</form>
