import type { EditorNode } from './model.ts'

const floorPad = (num: number) => Math.floor(num).toString().padStart(2, '0')
export const minuteToTime = (minute: number) =>
  `${floorPad((minute / 60) % 60)}:${floorPad(minute % 60)}`
export const formatAbout = (
  current: EditorNode,
  index: number,
  list: EditorNode[],
  start: number,
) => {
  const accTime =
    start +
    list.slice(0, index).reduce((acc, now) => {
      return acc + now.dur
    }, 0)
  return `${{ class: '上课', gap: '课间' }[current.type]} / ${current.dur} 分钟 / ${minuteToTime(accTime)} - ${minuteToTime(accTime + current.dur)}`
}

const rawDayName = ['一', '二', '三', '四', '五', '六', '日']
const formatDayName = (id: number) =>
  `${Math.floor(id / 7) == 0 ? '单' : '双'}周 周${rawDayName[id % 7]}`
export const dayName = Array(14)
  .fill(14)
  .map((_, id) => ({
    index: id,
    value: formatDayName(id),
  }))
