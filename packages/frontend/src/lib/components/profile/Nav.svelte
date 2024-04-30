<script lang="ts">
    import { user } from '$lib/stores/user';
    import { addToast } from '$lib/stores/toast';
    import IconSettingsFilled from '@tabler/icons-svelte/IconSettingsFilled.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import { fly } from 'svelte/transition';
    import { goto, invalidateAll } from '$app/navigation';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

    let showSettings: boolean = false;

    $: editedUser = { ...$user };

    async function editUser(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        const formData = new FormData(event.currentTarget);

        const data = {
            nickname: formData.get('nickname')?.toString(),
            isPrivate: formData.get('isPrivate')?.toString() !== undefined,
            firstName: formData.get('firstName')?.toString(),
            lastName: formData.get('lastName')?.toString(),
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString()
        };

        if (
            (!data.nickname || data.nickname === '') ||
            (!data.firstName || data.firstName === '') ||
            (!data.lastName || data.lastName === '') ||
            (!data.email || data.email === '') ||
            (!data.password || data.password === '')
        ) {
            return addToast({ type: 'error', message: 'Fill every input.' });
        }

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/user/${editedUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        const result = await response.json();

        if (result.status) {
            addToast({ type: 'success', message: 'Account updated successfully.' });
            $user.nickname = data.nickname;
            $user.isPrivate = data.isPrivate;
            $user.firstName = data.firstName;
            $user.lastName = data.lastName;
            $user.email = data.email;
            invalidateAll();
        }
    }

    async function deleteUser() {
        await fetch(`${PUBLIC_BACKEND_URL}/api/user/${$user.id}`, { method: "DELETE" });
        addToast({ type: "success", message: "Compte supprimé avec succès." })
        goto("/logout");
    }
</script>

<!--
@component

Renders the top navbar for the profile page.

Displays :
* The nickname of the user
* A menu button to open a small options list

-->

<nav class="absolute w-full h-[60px] px-5 flex justify-end items-center z-50">
    <button
        on:click={() => {
            showSettings = true;
            editedUser = { ...$user };
        }}
    >
        <IconSettingsFilled class="text-white" />
    </button>
</nav>
{#if showSettings}
    <article
        class="fixed w-full h-full top-0 left-0 flex flex-col justify-between items-center p-5 mb-5 gap-5 z-[100] bg-white overflow-auto"
        transition:fly={{ y: 50 }}
    >
        <menu class="relative w-full h-[60px] flex justify-end items-center z-50">
            <button on:click={() => (showSettings = false)}>
                <IconX class="text-black" />
            </button>
        </menu>
        <div class="relative w-full flex flex-col gap-10">
            <div class="flex flex-col gap-5">
                <h2 class="text-xl">Your Informations</h2>
                <form on:submit|preventDefault={editUser} class="flex flex-col items-center gap-5">
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="firstName">Nickname</label>
                        <input
                            value={editedUser.nickname}
                            name="nickname"
                            class="relative w-full h-10 text-sm px-5 rounded bg-gray-200 text-gray-700"
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="firstName">First Name</label>
                        <input
                            value={editedUser.firstName}
                            name="firstName"
                            class="relative w-full h-10 text-sm px-5 rounded bg-gray-200 text-gray-700"
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="lastName">Last Name</label>
                        <input
                            value={editedUser.lastName}
                            name="lastName"
                            class="relative w-full h-10 text-sm px-5 rounded bg-gray-200 text-gray-700"
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="email">Email</label>
                        <input value={editedUser.email} name="email" class="relative w-full h-10 text-sm px-5 rounded bg-gray-200 text-gray-700" />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="password">Password</label>
                        <input value="" name="password" type="password" class="relative w-full h-10 text-sm px-5 rounded bg-gray-200 text-gray-700" />
                    </div>
                    <div class="relative flex gap-5 mx-auto">
                        <input type="checkbox" checked={editedUser.isPrivate} name="isPrivate" class="relative" />
                        <label for="isPrivate">Private account</label>
                    </div>
                    <button type="submit" class="relative bg-blue-700 text-white px-5 py-3 rounded">Update</button>
                </form>
            </div>
            <div class="flex flex-col gap-5">
                <h2 class="text-xl">Miscellaneous</h2>
                <div class="flex items-center gap-5">
                    <p class="text-gray-500">Log out of your account</p>
                    <button
                        class="relative bg-red-500 text-white px-5 py-3 rounded"
                        on:click={() => goto('/logout')}
                    >
                        Disconnect
                    </button>
                </div>
                <div class="flex items-center gap-5">
                    <p class="text-gray-500">Delete account</p>
                    <button
                        class="relative bg-red-500 text-white px-5 py-3 rounded"
                        on:click={deleteUser}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </article>
{/if}
