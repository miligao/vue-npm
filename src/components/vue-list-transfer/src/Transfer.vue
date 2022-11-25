<!--
  - Created by MiliGao on 2017/11/14
 -->

<template>
  <div class="transferContainer" :style="{ width: width, height: height }">
    <div class="transferPanel">
      <div class="header">
        <span class="title">数据列表 ({{ checkList.length }})</span>
        <a href="javascript:;" class="all" @click="addAll">全部添加</a>
      </div>
      <div class="searchBar" v-if="showSearch">
        <img src="./assets/search.png" alt="icon" class="searchIcon" />
        <input
          type="text"
          v-model.trim="leftSearch"
          @keyup.enter="leftSearchTap"
          :placeholder="placeholder"
          class="searchInput"
        />
      </div>
      <ul class="body" @scroll="scroll">
        <li
          :class="['item', { select: item.select, disable: item.disabled }]"
          v-for="(item, index) of checkList"
          @click="checkListClick(item, index)"
          :key="'checkList' + item.key"
        >
          <img :src="item | checkFilter" alt="check" class="icon" />
          <p>{{ item.label }}</p>
        </li>
        <li class="item empty" v-if="checkList.length === 0">无数据</li>
      </ul>
    </div>
    <div class="transferPanel">
      <div class="header">
        <span class="title">已选列表 ({{ checkedList.length }})</span>
        <a href="javascript:;" class="all" @click="removeAll">全部移除</a>
      </div>
      <div class="searchBar" v-if="showSearch">
        <img src="./assets/search.png" alt="icon" class="searchIcon" />
        <input
          type="text"
          v-model.trim="rightSearch"
          @keyup.enter="rightSearchBlur"
          @blur="rightSearchBlur"
          :placeholder="placeholder"
          class="searchInput"
        />
      </div>
      <ul class="body">
        <li
          :class="['item', { select: item.select, disable: item.disabled }]"
          v-for="(item, index) of rightListSource"
          @click="checkedListClick(item, index)"
          :key="'checkedList' + item.key"
        >
          <img :src="item | checkFilter" alt="check" class="icon" />
          <p>{{ item.label }}</p>
        </li>
        <li class="item empty" v-if="rightListSource.length === 0">无数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "listTransfer",
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容",
    },
    dataSource: Array,
    showSearch: {
      type: Boolean,
      default: true,
    },
    defaultChecked: {
      type: Array,
    },
    width: {
      type: String,
      default: "600px",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  data() {
    return {
      checkList: [],
      checkedList: [],
      rightDefault: [],
      searchCheckedList: [],
      leftSearch: void 0,
      rightSearch: void 0,
      rightIsSearch: false,
    };
  },
  computed: {
    rightListSource() {
      return this.rightIsSearch ? this.searchCheckedList : this.checkedList;
    },
  },
  filters: {
    checkFilter(item) {
      if (item.disabled) {
        return require("./assets/check_box_disable.png");
      } else if (item.select) {
        return require("./assets/check_select.png");
      } else {
        return require("./assets/check_box.png");
      }
    },
  },
  watch: {
    dataSource(val) {
      this.checkList = [...val]; // 左边栏数据填充
      if (this.defaultChecked) {
        if (this.checkedList.length === 0) {
          // 左边栏选中
          this.checkList.map((ele, index) => {
            if (this.defaultChecked.some((item) => item.label === ele.label))
              ele.select = true;
          });
          // 右边栏数据填充
          this.defaultChecked.map((ele, index) => {
            ele.select = true;
            this.checkedList.push(ele);
          });
        } else {
          // 左边栏分页选中
          this.checkList.map((ele, index) => {
            if (this.checkedList.some((item) => item.label === ele.label))
              ele.select = true;
          });
        }
      }
    },

    checkedList(val) {
      this.setSearchCheckedList(); // 右边栏搜索填充
      let _temp = [];
      val.map((ele, index) => {
        let obj = { ...ele };
        delete obj.select;
        delete obj.disabled;
        _temp.push(obj);
      });
      this.$emit("change", _temp); // 返回选中数据
    },
  },
  methods: {
    scroll(e) {
      let { scrollHeight, scrollTop, clientHeight } = e.target;
      if (scrollHeight - scrollTop - clientHeight === 0) this.$emit("loadMore"); // 滚动加载更多
    },

    leftSearchTap() {
      this.$emit("searchChange", this.leftSearch);
    },

    rightSearchBlur() {
      if (this.rightSearch) {
        this.setSearchCheckedList(); // 右边栏搜索填充
        this.rightIsSearch = true; // 右边栏是搜索数据
      } else {
        this.rightIsSearch = false; // 右边栏是选中数据
      }
    },

    setSearchCheckedList() {
      this.searchCheckedList = [];
      this.checkedList.map((ele, index) => {
        if (ele.label.indexOf(this.rightSearch) !== -1)
          this.searchCheckedList.push(ele);
      });
    },

    checkListClick(item, index) {
      if (item.disabled) return;
      if (item.select) {
        // 左边栏取消选中
        item.select = false;
        this.checkedList.map((ele, index) => {
          // 右边栏删除对应数据
          if (ele.label === item.label) {
            this.checkedList.splice(index, 1);
            return false;
          }
        });
      } else {
        // 左边栏选中
        item.select = true;
        this.checkedList.push({ ...item });
      }
    },

    checkedListClick(item, index) {
      if (this.rightIsSearch) {
        // 右边栏是搜索结果
        this.searchCheckedList.splice(index, 1); // 删除对应数据
        this.checkedList.map((ele, index) => {
          if (ele.label === item.label) {
            this.checkedList.splice(index, 1);
            return false;
          }
        });
      } else {
        // 右边栏是选中数据
        this.checkedList.splice(index, 1);
      }
      this.checkList.map((ele, index) => {
        // 左边栏取消数据选中
        if (ele.label === item.label) {
          ele.select = false;
          return false;
        }
      });
    },

    addAll() {
      this.checkList.map((ele, index) => {
        if (!ele.disabled && !ele.select) {
          // 过滤掉 禁选项 和 已选项
          ele.select = true;
          this.checkedList.push({ ...ele });
        }
      });
    },

    removeAll() {
      this.searchCheckedList = [];
      this.checkedList = [];
      if (this.defaultChecked) this.$emit("update:defaultChecked", []);
      this.dataSource.map((ele, index) => {
        // 初始化源数据
        ele.select = false;
      });
      this.checkList = [...this.dataSource];
    },
  },
};
</script>

