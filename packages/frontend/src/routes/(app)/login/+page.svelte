<script lang="ts">
    import { page } from "$app/stores";

    let errorMessage = $page.url.searchParams.get("message");
</script>

<svelte:head>
    <title>Login - Amstramgram</title>
</svelte:head>

<div class="relative w-full h-full flex flex-col justify-center items-center p-5 gap-10">
    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}
    <h1 class="text-xl font-semibold">Connexion</h1>
    <p class="text-gray-500 text-sm text-justify">Le système de connexion avec Sanctum n'étant pas mis en place, vous vous connecterez avec l'utilisateur ayant l'id 1.</p>
    <form method="post" class="relative">
        <button type="submit" class="relative px-5 py-3 bg-blue-700 text-white rounded-lg">Connexion</button>
    </form>
</div>
