<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PartType, EditorDialogPart } from '@/model.ts'
import CustomDialog from './CustomDialog.vue'
import CustomButton from './CustomButton.vue'
import PositiveButton from './PositiveButton.vue'

const show = defineModel<boolean>({ required: true })
const props = defineProps<{
  data?: EditorDialogPart
  submit: (now: EditorDialogPart, acc?: EditorDialogPart) => void
}>()
const defaultAddPartState = () => ({
  deny: true,
  name: '',
  type: 'part' as PartType,
  hour: 0,
  minute: 0,
})
const addPartState = ref(defaultAddPartState())
const defaultPrefix = '添加'
const titlePrefix = ref(defaultPrefix)
watch(
  () => props.data,
  () => {
    if (props.data === undefined) {
      return
    }
    addPartState.value = {
      ...props.data,
      deny: true,
    }
    titlePrefix.value = '修改'
  },
)
const doAdd = () => {
  if (addPartState.value.deny) {
    return
  }
  props.submit(addPartState.value, props.data)
  addPartState.value = defaultAddPartState()
  titlePrefix.value = defaultPrefix
  show.value = false
}
const onCheck = () => {
  addPartState.value.deny = addPartState.value.name.length === 0
}
</script>

<template>
  <CustomDialog v-model:isOpen="show" ref="refer" @keydown.enter="doAdd">
    <h2 class="text-2xl">{{ titlePrefix }}开始时间</h2>
    <section class="grid gap-2">
      <label class="grid gap-1">
        <div>名称</div>
        <input
          class="rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
          type="text"
          placeholder="开始时间的名字"
          v-model.trim="addPartState.name"
          @input="onCheck"
        />
      </label>
      <label class="grid gap-1">
        <div>类型</div>
        <select
          class="rounded-md bg-neutral-300 p-2 dark:bg-neutral-700"
          v-model="addPartState.type"
          @input="onCheck"
        >
          <option value="part">上课</option>
          <option value="break">休息</option>
        </select>
      </label>
      <div class="grid gap-1">
        <div>时间</div>
        <div class="flex gap-2">
          <input
            class="grow rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
            type="number"
            min="0"
            max="23"
            placeholder="小时"
            v-model="addPartState.hour"
            @input="onCheck"
          />
          <div>:</div>
          <input
            class="grow rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
            type="number"
            min="0"
            max="59"
            placeholder="分钟"
            v-model="addPartState.minute"
            @input="onCheck"
          />
        </div>
      </div>
    </section>
    <section class="grid grid-cols-2 gap-2 *:rounded-md *:px-2 *:py-1">
      <CustomButton
        @click="
          () => {
            addPartState = defaultAddPartState()
            show = false
          }
        "
      >
        取消
      </CustomButton>
      <PositiveButton
        class="bg-green-700 transition duration-100 hover:bg-green-600"
        v-model:disabled="addPartState.deny"
        @click="doAdd"
      >
        {{ titlePrefix }}
      </PositiveButton>
    </section>
  </CustomDialog>
</template>
