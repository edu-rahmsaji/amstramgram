<script lang="ts">
    export let value: string | number;
    export let label: string;
</script>

<div class="relative flex flex-col items-center">
    <span class="text-white text-2xl">{value}</span>
    <span class="text-gray-400">{label}</span>
</div>
