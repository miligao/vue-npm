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
      :defaultIndex="3"
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
          'http://img.hb.aicdn.com/3e79e3e9b541b4633511bc34127e9c2f1ff61ad951a65-NiCdcL_fw658',
          'http://img.hb.aicdn.com/dbd424a059abe67fd362c237cfd41418a6c5be58594dd-NMMJSy_fw658',
          'http://img.hb.aicdn.com/7e56992740978acf4c23e71353df38e1e8ea9327277f8-g62vLO_fw658',
          'http://img.hb.aicdn.com/87ef899c3d92c722c44399639663e2fd0b6afd17135af-fPyV8N_fw658',
          'http://img.hb.aicdn.com/312778fc9264f21e9cd54c3173c7911e23bc735ab6739-a4Nr5w_fw658',
          'http://img.hb.aicdn.com/a777bb32886e798e1e2a6b63112473f9591e3818218152-KTKbLi_fw658',
          'http://img.hb.aicdn.com/6085fe944b20464b042b7c9c958e92c7b33db64e16e9f-DhpM7v_fw658',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-1.jpg',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-2.jpg',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-3.jpg',
          'http://www.dowebok.com/demo/192/img/thumbnails/tibet-4.jpg'
        ],
        imgViewerVisible: false
      }
    }
  }
</script>

<style>

</style>