<style scoped>
.transferContainer {
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(209, 219, 229);
  border-radius: 4px;
  overflow: hidden;
}

.transferPanel {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.transferPanel:first-of-type {
  border-right: 1px solid rgb(209, 219, 229);
}

.transferPanel .header {
  border-bottom: 1px solid rgb(209, 219, 229);
  line-height: 36px;
  background: rgb(251, 253, 255);
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.transferPanel .header .title {
  flex: 1;
}

.transferPanel .header .all {
  text-decoration: none;
  font-size: 14px;
  color: #1296db;
}

.transferPanel .searchBar {
  margin: 15px 0;
  position: relative;
}

.transferPanel .searchBar .searchIcon {
  width: 16px;
  position: absolute;
  top: 50%;
  left: calc(50% - 40%);
  transform: translate(10px, -50%);
}

.transferPanel .searchBar .searchInput {
  outline: none;
  width: 80%;
  margin: 0 auto;
  height: 30px;
  line-height: 24px;
  border-radius: 15px;
  border: 1px solid rgb(209, 219, 229);
  padding-left: 30px;
  display: block;
  box-sizing: border-box;
}

.transferPanel .searchBar .searchInput:focus {
  border-color: #1296db;
}

.transferPanel .body {
  flex: 1;
  overflow-y: auto;
  background: #fff;
}

.transferPanel .body .item {
  cursor: pointer;
  user-select: none;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  color: #666;
}

.transferPanel .body .item:not(.empty):hover,
.transferPanel .body .item.select {
  color: #1296db;
}

.transferPanel .body .item.disable {
  color: #cfd2dc !important;
  cursor: not-allowed;
}

.transferPanel .body .item .icon {
  width: 14px;
  display: block;
  margin-right: 10px;
}
</style>
