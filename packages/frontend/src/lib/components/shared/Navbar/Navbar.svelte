<script lang="ts">
	import HomeIcon from '@tabler/icons-svelte/IconHome.svelte';
	import AddIcon from '@tabler/icons-svelte/IconCirclePlus.svelte';
	import UserProfileIcon from '@tabler/icons-svelte/IconUserCircle.svelte';
	import IconMessage from '@tabler/icons-svelte/IconMessage.svelte';
	import IconMenu2 from '@tabler/icons-svelte/IconMenu2.svelte';
	import IconX from '@tabler/icons-svelte/IconX.svelte';
	import Link from './Link.svelte';

	export let showAddPost: boolean;
	let showFullMenu: boolean = false;

	$: MenuIcon = showFullMenu ? IconX : IconMenu2;
</script>

<!--
@component

Renders a responsive navbar.

-->

<nav
	class="xsm:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-[0px_-4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_-4px_3px_rgba(10,10,10,0.25)]"
>
	<ul class="relative w-full h-full py-[10px] flex justify-evenly items-center">
		<Link href="/feed" label="Home" icon={HomeIcon} />
		<li class="relative h-full aspect-square sm:aspect-auto">
			<button on:click={() => (showAddPost = true)} class="relative h-full flex justify-center items-center rounded-md sm:px-5">
				<svelte:component this={AddIcon} />
				<p class="hidden sm:flex ml-[10px] relative h-full justify-center items-center">
					Add a post
				</p>
			</button>
		</li>
		<Link href="/chat" label="Chat" icon={IconMessage} />
		<Link href="/profile" label="Profile" icon={UserProfileIcon} />
	</ul>
</nav>

<nav class="hidden fixed top-0 left-0 xsm:flex flex-col z-[200] justify-between items-start duration-300 overflow-x-hidden ease-in-out gap-5 {showFullMenu ? "w-[200px]" : "w-[56px]"} h-full bg-white shadow-[4px_0px_3px_rgba(50,50,50,0.1)]">
	<div class="relative w-full flex flex-col">
		<button on:click={() => (showFullMenu = !showFullMenu)} class="relative flex h-[56px] w-full justify-start items-center gap-8 px-4 hover:bg-gray-200">
			<svelte:component this={MenuIcon} class="min-w-6 min-h-6" />
			<span>Menu</span>
		</button>
		<a href="/" class="relative flex h-[56px] w-full justify-start items-center gap-8 px-4 hover:bg-gray-200" on:click={() => (showFullMenu = false)}>
			<HomeIcon class="min-w-6 min-h-6" />
			<span class="relative justify-center items-center">
				Home
			</span>
		</a>
		<a href="/posts/add" class="relative flex h-[56px] w-full justify-start items-center gap-8 px-4 hover:bg-gray-200" on:click={() => (showFullMenu = false)}>
			<AddIcon class="min-w-6 min-h-6" />
			<span class="relative justify-center items-center whitespace-nowrap overflow-hidden">
				New Post
			</span>
		</a>
	</div>
	<div class="relative w-full flex flex-col">
		<a href="/profile" class="relative flex h-[56px] w-full justify-start items-center gap-8 px-4 hover:bg-gray-200" on:click={() => (showFullMenu = false)}>
			<UserProfileIcon class="min-w-6 min-h-6" />
			<span class="relative justify-center items-center">
				Profile
			</span>
		</a>
	</div>
</nav>
