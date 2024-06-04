<script lang="ts">
	import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
    import type { LayoutServerData } from './$types';
	import { user } from "$lib/stores/user";
	import { fly } from 'svelte/transition';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import { addToast } from '$lib/stores/toast';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { invalidateAll } from '$app/navigation';
	import { initSocket } from "$lib/socket";
	import { onMount } from "svelte";

	export let data: LayoutServerData;
	let showAddPost = false;

	$user = data.user!;

	onMount(async () => {
		await initSocket($user.id)
	})

	async function submit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		const formData = new FormData(event.currentTarget);

		const data = {
            userId: $user.id,
            text: formData.get("text")?.toString()
        }

        if (data.text === "") {
            return addToast({ type: "error", message: "Cannot create a post with an empty caption." });
        }

        await fetch(`${PUBLIC_BACKEND_URL}/api/posts`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        });

		addToast({ type: 'success', message: 'Added post successfully' });
		showAddPost = false;

		$user.meta.postCount += 1;
		invalidateAll();
	}
</script>

<div class="relative w-full h-full flex flex-col xsm:flex-row-reverse">
	<main class="relative w-full h-[calc(100%-60px)] flex flex-col xsm:pb-[0] xsm:pl-[56px]">
		<slot />
	</main>
	<Navbar bind:showAddPost />
</div>
{#if showAddPost}
	<aside class="fixed w-full h-full top-0 left-0 flex flex-col justify-start items-start z-[980] bg-white" transition:fly={{ x: -50 }}>
		<nav class="relative w-full h-20 p-5 flex justify-start items-center">
			<button on:click={() => (showAddPost = false)} class="flex gap-5 py-2">
				<IconChevronLeft />
				<span>Close</span>
			</button>
		</nav>
		<form on:submit|preventDefault={submit} class="relative w-full px-5 flex flex-col justify-start items-center gap-5">
			<h1 class="text-xl">Create a new post</h1>
			<textarea
				name="text"
				placeholder="Enter a caption for your post..."
				rows={10}
				class="relative w-full rounded p-5 bg-gray-200 text-black resize-none"
			></textarea>
			<button type="submit" class="bg-blue-700 text-white px-5 py-2 rounded">Create post</button>
		</form>
	</aside>
{/if}
