<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

const isOpen = defineModel<boolean>('isOpen')
const customDialog = useTemplateRef('dialog')
watch(
  () => isOpen.value,
  (now, acc) => {
    if (now === acc || customDialog.value === null) {
      return
    }
    if (now) {
      customDialog.value.showModal()
    } else {
      customDialog.value.close()
    }
  },
)
</script>

<template>
  <dialog
    class="layer-2 dark m-auto h-fit w-fit min-w-40 gap-4 rounded-xl bg-neutral-200 p-4 backdrop:bg-black/22 backdrop:backdrop-blur-md open:grid dark:bg-neutral-800"
    ref="dialog"
    @close="() => (isOpen = false)"
  >
    <slot></slot>
  </dialog>
</template>
