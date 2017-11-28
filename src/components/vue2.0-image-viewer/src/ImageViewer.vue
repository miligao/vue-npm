<!--
  - Created by MiliGao on 2017/11/22
 -->

<template lang="html">
  <transition name="imageViewer">
    <section class="imageViewerMask" v-if="visible">
      <div class="imageViewerLayer" ref="imageViewerLayer">
        <transition :name="listName">
          <div
            :class="['imageContainer', { imageFullScreen: isFullScreen }]"
            :key="'imageBox' + currentIndex"
            ref="imageContainer"
            @mousedown.prevent="imageMousedown"
          >
            <img
              :style="imageStyle"
              :src="images[currentIndex]"
              class="image"
              ref="image"
              alt="图片"
            />
          </div>
        </transition>
        <div class="zoomPercent" v-show="!isFullScreen && showZoomPercent">{{ Math.ceil(zoom * 100) + '%' }}</div>
        <div class="pointBar">{{ currentIndex + 1 }} / {{ images.length }}</div>
        <div class="handleBar" v-show="!isFullScreen">
          <div class="button" @click="zoomAuto"><img :src="imageStatus === 'natural' ? require('./assets/zoom_adapt.png') : require('./assets/zoom_auto.png')" alt="自适应"></div>
          <div class="button" @click="zoomIn"><img src="./assets/zoom_in.png" alt="放大"></div>
          <div class="button" @click="zoomOut"><img src="./assets/zoom_out.png" alt="缩小"></div>
          <div class="button prev" @click="prev"><div class="arrow"></div></div>
          <div class="button next" @click="next"><div class="arrow"></div></div>
          <div class="button" @click="leftRotate"><img src="./assets/left_rotate.png" alt="左旋"></div>
          <div class="button" @click="rightRotate"><img src="./assets/right_rotate.png" alt="右旋"></div>
          <div class="button" @click="palyPPT"><img src="./assets/paly.png" alt="幻灯片"></div>
        </div>
        <div v-show="!isFullScreen" class="closeButton" @click="$emit('update:visible', false)"><em></em></div>
      </div>
    </section>
  </transition>
</template>

<script>
  let zoomRatio = 0.02   // 缩放比率
  let zoomMax = 4   // 最大放大倍数

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
        currentIndex: -1,
        zoom: 1,
        rotate: 0,
        listName: 'list-init',
        imageTransition: 'transform .2s',
        imageStatus: 'natural',   // natural/adapt
        imagesSize: [],
        showZoomPercent: false,
        isFullScreen: false,
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
        if (this.isFullScreen) {
          this.imageStatus = 'adapt'
          this.computedZoom()
        } else {
          this.zoom = 1
          this.imageStatus = 'natural'
        }
        this.rotate = 0
        this.initLocation()
      },

      visible (val) {
        if (val) {
          this.currentIndex = this.defaultIndex
          // 注册鼠标滚轮事件
          if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.onMouseScroll)
          }   // W3C
          window.onmousewheel = document.onmousewheel = this.onMouseScroll   // IE/Opera/Chrome
          // 注册全屏事件
          document.addEventListener('fullscreenchange', this.fullscreenchange)
          document.addEventListener('mozfullscreenchange', this.fullscreenchange)
          document.addEventListener('webkitfullscreenchange', this.fullscreenchange)
          document.addEventListener('msfullscreenchange', this.fullscreenchange)

          setTimeout(() => {
            this.loadImage()
          }, 5)   // 优先加载 currentIndex 图片
        } else {
          if (document.addEventListener) {
            document.removeEventListener('DOMMouseScroll', this.onMouseScroll)
          }
          window.onmousewheel = null
          document.onmousewheel = null
          document.removeEventListener('fullscreenchange', this.fullscreenchange)
          document.removeEventListener('mozfullscreenchange', this.fullscreenchange)
          document.removeEventListener('webkitfullscreenchange', this.fullscreenchange)
          document.removeEventListener('msfullscreenchange', this.fullscreenchange)
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
    methods: {
      // 加载图片
      loadImage () {
        this.images.map((ele, index) => {
          let img = new Image()
          img.onload = (e) => {
            this.imagesSize[index] = { w: e.target.width, h: e.target.height }
          }
          img.src = ele
        })
      },

      onMouseScroll (e) {
        if (this.isFullScreen) return
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

      initLocation () {
        this.mouseDown.x = 0
        this.mouseDown.y = 0
        this.mouseUp.x = 0
        this.mouseUp.y = 0
        this.mouseDrag.x = 0
        this.mouseDrag.y = 0
      },

      imageMousedown (e) {
        if (this.isFullScreen) return
        this.imageTransition = 'none'
        this.mouseDown.x = e.clientX
        this.mouseDown.y = e.clientY
        this.$refs.imageContainer.addEventListener('mousemove', this.imageDraging)
        this.$refs.imageContainer.addEventListener('mouseup', this.imageDragEnd)
        this.$refs.imageContainer.addEventListener('mouseleave', this.imageDragEnd)
      },

      imageDraging (e) {
        this.mouseDrag.x = this.mouseUp.x + e.clientX - this.mouseDown.x
        this.mouseDrag.y = this.mouseUp.y + e.clientY - this.mouseDown.y
      },

      imageDragEnd (e) {
        this.$refs.imageContainer.removeEventListener('mousemove', this.imageDraging)
        this.$refs.imageContainer.removeEventListener('mouseup', this.imageDragEnd)
        this.$refs.imageContainer.removeEventListener('mouseleave', this.imageDragEnd)
        this.mouseUp.x = this.mouseDrag.x
        this.mouseUp.y = this.mouseDrag.y
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
        this.zoom = this.zoom >= zoomMax ? zoomMax : this.zoom + zoomRatio
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
        this.initLocation()
      },

      computedZoom () {
        let { w: imgW, h: imgH } = this.imagesSize[this.currentIndex]
        let { offsetWidth: viewW, offsetHeight: viewH } = this.$refs.imageContainer
        if (imgW <= viewW && imgH <= viewH) {
          this.zoom = 1
        } else {
          if (imgW / imgH <= viewW / viewH) {   // 图片的宽高比率
            this.zoom = viewH / imgH
          } else {
            this.zoom = viewW / imgW
          }
        }
      },

      leftRotate () {
        this.rotate -= 90
      },

      rightRotate () {
        this.rotate += 90
      },

      palyPPT () {
        let docElm = this.$refs.imageViewerLayer
        if (docElm.requestFullscreen) {   // W3C
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {   // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {   // Chrome等
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {   // IE11
          docElm.msRequestFullscreen()
        }
      },

      fullscreenchange () {
        this.isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
        if (this.isFullScreen) {
          this.imageStatus = 'adapt'
          this.rotate = 0
          this.initLocation()
          setTimeout(() => {   // DOM结构还没变化
            this.computedZoom()
          }, 50)
          this.timer = setInterval(() => {
            this.next()
          }, 3000)
        } else {
          this.zoom = 1
          this.imageStatus = 'natural'
          window.clearInterval(this.timer)
          this.timer = null
        }
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
    cursor: grab;
  }

  .imageContainer.imageFullScreen {
    cursor: none;
  }

  .imageContainer .image {
    display: block;
    user-select: none;
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
    background: rgba(0, 0, 0, .7);
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
    width: 0;
    height: 0;
    border: 30px solid rgba(0, 0 ,0, .5);
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
    transform: rotate(-45deg) translate(-8px, 0px);
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
