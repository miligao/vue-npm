<!--
  - Created by MiliGao on 2017/8/23
 -->

<template lang="html">
  <div :class="['popover', popoverClass]" @mouseenter="handleEvent" @mouseleave="handleEvent">
    <transition name="popover" mode="out-in">
      <div class="poplayer" :data-placement="placement" v-show="visible">
        <h5 v-if="title" class="title">{{ title }}</h5>
        <p v-if="content" class="content">{{ content }}</p>
        <slot></slot>
        <div v-if="trigger === 'confirm'" class="buttonBox">
          <button @click="confirm">确定</button>
          <button @click="cancel">取消</button>
        </div>
        <div class="popArrow"></div>
      </div>
    </transition>
    <div class="popHandle" @click="handleClick">
      <slot name="reference"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popover',
    props: {
      popoverClass: String,
      title: String,
      content: String,
      trigger: {
        type: String,
        default: 'hover',
        validator (val) {
          return ['click', 'hover', 'confirm'].indexOf(val) > -1
        }
      },
      placement: {
        type: String,
        default: 'top',
        validator (val) {
          return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(val) > -1
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible: function (val) {
        if (!val) {
          this.removeListener()
        }
      }
    },
    brforeDestroy () {
      this.removeListener()
    },
    methods: {
      handleClick () {
        if (this.trigger === 'hover') return
        this.visible = true
        document.addEventListener('mousedown', this.documentClick)
      },

      removeListener () {
        document.removeEventListener('mousedown', this.documentClick)
      },

      handleEvent () {
        if (this.trigger === 'click' || this.trigger === 'confirm') return
        this.togglePop()
      },

      confirm () {
        this.togglePop()
        this.$emit('onConfirm')
      },

      cancel () {
        this.togglePop()
        this.$emit('onCancel')
      },

      togglePop () {
        this.visible = !this.visible
      },

      documentClick (e) {
        if (this.$el.contains(e.target)) return
        this.togglePop()
      }
    }
  }
</script>

<style scoped>
  .popover-enter,
  .popover-leave-to {
    opacity: 0;
  }

  .popover-enter-active,
  .popover-leave-active {
    transition: opacity .3s;
  }

  .popover {
    position: relative;
  }

  .popover .poplayer {
    font-size: 12px;
    padding: 12px;
    min-width: 200px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
  }

  .popover .poplayer .title {
    color: #333;
    margin-bottom: 10px;
  }

  .popover .poplayer .content {
    margin-top: 5px;
    color: #666;
  }

  .popover .poplayer .buttonBox {
    overflow: hidden;
    margin-top: 15px;
  }

  .popover .poplayer .popArrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: #fff;
  }

  .popover .poplayer .buttonBox button {
    float: right;
    width: 46px;
    line-height: 26px;
    margin-left: 10px;
    border: none;
    border-radius: 2px;
    outline: none;
    background: #409EFF;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }

  .popover .poplayer .buttonBox button:last-of-type {
    background: #fff;
    color: #409EFF;
  }

  .popover .poplayer .buttonBox button:active {
    opacity: .7;
  }

  /*top*/
  .popover .poplayer[data-placement^='top'] {
    bottom: calc(100% + 6px);
  }

  .popover .poplayer[data-placement^='top'] .popArrow {
    bottom: -10px;
  }

  .popover .poplayer[data-placement='top'] {
    left: 50%;
    transform: translateX(-50%);
  }

  .popover .poplayer[data-placement='top'] .popArrow {
    left: calc(50% - 5px);
  }

  .popover .poplayer[data-placement='top-start'] {
    left: 0;
  }

  .popover .poplayer[data-placement='top-start'] .popArrow {
    left: 12px;
  }

  .popover .poplayer[data-placement='top-end'] {
    right: 0;
  }

  .popover .poplayer[data-placement='top-end'] .popArrow {
    right: 12px;
  }

  /*bottom*/
  .popover .poplayer[data-placement^='bottom'] {
    top: calc(100% + 6px);
  }

  .popover .poplayer[data-placement^='bottom'] .popArrow {
    transform: rotateZ(180deg);
    top: -10px
  }

  .popover .poplayer[data-placement='bottom'] {
    left: 50%;
    transform: translateX(-50%);
  }

  .popover .poplayer[data-placement='bottom'] .popArrow {
    left: calc(50% - 5px);
  }

  .popover .poplayer[data-placement='bottom-start'] {
    left: 0;
  }

  .popover .poplayer[data-placement='bottom-start'] .popArrow {
    left: 12px;
  }

  .popover .poplayer[data-placement='bottom-end'] {
    right: 0;
  }

  .popover .poplayer[data-placement='bottom-end'] .popArrow {
    right: 12px;
  }

  /*left*/
  .popover .poplayer[data-placement^='left'] {
    right: calc(100% + 10px);
  }

  .popover .poplayer[data-placement^='left'] .popArrow {
    transform: rotateZ(-90deg);
    right: -10px;
  }

  .popover .poplayer[data-placement='left'] {
    top: 50%;
    transform: translateY(-50%);
  }

  .popover .poplayer[data-placement='left'] .popArrow {
    top: calc(50% - 5px);
  }

  .popover .poplayer[data-placement='left-start'] {
    top: 0;
  }

  .popover .poplayer[data-placement='left-start'] .popArrow {
    top: 10px;
  }

  .popover .poplayer[data-placement='left-end'] {
    bottom: 0;
  }

  .popover .poplayer[data-placement='left-end'] .popArrow {
    bottom: 10px;
  }

  /*right*/
  .popover .poplayer[data-placement^='right'] {
    left: calc(100% + 10px);
  }

  .popover .poplayer[data-placement^='right'] .popArrow {
    transform: rotateZ(90deg);
    left: -10px;
  }

  .popover .poplayer[data-placement='right'] {
    top: 50%;
    transform: translateY(-50%);
  }

  .popover .poplayer[data-placement='right'] .popArrow {
    top: calc(50% - 5px);
  }

  .popover .poplayer[data-placement='right-start'] {
    top: 0;
  }

  .popover .poplayer[data-placement='right-start'] .popArrow {
    top: 10px;
  }

  .popover .poplayer[data-placement='right-end'] {
    bottom: 0;
  }

  .popover .poplayer[data-placement='right-end'] .popArrow {
    bottom: 10px;
  }
</style scoped>
