/**
 * Created by MiliGao on 2017/11/22.
 */

import ImageViewer from './src/ImageViewer.vue'

ImageViewer.install = function (Vue) {
  Vue.component(ImageViewer.name, ImageViewer)
}

export default ImageViewer
