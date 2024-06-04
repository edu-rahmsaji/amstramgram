<script lang="ts">
	import SuccessIcon from '@tabler/icons-svelte/IconCheck.svelte';
	import ErrorIcon from '@tabler/icons-svelte/IconExclamationCircle.svelte';
	import InfoIcon from '@tabler/icons-svelte/IconInfoCircle.svelte';
	import CloseIcon from '@tabler/icons-svelte/IconX.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type: 'success' | 'error' | 'info';

	$: Icon = type === 'success' ? SuccessIcon : type === 'error' ? ErrorIcon : InfoIcon;
	$: bgColor =
		type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
</script>

<article class="relative w-full flex items-center gap-4 rounded p-4 text-neutral-50 {bgColor}" role="alert" transition:fade>
    <svelte:component this={Icon} class="size-6" />
    <p class="text-sm flex-grow">
        <slot />
    </p>
    <button class="border-none bg-transparent text-neutral-50" on:click={() => dispatch('dismiss')}>
        <CloseIcon class="size-6" />
    </button>
</article>
