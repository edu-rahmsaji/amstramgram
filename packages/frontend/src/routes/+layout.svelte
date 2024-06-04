<script lang="ts">
	import '../app.css';
    import Container from '$lib/components/shared/Toast/Container.svelte';
    import { user } from '$lib/stores/user';

    export let data;

    $user = data.user!;
</script>

<Container />
<slot />
