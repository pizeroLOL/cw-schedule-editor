<script setup lang="ts">
import { defineModel, ref, watch } from 'vue'
import type { NodeType, EditorNode } from '../model.ts'
import CustomDialog from './CustomDialog.vue'
import CustomButton from './CustomButton.vue'
import PositiveButton from './PositiveButton.vue'

const show = defineModel<boolean>({ required: true })
const props = defineProps<{
  data?: EditorNode
  submit: (now: EditorNode, acc?: EditorNode) => void
}>()

const defaultPrefix = '添加'
const titlePrefix = ref(defaultPrefix)
const defaultNodeState = () => ({
  deny: true,
  name: '',
  type: 'class' as NodeType,
  dur: 0,
})
const addNodeState = ref(defaultNodeState())
watch(
  () => show.value,
  () => {
    if (props.data === undefined) {
      return
    }
    addNodeState.value = {
      ...props.data,
      deny: true,
    }
    titlePrefix.value = props.data === undefined ? '添加' : '修改'
  },
)
const onSubmit = () => {
  if (addNodeState.value.deny) {
    return
  }
  props.submit(addNodeState.value, props.data)
  addNodeState.value = defaultNodeState()
  titlePrefix.value = defaultPrefix
  show.value = false
}
const onCheck = () => {
  addNodeState.value.deny = addNodeState.value.name.length === 0
}
</script>

<template>
  <CustomDialog v-model:is-open="show" @keydown.enter="onSubmit">
    <h2 class="text-2xl">{{ titlePrefix }}节点</h2>
    <section class="grid gap-2">
      <label class="grid gap-1">
        <div>名称</div>
        <input
          class="rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
          type="text"
          placeholder="开始时间的名字"
          v-model.trim="addNodeState.name"
          @input="onCheck"
        />
      </label>
      <label class="grid gap-1">
        <div>类型</div>
        <select
          class="rounded-md bg-neutral-300 p-2 dark:bg-neutral-700"
          v-model="addNodeState.type"
          @input="onCheck"
        >
          <option value="class">上课</option>
          <option value="gap">课间</option>
        </select>
      </label>
      <div class="grid gap-1">
        <div>时间</div>
        <input
          class="grow rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
          type="number"
          min="0"
          placeholder="分钟"
          v-model="addNodeState.dur"
          @input="onCheck"
        />
      </div>
    </section>
    <section class="grid grid-cols-2 gap-2 *:rounded-md *:px-2 *:py-1">
      <CustomButton
        @click="
          () => {
            addNodeState = defaultNodeState()
            show = false
          }
        "
      >
        取消
      </CustomButton>
      <PositiveButton
        class="bg-green-700 transition duration-100 hover:bg-green-600"
        :disabled="addNodeState.deny"
        @click="onSubmit"
      >
        {{ titlePrefix }}
      </PositiveButton>
    </section>
  </CustomDialog>
</template>
