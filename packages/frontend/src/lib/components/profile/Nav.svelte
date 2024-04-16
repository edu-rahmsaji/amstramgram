<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import type { User } from '$lib/models/User';
    import { addToast } from '$lib/stores/toast';
    import { IconSettingsFilled, IconX } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { fly } from 'svelte/transition';

    let showSettings: boolean = false;

    const user = getContext<Writable<User>>('user');

    $: editedUser = { ...$user };
    let password = '';
</script>

<!--
@component

Renders the top navbar for the profile page.

Displays :
* The nickname of the user
* A menu button to open a small options list

-->

<nav class="absolute w-full h-[60px] px-5 flex justify-end items-center z-50">
    <button on:click={() => (showSettings = true)}>
        <IconSettingsFilled class="text-white" />
    </button>
</nav>
{#if showSettings}
    <article
        class="fixed w-full h-full top-0 left-0 flex flex-col justify-between items-center p-5 gap-5 z-[100] bg-white"
        transition:fly={{ y: 50 }}
    >
        <menu class="relative w-full h-[60px] px-5 flex justify-end items-center z-50">
            <button on:click={() => (showSettings = false)}>
                <IconX class="text-black" />
            </button>
        </menu>
        <div class="relative w-full h-full flex flex-col gap-10">
            <div class="flex flex-col gap-5">
                <h2 class="text-xl">Your Informations</h2>
                <form
                    method="post"
                    use:enhance={async () => {
                        return async ({ result }) => {
                            if (result.type === 'failure' && result.data?.['message'] && typeof result.data['message'] === 'string') {
                                addToast({ type: 'error', message: result.data['message'] });
                                return;
                            }
                        };
                    }}
                    class="flex flex-col items-center gap-5"
                >
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="firstName">First Name</label>
                        <input bind:value={editedUser.firstName} class="relative w-full h-10 text-sm px-5 rounded-lg bg-gray-200 text-gray-700" />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="lastName">Last Name</label>
                        <input bind:value={editedUser.lastName} class="relative w-full h-10 text-sm px-5 rounded-lg bg-gray-200 text-gray-700" />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="email">Email</label>
                        <input bind:value={editedUser.email} class="relative w-full h-10 text-sm px-5 rounded-lg bg-gray-200 text-gray-700" />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="password">Password</label>
                        <input bind:value={password} class="relative w-full h-10 text-sm px-5 rounded-lg bg-gray-200 text-gray-700" />
                    </div>
                    <button type="submit" class="relative bg-blue-700 text-white px-5 py-3 rounded-lg">Update</button>
                </form>
            </div>
            <div class="flex flex-col gap-5">
                <h2 class="text-xl">Miscellaneous</h2>
				<div class="flex items-center gap-5">
					<p class="text-sm text-gray-500">Log out of your account</p>
                	<button on:click={() => goto('/logout', { invalidateAll: true })} class="relative bg-red-500 text-white px-5 py-3 rounded-lg">Disconnect</button>
				</div>
            </div>
        </div>
    </article>
{/if}
