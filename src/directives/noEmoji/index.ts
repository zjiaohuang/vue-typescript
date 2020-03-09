import { DirectiveOptions } from 'vue'
let emojiRegex = require('emoji-regex')

const trigger = (el: HTMLElement, type: string) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

/**
 * 清除输入框Emoji表情
 */
export const noEmoji: DirectiveOptions = {
  update: function clearEmoji(el, binding, vnode: any, oldVnode) {
    let tagName = el.tagName.toLowerCase()
    let input: HTMLInputElement
    if (tagName === 'input' || tagName === 'textarea') {
      input = <HTMLInputElement>el
    } else {
      input = <HTMLInputElement>el.querySelector('input,textarea')
    }

    let regex = emojiRegex()
    let match = regex.exec(input.value)
    if (match) {
      input.value = input.value.replace(match, '')
      // 处理更改input值后vue组件中的data值并未更新
      trigger(input, 'input')
    }
  }
}
