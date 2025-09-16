<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EditorDialogPart, EditorNode, EditorSchedule, NodeWeekdayIndex } from './model'
import { formatAbout, minuteToTime, dayName } from './utils.ts'
import CustomButton from './componets/CustomButton.vue'
import PartDialog from './componets/PartDialog.vue'
import NodeDialog from './componets/NodeDialog.vue'

const cwSchedule = ref({ schedule: [] as EditorSchedule, courseName: [] as string[] })

const partCursor = ref(-1)
const weekdayIndex = ref(0 as NodeWeekdayIndex)
const canAddNode = computed(
  () => partCursor.value >= 0 && partCursor.value < cwSchedule.value.schedule.length,
)
const currentStart = computed(() =>
  canAddNode.value
    ? cwSchedule.value.schedule[partCursor.value].hour * 60 +
      cwSchedule.value.schedule[partCursor.value].minute
    : 0,
)
const nowNodeList = computed(() =>
  canAddNode.value ? cwSchedule.value.schedule[partCursor.value].node[weekdayIndex.value] : [],
)

const showPartDialog = ref(false)
const partDialogState = ref(undefined as undefined | EditorDialogPart)
const addPart = () => {
  showPartDialog.value = true
}
const submitPart = (part: EditorDialogPart, acc?: EditorDialogPart) => {
  if (acc === undefined) {
    const i = () => [] as EditorNode[]
    cwSchedule.value.schedule.push({
      ...part,
      node: [i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i()],
    })
    partCursor.value = cwSchedule.value.schedule.length - 1
    partDialogState.value = undefined
    return
  }
  if (!canAddNode.value) {
    partDialogState.value = undefined
    // TODO: alert
    return
  }
  cwSchedule.value.schedule[partCursor.value] = {
    ...cwSchedule.value.schedule[partCursor.value],
    ...part,
  }
  partDialogState.value = undefined
}
const delPart = (index: number) => {
  cwSchedule.value.schedule = cwSchedule.value.schedule.filter((_, id) => id !== index)
}
const editPart = (index: number) => {
  partDialogState.value = cwSchedule.value.schedule[index]
  partCursor.value = index
  showPartDialog.value = true
}

const nodeCursor = ref(-1)
const showNodeDialog = ref(false)
const nodeDialogState = ref(undefined as undefined | EditorNode)
const addNode = () => {
  showNodeDialog.value = true
}
const editNode = (index: number) => {
  nodeDialogState.value = nowNodeList.value[index]
  showNodeDialog.value = true
}
const delNode = (index: number) => {
  if (!canAddNode.value) {
    // TODO: alert
    return
  }
  const currentNodes = cwSchedule.value.schedule[partCursor.value].node
  currentNodes[weekdayIndex.value] = currentNodes[weekdayIndex.value].filter(
    (_, id) => id !== index,
  )
}
const submitNode = (now: EditorNode, acc?: EditorNode) => {
  if (!canAddNode.value) {
    // TODO: alert
    nodeDialogState.value = undefined
    return
  }
  const currentNodes = cwSchedule.value.schedule[partCursor.value].node[weekdayIndex.value]
  if (acc === undefined) {
    currentNodes.push(now)
    nodeDialogState.value = undefined
    nodeCursor.value = currentNodes.length - 1
    return
  }
  cwSchedule.value.schedule[partCursor.value].node[weekdayIndex.value][nodeCursor.value] = now
  nodeDialogState.value = undefined
}
</script>

<template>
  <PartDialog :submit="submitPart" :data="partDialogState" v-model="showPartDialog" />
  <NodeDialog :submit="submitNode" :data="nodeDialogState" v-model="showNodeDialog" />
  <nav
    class="sticky grid h-10 items-center-safe justify-center-safe bg-neutral-200 px-4 py-2 dark:bg-neutral-800"
  >
    <h1 class="font-semibold hover:text-cyan-700 dark:hover:text-cyan-300">
      <span class="text-cyan-700 dark:text-cyan-300">CW</span>EE
    </h1>
  </nav>
  <section class="flex min-h-[calc(100dvh-2.5rem)] flex-col">
    <section class="flex flex-col gap-4 p-4 sm:grid sm:grow sm:grid-cols-2">
      <section class="flex flex-col gap-4">
        <h2 class="text-4xl">开始时间</h2>
        <section
          class="flex min-h-10 grow flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <button
            class="flex flex-wrap gap-2 rounded-md border border-stone-200 px-2 py-1 aria-selected:bg-neutral-200 sm:grid sm:grid-cols-[1fr_auto] dark:border-stone-800 dark:aria-selected:bg-neutral-800"
            :aria-selected="partCursor == index"
            @click="
              () => {
                partCursor = index
              }
            "
            v-for="(value, index) in cwSchedule.schedule"
            :key="index"
          >
            <div class="flex w-full flex-wrap gap-2">
              <div>
                {{ value.name }}
              </div>
              <div class="text-neutral-600 dark:text-neutral-400">
                {{ minuteToTime(value.hour * 60 + value.minute) }}
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <CustomButton class="px-2" @click="() => editPart(index)">修改</CustomButton>
              <CustomButton class="px-2" @click="() => delPart(index)">删除</CustomButton>
            </div>
          </button>
        </section>
        <CustomButton @click="addPart" class="py-1">添加</CustomButton>
      </section>
      <section class="flex flex-col gap-4">
        <div class="flex h-fit">
          <h2 class="text-4xl">Node</h2>
          <section class="grow"></section>
          <select
            class="block h-fit self-center rounded-md bg-neutral-300 px-2 py-1 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
            v-model="weekdayIndex"
          >
            <option :value="index" v-for="{ index, value } in dayName" :key="index">
              {{ value }}
            </option>
          </select>
        </div>
        <section
          class="flex min-h-10 grow flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <div
            class="flex w-full flex-wrap gap-2 rounded-md bg-neutral-800 px-2 py-1 sm:grid sm:grid-cols-[1fr_auto]"
            v-for="(value, index) in nowNodeList"
            :key="index"
          >
            <div class="flex flex-wrap gap-2">
              <div>{{ value.name }}</div>
              <div class="text-neutral-600 dark:text-neutral-400">
                {{ formatAbout(value, index, nowNodeList, currentStart) }}
              </div>
            </div>
            <div class="flex flex-wrap gap-2 *:px-2">
              <CustomButton @click="() => editNode(index)"> 修改 </CustomButton>
              <CustomButton @click="() => delNode(index)"> 删除 </CustomButton>
            </div>
          </div>
        </section>
        <CustomButton @click="addNode" class="py-1" :disabled="!canAddNode">添加</CustomButton>
      </section>
    </section>
  </section>
</template>
