# vue3.0-image-viewer
> vue图片查看器

## Install
```shell
yarn add vue3.0-image-viewer
```

## Usage
```javascript
import { createApp } from "vue";
import App from './App.vue'
import ImageViewer from 'vue3.0-image-viewer'

createApp(App).use(ImageViewer).mount('#app');
```

### Attributes
 参数 | 说明 | 类型 | 可选值 | 默认值
 -----|-----|-----|-----|-----
 images | 图片url数组 | Array | - | -
 defaultIndex | 默认开始图片的索引，从 0 开始 | Number | - | 0
 v-model:visible | 是否显示ImageViewer | Boolean | - | false
 showHandleBar | 是否显示操作栏 | Boolean | - | true
 zoomMax | 最大放大倍数 | Number | - | 3

### Slot
 参数 | 说明
 -----|-----
 prevButton | 上一张 Button
 nextButton | 下一张 Button
 handleBar | 图片操作栏

### Methods
 事件名称 | 说明 | 参数
 -----|-----|-----
 zoomAuto | 图片显示为适应窗口/实际尺寸 | -
 zoomIn | 放大 | -
 zoomOut | 缩小 | -
 prev | 上一张 | -
 next | 下一张 | -
 leftRotate | 左旋90° | -
 rightRotate | 右旋90° | -
 palyPPT | 全屏播放 | -
