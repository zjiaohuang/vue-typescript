图钉组件

### 引入

```javascript
import StickyBox from '@/components/StickyBox/index.vue'

Vue.component(StickyBox)
```

### 代码演示
<!-- DEMO -->
```html
<sticky-box>
  固定元素
</sticky-box>
```

### API

#### gender Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|-----|-----|------|-------|------|
|stickyTop|固定位置|number|0|-|
|zIndex|图层index|number|100|-|
