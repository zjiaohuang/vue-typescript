<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 1024 1024" class="svg-icon">
    <g :fill="iconColor">
      <component :is="componentName"></component>
    </g>
  </svg>
</template>

<script>
import { requireModels } from '@/utils/requireModules'

// import componentIcon from './componentIcon'
const components = requireModels(require.context('./svg', false, /\.vue$/))
export default {
  components,
  props: {
    icon: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    componentName () {
      return this.icon + 'Icon'
    }
  }
}
</script>
