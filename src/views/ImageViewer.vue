<!--
  - Created by MiliGao on 2017/11/22
 -->

<template lang="html">
  <div>
    <h1>图片浏览</h1>
    <button @click="imgViewerVisible = true">点我预览图片</button>
    <button @click="addImages">添加全部图片</button>
    <button @click="addImage">添加三张图片</button>
    <button @click="defaultIndex = 14">改变 defaultIndex</button>
    <button @click="del">删除</button>
    <ImageViewer
      :images="images"
      :defaultIndex="defaultIndex"
      :visible.sync="imgViewerVisible"
    >
    </ImageViewer>
  </div>
</template>

<script>
  import ImageViewer from '../components/vue2.0-image-viewer'

  export default {
    name: 'image',
    components: {
      ImageViewer
    },
    data () {
      return {
        images: [],
        defaultIndex: 0,
        imgViewerVisible: false
      }
    },
    methods: {
      addImages () {
        this.images = [
          'http://hbfile.b0.upaiyun.com/img/home/banner/cf572b5bec0d4a65c72c5f85a304eabdafc7ae75cc971',
          'https://pre00.deviantart.net/6c89/th/pre/f/2017/326/c/4/the_lonely_parade_by_wlop-dbukepi.jpg',
          'https://img00.deviantart.net/a181/i/2017/282/7/3/magical_night_by_baxiaart-dbq0z6t.jpg',
          'https://img00.deviantart.net/6bd1/i/2017/330/f/a/study_13_by_88grzes-dbuxx9d.jpg',
          'https://orig00.deviantart.net/6119/f/2017/329/d/b/daily_paint_1831__moonatee_by_cryptid_creations-dbuvhux.png',
          'https://img00.deviantart.net/1900/i/2017/183/a/8/shiba_inu_by_kay_ra-dbet51w.png',
          'https://img00.deviantart.net/7dc3/i/2015/146/b/2/earth_s_engine_exposed_by_priteeboy-d8ut8y6.jpg',
          'http://img.hb.aicdn.com/6085fe944b20464b042b7c9c958e92c7b33db64e16e9f-DhpM7v_fw658',
          'https://pre00.deviantart.net/6798/th/pre/i/2017/278/f/c/alone_in_the_night_by_adrianoampb-dbplp24.jpg',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-4.jpg',
          'http://hellorfimg.zcool.cn/manager/avatar/4cfc360196d19fcb302f2e353946544d.jpeg',
          'https://orig00.deviantart.net/7d82/f/2017/323/2/3/path_by_maskman626-dbu7kvh.gif',
          'https://pre00.deviantart.net/e009/th/pre/f/2017/330/c/3/water_princess_by_ryky-dbux67z.png'
        ]
      },

      addImage () {
        this.images.push('https://cdn.eso.org/images/publicationjpg/eso1208a.jpg')
        this.images.push('https://cdn.eso.org/images/publicationjpg/eso0926a.jpg')
        this.images.push('https://cdn.eso.org/images/publicationjpg/eso9845d.jpg')
      },

      del () {
        this.images.splice(3, 3)
        alert('移除成功')
      }
    }
  }
</script>

<style>

</style>
