<script>
	import Navbar from '$lib/shared/Navbar/Navbar.svelte';
</script>

<div class="relative w-full h-full flex flex-col">
	<main class="relative w-full flex flex-col pb-[60px]">
		<slot />
	</main>
	<Navbar />
</div>
