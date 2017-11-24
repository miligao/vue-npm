<!--
  - Created by MiliGao on 2017/11/22
 -->

<template lang="html">
  <transition name="imageViewer">
    <section class="imageViewerMask" v-if="visible">
      <div class="imageViewerLayer">
        <transition :name="listName">
          <div class="imageContainer" :key="'imageBox' + currentIndex" ref="imageContainer">
            <img
              :style="imageStyle"
              :src="images[currentIndex]"
              :class="['image', { draging: imageIsDraging }]"
              @mousedown.prevent="imageMousedown"
              ref="image"
              alt="图片"
            />
          </div>
        </transition>
        <div class="zoomPercent" v-show="showZoomPercent">{{ Math.ceil(zoom * 100) + '%' }}</div>
        <div class="pointBar">{{ currentIndex + 1 }} / {{ images.length }}</div>
        <div class="handleBar">
          <div class="button" @click="zoomAuto"><img :src="imageStatus === 'natural' ? require('./assets/zoom_adapt.png') : require('./assets/zoom_auto.png')" alt="自适应"></div>
          <div class="button" @click="zoomIn"><img src="./assets/zoom_in.png" alt="放大"></div>
          <div class="button" @click="zoomOut"><img src="./assets/zoom_out.png" alt="缩小"></div>
          <div class="button prev" @click="prev"><div class="arrow"></div></div>
          <div class="button next" @click="next"><div class="arrow"></div></div>
          <div class="button" @click="leftRotate"><img src="./assets/left_rotate.png" alt="左旋"></div>
          <div class="button" @click="rightRotate"><img src="./assets/right_rotate.png" alt="右旋"></div>
          <div class="button"><img src="./assets/paly.png" alt="幻灯片"></div>
        </div>
        <div class="closeButton" @click="$emit('update:visible', false)"><em></em></div>
      </div>
    </section>
  </transition>
</template>

<script>
  let zoomRatio = 0.02   // 缩放比率

  export default {
    name: 'imageViewer',
    props: {
      images: {
        type: Array,
        required: true
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      visible: Boolean
    },
    data () {
      return {
        currentIndex: 0,
        zoom: 1,
        rotate: 0,
        imageIsDraging: false,
        listName: 'list-init',
        imageTransition: 'transform .2s',
        imageStatus: 'natural',   // natural/adapt
        showZoomPercent: false,
        mouseDown: {
          x: 0,
          y: 0
        },
        mouseUp: {
          x: 0,
          y: 0
        },
        mouseDrag: {
          x: 0,
          y: 0
        }
      }
    },
    computed: {
      imageStyle () {
        return {
          transform: `translate(${this.mouseDrag.x}px, ${this.mouseDrag.y}px) scale(${this.zoom}) rotate(${this.rotate}deg)`,
          transition: this.imageTransition
        }
      }
    },
    watch: {
      currentIndex (val) {
        // 初始化参数
        this.zoom = 1
        this.rotate = 0
        this.imageStatus = 'natural'
        this.mouseDown.x = 0
        this.mouseDown.y = 0
        this.mouseUp.x = 0
        this.mouseUp.y = 0
        this.mouseDrag.x = 0
        this.mouseDrag.y = 0
      },

      defaultIndex (val) {
        this.currentIndex = val
      },

      visible (val) {
        if (val) {
          // 注册鼠标滚轮事件
          if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.onMouseScroll)
          }   // W3C
          window.onmousewheel = document.onmousewheel = this.onMouseScroll   // IE/Opera/Chrome

          setTimeout(() => {
            this.loadImage()
          }, 10)   // 优先加载 currentIndex 的图片
        } else {
          if (document.addEventListener) {
            document.removeEventListener('DOMMouseScroll', this.onMouseScroll)
          }
          window.onmousewheel = null
          document.onmousewheel = null
        }
      },

      zoom () {
        if (this.showZoomPercent) return
        this.showZoomPercent = true
        setTimeout(() => {
          this.showZoomPercent = false
        }, 1000)
      }
    },
    mounted () {
      this.currentIndex = this.defaultIndex
    },
    methods: {
      // 加载图片
      loadImage () {
        this.images.map((ele, index) => {
          let img = new Image()
          img.onload = (e) => {}
          img.src = ele
        })
      },

      onMouseScroll (e) {
        /*
         ** wheelDelta: IE/Opera/Chrome
         ** detail: Firefox
         */
        if (e.wheelDelta > 0 || e.detail < 0) {
          this.zoomIn()
        } else if (e.wheelDelta < 0 || e.detail > 0) {
          this.zoomOut()
        }
      },

      imageMousedown (e) {
        this.imageTransition = 'none'
        this.mouseDown.x = e.clientX
        this.mouseDown.y = e.clientY
        this.imageIsDraging = true
        this.$refs.image.addEventListener('mousemove', this.imageDraging)
        this.$refs.image.addEventListener('mouseup', this.imageDragEnd)
        this.$refs.image.addEventListener('mouseleave', this.imageDragEnd)
      },

      imageDraging (e) {
        this.imageIsDraging = true
        this.mouseDrag.x = this.mouseUp.x + e.clientX - this.mouseDown.x
        this.mouseDrag.y = this.mouseUp.y + e.clientY - this.mouseDown.y
      },

      imageDragEnd (e) {
        this.$refs.image.removeEventListener('mousemove', this.imageDraging)
        this.$refs.image.removeEventListener('mouseup', this.imageDragEnd)
        this.$refs.image.removeEventListener('mouseleave', this.imageDragEnd)
        this.mouseUp.x = this.mouseDrag.x
        this.mouseUp.y = this.mouseDrag.y
        this.imageIsDraging = false
        this.imageTransition = 'transform .2s'
      },

      next () {
        this.listName = 'list-next'
        if (this.currentIndex === this.images.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex++
        }
      },

      prev () {
        this.listName = 'list-prev'
        if (this.currentIndex === 0) {
          this.currentIndex = this.images.length - 1
        } else {
          this.currentIndex--
        }
      },

      zoomIn () {
        this.zoom = this.zoom >= 2 ? 2 : this.zoom + zoomRatio
      },

      zoomOut () {
        this.zoom = this.zoom <= 0.04 ? 0.04 : this.zoom - zoomRatio
      },

      zoomAuto () {
        if (this.imageStatus === 'natural') {   // 自适应大小
          this.imageStatus = 'adapt'
          let { width: imgW, height: imgH } = this.$refs.image
          let { offsetWidth: viewW, offsetHeight: viewH } = this.$refs.imageContainer
          // 图片的宽高比率
          if (imgW / imgH <= viewW / viewH) {
            this.zoom = viewH / imgH
          } else {
            this.zoom = viewW / imgW
          }
        } else {  // 原始大小
          this.imageStatus = 'natural'
          this.zoom = 1
        }
        this.mouseDown.x = 0
        this.mouseDown.y = 0
        this.mouseUp.x = 0
        this.mouseUp.y = 0
        this.mouseDrag.x = 0
        this.mouseDrag.y = 0
      },

      leftRotate () {
        this.rotate += 90
      },

      rightRotate () {
        this.rotate -= 90
      }
    }
  }
