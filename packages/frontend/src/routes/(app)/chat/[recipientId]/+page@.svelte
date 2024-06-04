<script lang="ts">
    import { initSocket, socket } from '$lib/socket';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconSend from '@tabler/icons-svelte/IconSend.svelte';
    import { user } from '$lib/stores/user';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { Message } from '$lib/models/Message';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from './$types.js';
    import { addToast } from '$lib/stores/toast.js';
    import MessageItem from './MessageItem.svelte';

    export let data;

    let messages = writable<Message[]>(data.conversation);

    onMount(async () => {
        messagesNode.scrollTop = messagesNode.scrollHeight;

        await initSocket($user.id);

        socket?.on("receive_private_message", (message: Message) => {
            $messages = [...$messages, message];
        })
    });

    async function broadcastMessage(message: { senderId: number; recipientId: number; content: string; sentAt: Date }) {
        socket?.emit('send_private_message', message);
        messagesNode.scrollTop = messagesNode.scrollHeight;
    }

    const sendEnhance: SubmitFunction = async ({ formElement }) => {
        return async ({ result, update }) => {
            if (result.type === 'failure' && result.data?.message) {
                return addToast({ type: 'error', message: result.data.message });
            } else if (result.type === 'success' && result.data?.message) {
                const message = result.data.message;
                $messages = [...$messages, message];
                await update();
                broadcastMessage(message);
                messagesNode.scrollTop = messagesNode.scrollHeight;
            }
        };
    };

    function sortedMessages(): Message[] {
        return $messages.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
    }

    let messagesNode: HTMLElement;
</script>

<svelte:head>
    <title>Chat with {data.recipient.firstName} {data.recipient.lastName} - Amstramgram</title>
</svelte:head>

<header class="relative w-full h-20 px-5 flex justify-start items-center gap-5">
    <button on:click={() => history.back()}>
        <IconChevronLeft />
    </button>
    <h1>{data.recipient.nickname} ({data.recipient.firstName} {data.recipient.lastName})</h1>
</header>
<main bind:this={messagesNode} class="relative w-full h-[calc(100%-180px)] flex flex-col justify-start items-start px-5 pb-5 overflow-auto">
    {#each sortedMessages() as message, i}
        {@const lastMessage = i - 1 >= 0 ? $messages.at(i - 1) ?? null : null}
        <MessageItem {message} {lastMessage} />
    {:else}
        <p class="text-gray-500 text-sm self-center">Envoyez un message pour débuter !</p>
    {/each}
</main>
<div class="relative w-full h-[100px] bg-gray-200 p-5">
    <form method="POST" action="?/send" class="relative w-full h-full flex" use:enhance={sendEnhance}>
        <input name="content" class="relative w-full h-full rounded-l px-5 z-10" placeholder="Enter a message..." autocomplete="off" />
        <button type="submit" class="relative h-full aspect-square flex justify-center items-center bg-white rounded-r text-gray-500 send-icon">
            <IconSend />
        </button>
    </form>
</div>

<style lang="postcss">
    .send-icon::before {
        content: '';
        position: absolute;
        top: 25%;
        left: 0;
        width: 1px;
        height: 50%;
        background-color: rgb(107 114 128);
    }
</style>
