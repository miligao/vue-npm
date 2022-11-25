<template>
  <div>
    <h2>Welcome to MiliGao's Vue Component npm.js</h2>
    <ul class="npmList">
      <li><router-link to="transfer">transfer</router-link></li>
      <li><router-link to="popover">popover</router-link></li>
      <li><router-link to="clip">imageClip</router-link></li>
      <li><router-link to="viewer">imageViewer</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style>
.npmList {
  list-style: none;
}
</style>
