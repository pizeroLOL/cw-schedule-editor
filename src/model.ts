export type NodeType = 'class' | 'gap'

export type EditorNode = {
  type: NodeType
  dur: number
  name: string
}

export type PartType = 'break' | 'part'

export type NodeWeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type EditorPart = {
  name: string
  id?: string
  hour: number
  minute: number
  type: PartType
  node: [
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
    EditorNode[],
  ]
}

export type EditorCreatePart = Pick<EditorPart, 'name' | 'id' | 'hour' | 'minute' | 'type'>

export type EditorSchedule = EditorPart[]
