<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    }
  },
  render (h, context) {
    console.log(this.to)
    let to = this.to
    let isExternal = to.external

    // 判断是不是外部地址，如果外部地址打开新页面，否则使用router-link
    if (isExternal) {
      return h('a', {
        attrs: {
          href: to.path,
          id: to.id,
          target: '_blank',
          rel: 'noopener'
        }
      }, this.$slots.default)
    } else {
      return h('router-link', {
        attrs: {
          id: to.id
        },
        props: {
          to: to.path
        }
      }, this.$slots.default)
    }
  }
}
</script>
