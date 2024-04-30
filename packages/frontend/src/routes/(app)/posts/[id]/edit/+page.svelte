<script lang="ts">
	import type { PageData } from './$types';
	import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
	import IconBan from '@tabler/icons-svelte/IconBan.svelte';
	import IconEdit from '@tabler/icons-svelte/IconEdit.svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { addToast } from '$lib/stores/toast.js';

	export let data: PageData;

	async function edit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		const text = new FormData(event.currentTarget).get("text")!.toString();

		await fetch(`${PUBLIC_BACKEND_URL}/api/posts/${data.post.id}`, {
			method: "PUT",
			body: JSON.stringify({ text }),
			headers: {
                "content-type": "application/json"
            }
		});

		data.post.text = text;
		addToast({ type: "success", message: "Post updated successfully" });
		history.back();
	}

	let text: string = data.post?.text ?? "";
</script>

<svelte:head>
	<title>Editing a post - Amstramgram</title>
</svelte:head>

<nav class="relative w-full h-20 p-5 flex justify-start items-center">
    <button on:click={() => history.back()} class="flex gap-5 py-2">
        <IconChevronLeft />
        <span>Back</span>
    </button>
</nav>
{#if !data.post}
	<p>Something went wrong. Please try again later.</p>
{:else}
	<form on:submit|preventDefault={edit} class="relative w-full flex flex-col items-center px-5 gap-5">
		<h1 class="text-xl">Editing a post</h1>
		<input name="_method" type="hidden" value="PUT" />
		<textarea name="text" rows={10} class="relative w-full rounded bg-gray-200 p-5 resize-none" bind:value={text}></textarea>
		<div class="relative w-full h-[50px] flex justify-between items-center gap-5">
            <button
			on:click={() => history.back()}
                type="button"
                class="relative h-full flex-grow rounded bg-gray-700 text-white flex justify-center items-center gap-3"
            >
                <span>Cancel</span>
                <IconBan class="text-white" />
            </button>
            <button type="submit" class="relative h-full flex-grow rounded bg-blue-700 text-white flex justify-center items-center gap-3">
                <span>Update</span>
                <IconEdit class="text-white" />
            </button>
        </div>
	</form>
{/if}
