<script lang="ts">
	import type { User } from '$lib/models/User';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

	const user = getContext<Writable<User>>("user");
</script>

<div
	class="relative w-full h-[450px] flex flex-col justify-end p-5 gap-5 bg-blue-500 bg-center shadow-[inset_0_-350px_200px_-200px_rgba(17,17,17,1)]"
>
	<h1 class="text-4xl text-white">{$user.nickname}</h1>
	<h2 class="text-white">{$user.firstName} {$user.lastName}</h2>
	<div class="relative w-full flex justify-center gap-10">
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{$user.meta.postCount}</span>
            <span class="text-gray-400">posts</span>
        </div>
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{$user.meta.followingCount}</span>
            <span class="text-gray-400">following</span>
        </div>
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{$user.meta.followerCount}</span>
            <span class="text-gray-400">followers</span>
        </div>
	</div>
	<p class="text-white text-sm text-justify">{$user.biography}</p>
</div>
