
<!--
  - Created by MiliGao on 2017/11/16
 -->

<template lang="html">
  <div>
    <img src="../assets/logo.png" />
    <h2>Welcome to Mili's Vue Component -- npm.js</h2>
    <ul class="npmList">
      <li><router-link to="Transfer">transfer</router-link></li>
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
