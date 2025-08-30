<script setup lang="ts">
import CustomDialog from '@/componets/CustomDialog.vue'
import { computed, ref } from 'vue'
import type { EditorNode, NodeType, NodeWeekdayIndex, PartType } from './model'
import CustomButton from './componets/CustomButton.vue'
import PositiveButton from './componets/PositiveButton.vue'
import { useScheduleStore } from './stores/schedule'

const schedule = useScheduleStore()

const rawDayName = ['一', '二', '三', '四', '五', '六', '日']
const formatDayName = (id: number) =>
  `${Math.floor(id / 7) == 0 ? '单' : '双'}周 周${rawDayName[id % 7]}`
const dayName = Array(14)
  .fill(14)
  .map((_, id) => ({
    index: id,
    value: formatDayName(id),
  }))
const defaultAddPartState = () => ({
  show: false,
  deny: true,
  name: '',
  type: 'part' as PartType,
  hour: 0,
  minute: 0,
})
const addPartState = ref(defaultAddPartState())
const partCursor = ref(-1)
const weekdayIndex = ref(0 as NodeWeekdayIndex)

const defaultAddNodeState = () => ({
  show: false,
  deny: true,
  name: '',
  type: 'class' as NodeType,
  dur: 0,
})
const addNodeState = ref(defaultAddNodeState())
const canAddNode = computed(
  () => partCursor.value >= 0 && partCursor.value < schedule.schdule.length,
)
const nowNodeList = computed(() =>
  canAddNode.value ? schedule.schdule[partCursor.value].node[weekdayIndex.value] : [],
)
const formatAbout = (data: EditorNode) =>
  `${{ class: '上课', gap: '下课' }[data.type]} / ${data.dur} 分钟`
</script>

<template>
  <CustomDialog v-model:is-open="addPartState.show">
    <h2 class="text-2xl">添加开始时间</h2>
    <section class="grid gap-2">
      <label class="grid gap-1">
        <div>名称</div>
        <input
          class="rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
          type="text"
          placeholder="开始时间的名字"
          v-model.trim="addPartState.name"
          @input="
            () => {
              addPartState.deny = addPartState.name.length === 0
            }
          "
        />
      </label>
      <label class="grid gap-1">
        <div>类型</div>
        <select
          class="rounded-md bg-neutral-300 p-2 dark:bg-neutral-700"
          v-model="addPartState.type"
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
            v-model="addPartState.hour"
            placeholder="小时"
          />
          <div>:</div>
          <input
            class="grow rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
            type="number"
            min="0"
            max="59"
            v-model="addPartState.minute"
            placeholder="分钟"
          />
        </div>
      </div>
    </section>
    <section class="grid grid-cols-2 gap-2 *:rounded-md *:px-2 *:py-1">
      <CustomButton
        @click="
          () => {
            addPartState = defaultAddPartState()
          }
        "
      >
        取消
      </CustomButton>
      <PositiveButton
        class="bg-green-700 transition duration-100 hover:bg-green-600"
        v-model:disabled="addPartState.deny"
        @click="
          () => {
            if (addPartState.deny) {
              return
            }
            schedule.addPart(addPartState)
            partCursor = schedule.schdule.length - 1
            addPartState = defaultAddPartState()
          }
        "
      >
        添加
      </PositiveButton>
    </section>
  </CustomDialog>

  <CustomDialog v-model:is-open="addNodeState.show">
    <h2 class="text-2xl">添加及节点</h2>
    <section class="grid gap-2">
      <label class="grid gap-1">
        <div>名称</div>
        <input
          class="rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
          type="text"
          placeholder="开始时间的名字"
          v-model.trim="addNodeState.name"
          @input="
            () => {
              addNodeState.deny = addNodeState.name.length === 0
            }
          "
        />
      </label>
      <label class="grid gap-1">
        <div>类型</div>
        <select
          class="rounded-md bg-neutral-300 p-2 dark:bg-neutral-700"
          v-model="addNodeState.type"
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
          v-model="addNodeState.dur"
          placeholder="分钟"
        />
      </div>
    </section>
    <section class="grid grid-cols-2 gap-2 *:rounded-md *:px-2 *:py-1">
      <CustomButton
        @click="
          () => {
            addNodeState = defaultAddNodeState()
          }
        "
      >
        取消
      </CustomButton>
      <PositiveButton
        class="bg-green-700 transition duration-100 hover:bg-green-600"
        :disabled="addNodeState.deny"
        @click="
          () => {
            if (addNodeState.deny) {
              return
            }
            schedule.addNode(partCursor, weekdayIndex, addNodeState)
            addNodeState = defaultAddNodeState()
          }
        "
      >
        添加
      </PositiveButton>
    </section>
  </CustomDialog>

  <nav
    class="sticky grid h-10 items-center-safe justify-center-safe bg-neutral-200 px-4 py-2 dark:bg-neutral-800"
  >
    <h1 class="font-semibold hover:text-cyan-700 dark:hover:text-cyan-300">
      <span class="text-cyan-700 dark:text-cyan-300">CW</span>EE
    </h1>
  </nav>
  <section class="flex min-h-[calc(100dvh-2.5rem)] flex-col">
    <section class="grid grow grid-cols-2 gap-4 p-4">
      <section class="flex flex-col gap-4">
        <h2 class="text-4xl">开始时间</h2>
        <section
          class="flex min-h-10 grow flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <div
            class="flex w-full gap-2 rounded-md bg-neutral-800 px-2 py-1 aria-selected:bg-neutral-300 dark:aria-selected:bg-neutral-700"
            :aria-selected="partCursor == index"
            @click="
              () => {
                partCursor = index
              }
            "
            v-for="(value, index) in schedule.schdule"
            :key="index"
          >
            <div>
              {{ value.name }}
            </div>
            <div class="text-neutral-600 dark:text-neutral-400">
              {{ value.hour.toString().padStart(2, '0') }}:{{
                value.minute.toString().padStart(2, '0')
              }}
            </div>
          </div>
        </section>
        <CustomButton @click="addPartState.show = true" class="py-1">添加</CustomButton>
      </section>
      <section class="flex flex-col gap-4">
        <div class="flex h-fit">
          <h2 class="text-4xl">Node</h2>
          <section class="grow"></section>
          <select class="block" v-model="weekdayIndex">
            <option :value="index" v-for="{ index, value } in dayName" :key="index">
              {{ value }}
            </option>
          </select>
        </div>
        <section
          class="flex min-h-10 grow flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <div
            class="flex w-full gap-2 rounded-md bg-neutral-800 px-2 py-1"
            v-for="(value, index) in nowNodeList"
            :key="index"
          >
            <div>{{ value.name }}</div>
            <div class="text-neutral-600 dark:text-neutral-400">{{ formatAbout(value) }}</div>
          </div>
        </section>
        <CustomButton @click="addNodeState.show = true" class="py-1" :disabled="!canAddNode"
          >添加</CustomButton
        >
      </section>
    </section>
  </section>
  <!-- <RouterView></RouterView> -->
</template>

<style scoped></style>
