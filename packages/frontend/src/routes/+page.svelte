<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>Amstramgram</title>
</svelte:head>

<main class="relative w-full h-full flex flex-col p-5 gap-10 justify-center items-center">
    <h1 class="text-3xl font-semibold text-center">Welcome to Amstramgram</h1>
    <p class="text-gray-500 text-justify">
        Connect, create and discover ! Express yourself in communities who
        foster meaningful conversations and discuss interesting topics.
    </p>
    <button on:click={() => goto("/login")} class="relative px-5 py-3 rounded-lg bg-indigo-700 text-white">
        Login
    </button>
</main>
