<script lang="ts">
	import { IconMenu as Menu } from '@tabler/icons-svelte';
</script>

<!--
@component

Renders the top navbar for the profile page.

Displays :
* The nickname of the user
* A menu button to open a small options list

-->

<nav class="absolute w-full min-h-[60px] px-5 flex justify-end items-center z-50">
	<Menu class="text-white" />
</nav>
