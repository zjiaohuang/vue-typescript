pdf查看组件

### 引入

```javascript
import PdfViewer from '@/components/PdfViewer/index.vue'

Vue.component(PdfViewer)
```

### 代码演示
<!-- DEMO -->
```html
<PdfViewer pdfUrl="123.pdf" @pageNumChange="handlePageNumChange" />
```

### API

#### map Props
| 属性    | 说明                      | 类型   |默认值| 备注                                        |
| ------- | ------------------------- | ------ | ------ | ------------------------------------------- |
| pdfUrl  | pdf地址或base64的pdf        | String |        |

#### map Events

##### @pageNumChange(currentPageNum, totalPageNum)
pdf在观看过程中翻页事件
```javascript
/**
<PdfViewer pdfUrl="123" @pageNumChange="handlePageNumChange" />
**/

handlePageNumChange(currentPage: number, totalNum: number) {
  if (currentPage === totalNum) {
    this.$message('已到最后一页了')
  }
}
```

