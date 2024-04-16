<script lang="ts">
    import { getContext } from 'svelte';
	import Link from './Link.svelte';
	import {
		IconHome as HomeIcon,
		IconCirclePlus as AddIcon,
		IconUserCircle as UserProfileIcon,
		IconMenu2,
		IconX,
        IconLogin2
	} from '@tabler/icons-svelte';
    import type { User } from '$lib/models/User';
    import type { Writable } from 'svelte/store';

	let showFullMenu: boolean = false;

	$: MenuIcon = showFullMenu ? IconX : IconMenu2;

	const user = getContext<Writable<User | undefined>>("user");
</script>

<!--
@component

Renders a responsive navbar.

-->

<nav
	class="xsm:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-[0px_-4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_-4px_3px_rgba(10,10,10,0.25)]"
>
	<ul class="relative w-full h-full py-[10px] flex justify-evenly items-center">
		<Link href="/" label="Home" icon={HomeIcon} />
		{#if $user}
			<Link href="/posts/add" label="Add a post" icon={AddIcon} />
			<Link href="/profile" label="Profile" icon={UserProfileIcon} />
		{:else}
			<Link href="/login" label="Login" icon={IconLogin2} />
		{/if}
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
