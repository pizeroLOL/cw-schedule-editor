<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void
}>()
</script>

<template>
  <button
    @click="props.onClick"
    class="aria-disabled:text-neugtral-700 rounded-md border border-neutral-300 bg-neutral-300 transition duration-100 hover:bg-neutral-400 active:bg-neutral-300 aria-disabled:bg-neutral-200 aria-disabled:hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-700 dark:disabled:text-neutral-100 dark:aria-disabled:bg-neutral-800 dark:aria-disabled:text-neutral-300 aria-disabled:dark:hover:bg-neutral-800"
  >
    <slot></slot>
  </button>
</template>
