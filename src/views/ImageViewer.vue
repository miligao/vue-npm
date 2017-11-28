<!--
  - Created by MiliGao on 2017/11/22
 -->

<template lang="html">
  <div>
    <p>浏览大图</p>
    <p>浏览大图</p>
    <p>浏览大图</p>
    <p>浏览大图</p>
    <p>浏览大图</p>
    <button @click="imgViewerVisible = true">点我预览图片</button>
    <ImageViewer
      :images="images"
      :defaultIndex="0"
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
        images: [
          'https://pre00.deviantart.net/6c89/th/pre/f/2017/326/c/4/the_lonely_parade_by_wlop-dbukepi.jpg',
          'https://img00.deviantart.net/a181/i/2017/282/7/3/magical_night_by_baxiaart-dbq0z6t.jpg',
          'https://img00.deviantart.net/6bd1/i/2017/330/f/a/study_13_by_88grzes-dbuxx9d.jpg',
          'https://orig00.deviantart.net/6119/f/2017/329/d/b/daily_paint_1831__moonatee_by_cryptid_creations-dbuvhux.png',
          'https://pre00.deviantart.net/77b8/th/pre/i/2014/141/d/a/gods_of_sound_by_jonasdero-d7j8814.jpg',
          'https://img00.deviantart.net/1900/i/2017/183/a/8/shiba_inu_by_kay_ra-dbet51w.png',
          'https://img00.deviantart.net/7dc3/i/2015/146/b/2/earth_s_engine_exposed_by_priteeboy-d8ut8y6.jpg',
          'http://img.hb.aicdn.com/6085fe944b20464b042b7c9c958e92c7b33db64e16e9f-DhpM7v_fw658',
          'https://pre00.deviantart.net/6798/th/pre/i/2017/278/f/c/alone_in_the_night_by_adrianoampb-dbplp24.jpg',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-4.jpg',
          'http://imgq.duitang.com/uploads/item/201402/07/20140207162528_GLWkY.jpeg',
          'http://hellorfimg.zcool.cn/manager/avatar/4cfc360196d19fcb302f2e353946544d.jpeg',
          'https://orig00.deviantart.net/7d82/f/2017/323/2/3/path_by_maskman626-dbu7kvh.gif',
          'https://pre00.deviantart.net/e009/th/pre/f/2017/330/c/3/water_princess_by_ryky-dbux67z.png'
        ],
        imgViewerVisible: false
      }
    }
  }
</script>

<style>

</style>
