import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { EditorNode, EditorSchedule, NodeType, PartType } from '@/model'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({ schdule: [] as EditorSchedule, courseName: [] as string[] }),
  actions: {
    addPart(name: string, type: PartType, hour: number, minute: number) {
      const i = () => [] as EditorNode[]
      this.schdule.push({
        name,
        type,
        hour,
        minute,
        node: [i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i()],
      })
    },
  },
})
