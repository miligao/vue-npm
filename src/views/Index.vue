
<!--
  - Created by MiliGao on 2017/11/16
 -->

<template lang="html">
  <div>
    <h2>Welcome to MiliGao's Vue Component npm.js</h2>
    <ul class="npmList">
      <li><router-link to="Transfer">transfer</router-link></li>
      <li><router-link to="Popover">popover</router-link></li>
      <li><router-link to="Clip">imageClip</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style>
  .npmList {
    list-style: none;
  }
</style>
