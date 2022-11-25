<template>
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
      v-model:visible="imgViewerVisible"
      @onDownload="onDownload"
    >
    </ImageViewer>
  </div>
</template>

<script>
import ImageViewer from "../components/vue-image-viewer";

export default {
  name: "image",
  components: {
    ImageViewer,
  },
  data() {
    return {
      images: [],
      defaultIndex: 0,
      imgViewerVisible: false,
    };
  },
  methods: {
    addImages() {
      fetch("https://picsum.photos/v2/list")
        .then((response) => response.json())
        .then((data) => {
          this.images = data.map((item) => item.download_url);
        });
    },

    addImage() {
      this.images.push(
        "https://cdn.eso.org/images/publicationjpg/eso1208a.jpg"
      );
      this.images.push(
        "https://cdn.eso.org/images/publicationjpg/eso0926a.jpg"
      );
      this.images.push(
        "https://cdn.eso.org/images/publicationjpg/eso9845d.jpg"
      );
    },

    del() {
      this.images.splice(3, 3);
      alert("移除成功");
    },

    onDownload(url) {
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", "snapshot.jpeg");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style></style>
