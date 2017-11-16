<!--
  - Created by Mili on 2017/8/24
 -->

<template lang="html">
  <ul>
    <li v-for="n in 6">
      <Popover
        content="确认删除此条数据吗？"
        trigger="confirm"
        placement="top-end"
        popoverClass="pop"
        @onConfirm="delComfirm"
      >
        <a href="javascript:;" class="deleteBt" slot="reference">删除</a>
      </Popover>
    </li>
  </ul>
</template>

<script>
  import Popover from '../components/vue-popover/index'

  export default {
    name: 'popover',
    components: {
      Popover
    },
    methods: {
      delComfirm () {
        console.log('delete')
      }
    }
  }
</script>

<style>
  ul {
    padding: 50px 200px;
  }

  ul li {
    list-style: none;
    margin-bottom: 10px;
    height: 30px;
    width: 40px;
  }

  li .pop {
    /*float: right;*/
    /*margin-right: 50%;*/
  }

  li .pop .image {
    width: 800px;
    display: block;
  }

  li .pop .deleteBt {
    text-decoration: none;
  }
</style>
