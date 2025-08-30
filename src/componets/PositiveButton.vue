<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void
}>()
</script>

<template>
  <button
    @click="props.onClick"
    class="disable:text-neutral-900 text-netral-100 disabled:text-neugtral-700 rounded-md border border-neutral-300 bg-green-700 text-neutral-100 transition duration-100 hover:bg-green-600 active:bg-green-700 disabled:bg-neutral-200 disabled:hover:bg-neutral-200 dark:border-neutral-700 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-300 disabled:dark:hover:bg-neutral-800"
  >
    <slot></slot>
  </button>
</template>
