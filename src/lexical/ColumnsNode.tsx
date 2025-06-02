import { LexicalNode, NodeKey, SerializedLexicalNode, DecoratorNode } from 'lexical'
import { JSX } from 'react'

export class ColumnsNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'columns'
  }

  static clone(node: ColumnsNode): ColumnsNode {
    return new ColumnsNode(node.__key)
  }

  static importJSON(serializedNode: SerializedLexicalNode): ColumnsNode {
    return new ColumnsNode()
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'columns',
      version: 1,
    }
  }

  createDOM(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'columns-container'
    return container
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <div className="columns">
        <div className="column">Column 1</div>
        <div className="column">Column 2</div>
      </div>
    )
  }
}
