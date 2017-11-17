<!--
  - Created by MiliGao on 2017/11/16
 -->

<template lang="html">
  <section>
    <input type="file" @change="change" :multiple="false" ref="input">
    <div class="container">
      <div class="clipBox">
        <ImageClip
          ref="imgClip"
          :imgSrc="imgSrc"
          @onOk="success"
          @onCancel="cancel"
        >
          <div slot="footer">
            <button @click="test">test</button>
          </div>
        </ImageClip>
      </div>
      <img ref="clipSrc" class="clipSrc">
    </div>
  </section>
</template>

<script>
  import ImageClip from '../components/vue-image-clip/index'
  export default {
    name: 'clip',
    components: {
      ImageClip
    },
    data () {
      return {
        imgSrc: void 0,
        clipSrc: void 0
      }
    },
    methods: {
      change (e) {
        const files = e.target.files
        if (!files) return
        let postFiles = Array.prototype.slice.call(files)
        if (postFiles.length === 0) return
        let _self = this
        let render = new FileReader()
        render.readAsDataURL(postFiles[0])
        render.onload = function (e) {
          _self.imgSrc = e.target.result
          _self.$refs.input.value = ''
        }
      },

      success (blob) {
        let url = URL.createObjectURL(blob)
        let newImg = this.$refs.clipSrc
        newImg.onload = () => {
          URL.revokeObjectURL(url)
        }
        newImg.src = url
      },

      cancel () {
        console.log('cancel')
      },

      test () {
        this.$refs.imgClip.confirm()
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .clipBox {
    border: 1px solid #e4e4e4;
    padding: 40px;
  }

  .clipSrc {
    width: 360px;
    height: 360px;
    border: 1px solid #e4e4e4;
  }
</style>
