# vue-popover-confirm
> 气泡卡片

## Install
```shell
yarn add vue-popover-confirm
```

## Usage
### Import
```javascript
import Vue from 'vue'
import Popover from 'vue-popover-confirm'

Vue.use(Popover)
```

### Use 1
```javascript
<Popover
  content="确认删除此条数据吗？"
  trigger="confirm"
  placement="top-end"
>
  <a href="javascript:;" slot="reference">删除</a>
</Popover>
```

### Use 2
```javascript
<Popover>
  <img src="../assets/logo.png">
  <a href="javascript:;" slot="reference">查看</a>
</Popover>
```

#### Attribute
 参数 | 说明 | 类型 | 可选值 | 默认值
 -----|-----|-----|-----|-----
 trigger | 触发方式 | String | click/hover/confirm | hover
 popoverClass | 为 popover 添加类名 | String | - | -
 title | 标题 | String | - | -
 content | 显示的内容，也可以通过 slot 传入 DOM | String | - | -
 placement | 出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top

#### Slot
 参数 | 说明
 -----|-----
 reference | 触发 Popover 显示的 HTML 元素
 ~ | Popover 内嵌 HTML 文本

#### Events
 事件名称 | 说明 | 回调参数
 -----|-----|-----
 onConfirm | 点击确定的回调，只在 confirm 模式下有效 | -
 onCancel | 点击取消的回调，只在 confirm 模式下有效 | -
