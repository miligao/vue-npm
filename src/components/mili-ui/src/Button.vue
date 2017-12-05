<!--
  - Created by MiliGao on 2017/12/1
 -->

<template lang="html">
  <div class="button" @click="onClick">按钮</div>
</template>

<script>
  export default {
    name: 'button',
    methods: {
      onClick () {
        console.log('点击了按钮')
      }
    }
  }
</script>

<style>
  .button {
    width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #4db3ff;
    border: 1px solid #4db3ff;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    user-select: none;
  }

  .button:active {
    background: rgba(77, 179, 255, 0.21);
    color: #4db3ff;
  }
</style>
