<script lang="ts">
    import type { Message } from '$lib/models/Message';

    export let lastMessage: Message | null;
    export let message: Message;

    function formatDate(sentAt: string): string {
        const sentDate = new Date(sentAt);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (date1: Date, date2: Date): boolean => {
            return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
        };

        if (isSameDay(sentDate, today)) {
            return `Today at ${sentDate.toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" })}`;
        } else if (isSameDay(sentDate, yesterday)) {
            return `Yesterday at ${sentDate.toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" })}`;
        } else {
            return sentDate.toLocaleString("fr-CH", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
        }
    }
</script>

{#if lastMessage && lastMessage.sender.id === message.sender.id}
    <div class="relative w-full flex items-baseline mt-1 group">
        <span class="relative text-gray-500 text-sm w-[60px] h-full invisible group-hover:visible">
            {new Date(message.sentAt).toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" })}
        </span>
        <p>{message.content}</p>
    </div>
{:else}
    <div class="flex gap-5 mt-5 first:mt-0">
        <div class="relative size-10 rounded-full bg-black"></div>
        <div class="relative w-[calc(100%-60px)] flex flex-col gap-2">
            <div class="flex gap-2 items-baseline">
                <h2 class="text-lg">{message.sender.nickname}</h2>
                <time class="text-gray-500 text-sm">{formatDate(message.sentAt)}</time>
            </div>
            <p>{message.content}</p>
        </div>
    </div>
{/if}
