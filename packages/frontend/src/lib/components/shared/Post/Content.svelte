<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	export let text: string;
	export let imagePaths: string[];

	/* let touchstartX = 0;
	let touchendX = 0;

	onMount(() => {
		const imageCarousel = document.getElementById("image-carousel")!;

		const handleStart = (event: TouchEvent) => {
			touchstartX = event.changedTouches[0].screenX;
		}

		const handleMove = (event: TouchEvent) => {
			touchendX = event.changedTouches[0].screenX
			console.log("I'm moving right now !!")
		}

		const handleEnd = (event: TouchEvent) => {
			touchendX = event.changedTouches[0].screenX;
			
			if (touchendX < touchstartX) {
				console.log('swiped left!')
			};
			if (touchendX > touchstartX) console.log('swiped right!');

			touchstartX = 0;
			touchendX = 0;
		}

		imageCarousel.addEventListener('touchstart', handleStart);
		imageCarousel.addEventListener('touchmove', handleMove);
		imageCarousel.addEventListener('touchend', handleEnd);

		return () => {
			imageCarousel.removeEventListener('touchstart', handleStart);
			imageCarousel.removeEventListener('touchmove', handleMove);
			imageCarousel.removeEventListener('touchend', handleEnd);
		}
	}) */
</script>

<div class="flex flex-col gap-5">
	<p class="text-sm text-justify px-5">{text}</p>
	{#if imagePaths.length > 0}
		<div id="image-carousel" class="relative w-full aspect-square flex items-center bg-zinc-800 overflow-x-hidden">
			{#each imagePaths as imagePath}
				<img
					src="{PUBLIC_BACKEND_URL}/{imagePath}"
					alt={text}
					class="relative h-full aspect-square"
				/>
			{/each}
		</div>
	{/if}
</div>
