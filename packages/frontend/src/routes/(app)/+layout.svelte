<script lang="ts">
	import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
	import { getContext, hasContext, setContext } from 'svelte';
	import type { LayoutServerData } from './$types';
    import { type Writable, writable } from 'svelte/store';
    import type { User } from '$lib/models/User';

	export let data: LayoutServerData;

	if (!hasContext("user")) {
		setContext<Writable<User | undefined>>("user", writable(data.user));
	}

	const user = getContext<Writable<User | undefined>>("user");
	$user = data.user;

	$: console.log($user)
</script>

<div class="relative w-full h-full flex flex-col xsm:flex-row-reverse">
	<main class="relative w-full h-full flex flex-col pb-[60px] xsm:pb-[0] xsm:pl-[56px]">
		<slot />
	</main>
	<Navbar />
</div>
