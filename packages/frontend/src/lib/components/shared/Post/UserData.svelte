<script lang="ts">
	import type { SimplifiedUser } from '$models/User.js';

	export let user: SimplifiedUser | null;
	export let postedAt: Date;

	function formattedDate(createdAt: Date): string {
		const difference: number = Math.floor((Date.now() - createdAt.getTime()) / 1000);

		switch (true) {
			case difference < 60: // Less than 1 minute
				return `${difference} seconds ago`;
			case difference < 3600: // Less than 1 hour
				return `${Math.floor(difference / 60)} minute(s) ago`;
			case difference < 86400: // Less than 1 day
				return `${Math.floor(difference / 3600)} hour(s) ago`;
			case difference < 604800: // Less than 1 week
				return `${Math.floor(difference / 86400)} day(s) ago`;
			case difference < 2419200: // Less than 4 weeks
				return `${Math.floor(difference / 604800)} week(s) ago`;
			case difference < 31449600: // Less than 1 year
				return `${Math.floor(difference / 2419200)} month(s) ago`;
			default:
				return `${Math.floor(difference / 31449600)} year(s) ago`;
		}
	}
</script>

<div class="relative w-full h-20 flex">
	{#if !user}
		<p>Unable to show the user's data. Please retry again later.</p>
	{:else}
		<a href="/profile/{user.id}" class="relative w-full h-full p-5 flex justify-start items-center gap-5 cursor-pointer">
			<div class="relative h-full aspect-square rounded-full bg-black">
				<!-- Avatar here -->
			</div>
			<div class="relative flex flex-col items-start justify-between">
				<p class="font-medium">{user.nickname}</p>
				<p class="font-medium text-gray-500 text-xs">{formattedDate(postedAt)}</p>
			</div>
		</a>
	{/if}
</div>
