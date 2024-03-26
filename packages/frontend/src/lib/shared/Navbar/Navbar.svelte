<script lang="ts">
	import Link from './Link.svelte';
	import {
		IconHome as HomeIcon,
		IconCirclePlus as AddIcon,
		IconUserCircle as UserProfileIcon
	} from '@tabler/icons-svelte';
</script>

<!--
@component

Renders a responsive navbar.
-->

<nav
	class="lg:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-[0px_-4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_-4px_3px_rgba(10,10,10,0.25)]"
>
	<ul class="relative w-full h-full py-[10px] flex justify-evenly items-center">
		<Link href="/" label="Home" icon={HomeIcon} />
		<Link href="/posts/add" label="Add a post" icon={AddIcon} />
		<Link href="/profile" label="Profile" icon={UserProfileIcon} />
	</ul>
</nav>
