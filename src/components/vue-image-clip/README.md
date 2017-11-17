# vue-image-clip
> 图片裁切

## Install
```shell
yarn add vue-image-clip
```

## Usage
```javascript
import Vue from 'vue'
import ImageClip from 'vue-image-clip'

Vue.use(ImageClip)
```

```javascript
// 手动调用
this.$refs.mageClip.confirm()
```

### Attributes
 参数 | 说明 | 类型 | 可选值 | 默认值
 -----|-----|-----|-----|-----
 imgSrc | 图片的url | String | - | -
 clipSize | 裁切图片的大小，必须小于遮罩层的宽高 | Number | - | 360
 maskWidth | 遮罩层的宽度 | Number | - | 600
 maskHeight | 遮罩层的高度 | Number | - | 400

### Events
 事件名称 | 说明 | 回调参数
 -----|-----|-----
 onOk | 点击确定的回调 | 裁切图的 blob 对象
 onCancel | 点击取消的回调 | -

### Methods
 事件名称 | 说明 | 参数
 -----|-----|-----
 confirm | 手动确定裁切 | -
 cancel | 手动取消裁切 | -
