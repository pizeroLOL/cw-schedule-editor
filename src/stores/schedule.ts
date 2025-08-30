import { defineStore } from 'pinia'
import type { EditorCreatePart, EditorNode, EditorSchedule } from '@/model'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({ schdule: [] as EditorSchedule, courseName: [] as string[] }),
  actions: {
    addPart(part: EditorCreatePart) {
      const i = () => [] as EditorNode[]
      this.schdule.push({
        ...part,
        node: [i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i(), i()],
      })
    },
    addNode(partIndex: number, weekdayIndex: number, node: EditorNode) {
      this.schdule[partIndex].node[weekdayIndex].push(node)
    },
  },
})
