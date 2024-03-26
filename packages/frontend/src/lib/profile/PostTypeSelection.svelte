<script lang="ts">
	import { page } from '$app/stores';    
	import type { TypeParam } from '$models/ProfilePostType.js';

	export let type: TypeParam;

	$: pathname = $page.url.pathname;
</script>

<div class="relative w-full h-[60px] bg-gray-800 flex justify-between">
	<a
		href={pathname}
		class="relative flex-grow flex justify-center items-center {type === ''
			? 'text-white'
			: 'text-gray-400'}"
	>
		Pics
	</a>
	<a
		href="{pathname}?type=text"
		class="relative flex-grow flex justify-center items-center {type === 'text'
			? 'text-white'
			: 'text-gray-400'}"
	>
		Texts
	</a>
</div>
