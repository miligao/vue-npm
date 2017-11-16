# vue-list-transfer
> 数据列表选择穿梭框

## Installation
```shell
yarn add vue-list-transfer

import listTransfer from 'vue-list-transfer'
```

### Attribute
| 参数      | 说明          | 类型      | 默认值  |
|---------- |-------------- |---------- |-------- |
| dataSource | 必选参数, 数据源 | Array[{ key, label, disabled }] | — |
| defaultChecked | 可选参数, 已选中数据 | Array | [] |
| showSearch | 可选参数, 是否支持搜索 | Boolean | 请输入搜索内容 |
| placeholder | 可选参数, 搜索文字提示 | String | false |
| width | 可选参数 | String | 600px |
| height | 可选参数 | String | 400px |

### events
| 事件      | 说明          | 回调参数 |
|---------- |-------------- |---------- |
| loadMore | 数据分页加载时触发 |
| change | 选中数据改变时触发 | Array[{ key, label }] |
| searchChange | 左侧数据搜索时触发 | 搜索参数 |
