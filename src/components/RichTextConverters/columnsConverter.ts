import { ColumnsNode } from '@/lexical/nodes/ColumnsNode'
import { $getNodeByKey, LexicalNode } from 'lexical'

export const columnsConverter = {
  type: 'columns',
  converter: ({ node }: { node: ColumnsNode }) => {
    const columnKeys = node.__columnKeys
    const columnsHTML = columnKeys
      .map((key: string) => {
        const columnNode = $getNodeByKey(key)
        if (columnNode) {
          return `<div class="column">${columnNode.getTextContent()}</div>`
        }
        return ''
      })
      .join('')
    return `<div class="columns-container">${columnsHTML}</div>`
  },
}
