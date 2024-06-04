<script lang="ts">
    import type { PageServerData } from './$types';
    import { goto } from '$app/navigation';
    import { initSocket, socket } from '$lib/socket';
	import { user } from "$lib/stores/user";
    import { onMount } from 'svelte';

    export let data: PageServerData;

    let receivedMessages: Record<number, any> = {};

    function hasLastMessage(userId: number) {
        return receivedMessages[userId] !== undefined;
    }

    function lastMessage(userId: number) {
        return receivedMessages[userId].sort((a, b) => a.sentAt - b.sentAt).at(0)!;
    }

    onMount(async () => {
		await initSocket($user.id);

        socket?.on("receive_private_message", (data) => {
            receivedMessages[data.senderId] = [...receivedMessages[data.senderId] ?? [], data]
        });
    })
</script>

<svelte:head>
    <title>Chat - Amstramgram</title>
</svelte:head>

<h1>Chat Page</h1>
{#await data.allUsers}
    <p>Loading chats...</p>
{:then users}
    {#each users as user}
        <button on:click={() => goto(`/chat/${user.id}`)} class="relative p-5 w-full h-20 flex gap-5">
            <div class="relative h-full aspect-square rounded-full bg-black" />
            <div class="flex flex-col justify-between">
                <h2>{user.firstName}</h2>
                {#key receivedMessages[user.id]}
                    {#if hasLastMessage(user.id)}
                        {@const { message, sentAt } = lastMessage(user.id)}
                        <p>{message} <span class="text-gray-500 text-sm">{new Date(sentAt).toLocaleTimeString("fr-CH")}</span></p>
                    {:else}
                        <p>No last messages</p>
                    {/if}
                {/key}
            </div>
        </button>
    {/each}
{/await}
