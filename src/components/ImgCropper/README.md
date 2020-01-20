图片裁剪组件

### 引入

```javascript
import ImgCropper from '@/components/ImgCropper/index.vue'

Vue.component(ImgCropper)
```

### 代码演示
<!-- DEMO -->
```html
<img-cropper ref="cropper" src="./img/typescript.jpg" :option="{dragMode:'move', aspectRatio:3/4}" />
```

### API

#### ImgCropper Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|-----|-----|------|-------|------|
|src|图片地址|string|-|url或base64|
|option|图片裁剪属性|CropperOption|-|-|

##### CropperOption
- viewMode 视图控制
    - 0 无限制
    - 1 限制裁剪框不能超出图片的范围
    - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
    - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
- dragMode 拖拽图片模式
    - crop 形成新的裁剪框
    - move 图片可移动
    - none 什么也没有
- initialAspectRatio 裁剪框宽高比的初始值 默认与图片宽高比相同 只有在aspectRatio没有设置的情况下可用
- aspectRatio 设置裁剪框为固定的宽高比
- data 之前存储的裁剪后的数据 在初始化时会自动设置 只有在autoCrop设置为true时可用
- preview 预览 设置一个区域容器预览裁剪后的结果
    - Element, Array (elements), NodeList or String (selector)
- responsive 在窗口尺寸调整后 进行响应式的重渲染 默认true
- restore 在窗口尺寸调整后 恢复被裁剪的区域 默认true
- checkCrossOrigin 检查图片是否跨域 默认true 如果是 会在被复制的图片元素上加上属性crossOrigin 并且在src上加上一个时间戳 避免重加载图片时因为浏览器缓存而加载错误
- checkOrientation 检查图片的方向信息（仅JPEG图片有）默认true 在旋转图片时会对图片方向值做一些处理 以解决IOS设备上的一些问题
- modal 是否显示图片和裁剪框之间的黑色蒙版 默认true
- guides 是否显示裁剪框的虚线 默认true
- center 是否显示裁剪框中间的 ‘+’ 指示器 默认true
- highlight 是否显示裁剪框上面的白色蒙版 （很淡）默认true
- background 是否在容器内显示网格状的背景 默认true
- autoCrop 允许初始化时自动的裁剪图片 配合 data 使用 默认true
- autoCropArea 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
- movable 是否可以移动图片 默认true
- rotatable 是否可以旋转图片 默认true
- scalable 是否可以缩放图片（可以改变长宽） 默认true
- zoomable 是否可以缩放图片（改变焦距） 默认true
- zoomOnTouch 是否可以通过拖拽触摸缩放图片 默认true
- zoomOnWheel 是否可以通过鼠标滚轮缩放图片 默认true
- wheelZoomRatio 设置鼠标滚轮缩放的灵敏度 默认 0.1
- cropBoxMovable 是否可以拖拽裁剪框 默认true
- cropBoxResizable 是否可以改变裁剪框的尺寸 默认true
- toggleDragModeOnDblclick 是否可以通过双击切换拖拽图片模式（move和crop）默认true 当拖拽图片模式为none时不可切换 该设置必须浏览器支持双击事件
- minContainerWidth（200）、minContainerHeight（100）、minCanvasWidth（0）、minCanvasHeight（0）、minCropBoxWidth（0）、minCropBoxHeight（0） 容器、图片、裁剪框的 最小宽高 括号内为默认值 注意 裁剪框的最小高宽是相对与页面而言的 并非相对图片

##### defaultCropperOption
```typescript
let defaultCropperOption = function (): CropperOption {
  return {
    viewMode: 1,
    dragMode: 'none',
    initialAspectRatio: 1,
    aspectRatio: 1,
    background: true,
    autoCropArea: 0.6,
    zoomOnWheel: false
  }
}
```

#### ImgCropper Methods