</script>

<style spaced>
  .imageViewerMask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  .imageViewerLayer {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: relative;
  }

  .imageViewer {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .imageContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .imageContainer .image {
    display: block;
    user-select: none;
    cursor: grab;
  }

  .imageContainer .image.draging {
    cursor: grabbing;
  }

  .handleBar {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    height: 50px;
    padding: 0 10px;
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: .4s;
    user-select: none;
  }

  .handleBar:hover {
    background: rgba(255, 255, 255, .2);
  }

  .handleBar .button {
    width: 28px;
    height: 28px;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .handleBar .button:hover {
    background: rgba(0, 0, 0, .85);
    transform: scale(1.1);
  }

  .handleBar .button img {
    width: 18px;
  }

  .handleBar .button.next .arrow {
    transform: translateX(3px);
  }

  .handleBar .button.prev .arrow {
    transform: rotate(180deg) translateX(3px);
  }

  .handleBar .button .arrow::before,
  .handleBar .button .arrow::after {
    content: "";
    display: block;
    width: 2px;
    height: 8px;
    border-radius: 2px;
    background: #fff;
    transform-origin: bottom right;
    transform: rotate(-45deg);
  }

  .handleBar .button .arrow::after {
    transform-origin: top right;
    transform: rotate(45deg);
  }

  .pointBar {
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, .5);
    font-size: 14px;
  }

  .zoomPercent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 30px;
    width: 66px;
    text-align: center;
    border-radius: 15px;
    background: rgba(0, 0, 0, .5);
    color: rgba(255, 255, 255, .9);
    font-size: 14px;
  }

  .closeButton {
    width: 15px;
    height: 15px;
    background: #505050;
    border: 20px solid #505050;
    border-top-width: 10px;
    border-right-width: 10px;
    border-bottom-left-radius: 100%;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .closeButton:hover em,
  .closeButton:hover em::after {
    background: #fff;
  }

  .closeButton em {
    display: block;
    width: 2px;
    height: 16px;
    background: rgba(255, 255, 255, .5);
    border-radius: 1px;
    transform: rotate(-45deg);
  }

  .closeButton em::after {
    content: "";
    display: block;
    width: 2px;
    height: 16px;
    background: rgba(255, 255, 255, .5);
    border-radius: 1px;
    transform: rotate(90deg);
  }

  .list-next-enter,
  .list-prev-leave-to {
    transform: translateX(100%);
  }

  .list-next-leave-to,
  .list-prev-enter {
    transform: translateX(-100%);
  }

  .list-prev-enter-active,
  .list-prev-leave-active,
  .list-next-enter-active,
  .list-next-leave-active {
    transition: transform .4s;
  }

  .imageViewer-enter,
  .imageViewer-leave-to {
    opacity: 0;
  }

  .imageViewer-enter-active,
  .imageViewer-leave-active {
    transition: opacity .4s;
  }
</style>
