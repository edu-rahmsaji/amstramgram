<script lang="ts">
	import type { User } from '$models/User.js';

	export let user: User;
	$: ({ nickname, firstName, lastName, meta, biography } = user);
</script>

<div
	class="relative w-full h-[450px] flex flex-col justify-end p-5 gap-5 bg-blue-500 bg-center shadow-[inset_0_-350px_200px_-200px_rgba(17,17,17,1)]"
>
	<h1 class="text-4xl text-white">{nickname}</h1>
	<h2 class="text-white">{firstName} {lastName}</h2>
	<div class="relative w-full flex justify-center gap-10">
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{meta.postCount}</span>
            <span class="text-gray-400">posts</span>
        </div>
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{meta.followingCount}</span>
            <span class="text-gray-400">following</span>
        </div>
        <div class="relative flex flex-col items-center">
            <span class="text-white text-2xl">{meta.followerCount}</span>
            <span class="text-gray-400">followers</span>
        </div>
	</div>
	<p class="text-white text-sm text-justify">{biography}</p>
</div>
