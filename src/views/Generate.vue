<template>
  <div class="container-xl px-3 px-md-6 my-4 my-lg-4">
    <div class="col-6 float-left px-3">
      <h3>Create your own LGTM</h3>
      <div class="input-group mt-2">
        <input
          class="form-control"
          type="text"
          placeholder="Enter image URL or select from your computer"
          v-model="imageURL"
        />
        <span class="input-group-button">
          <input
            type="file"
            ref="file"
            class="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            style="display:none"
            @change="onFileChange"
            accept="image/*"
          />
          <button
            class="btn"
            type="button"
            aria-label="Select image"
            @click="$refs.file.click()"
          >
            Select
          </button>
        </span>
      </div>
      <div class="form-actions mt-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="download"
          :disabled="!canDownload"
        >
          Download
        </button>
      </div>
    </div>
    <div class="col-6 float-left px-3">
      <div ref="canvasWrapper" class="canvas-wrapper">
        <v-stage ref="stage" :config="stageConfig">
          <v-layer ref="layer">
            <v-image :config="imageConfig" />
            <v-text :config="textConfig" />
            <v-text :config="subTextConfig" />
          </v-layer>
        </v-stage>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";

function getScale(containerWidth, containerHeight, width, height) {
  const widthRatio = containerWidth / width,
    heightRatio = containerHeight / height;
  return Math.min(widthRatio, heightRatio);
}

const DEFAULT_URL =
  "https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
export default {
  components: {},
  data() {
    return {
      stageConfig: {
        width: 100,
        height: 100
      },
      imageConfig: null,
      textConfig: null,
      imageURL: null,
      subTextConfig: null
    };
  },
  computed: {
    canDownload() {
      return this.imageURL;
    }
  },
  watch: {
    imageURL() {
      this.renderPreview(this.imageURL);
    }
  },
  created() { },
  mounted() {
    this.renderPreview(DEFAULT_URL);
  },
  methods: {
    renderPreview(imagePath) {
      const wrapper = this.$refs.canvasWrapper;
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
      this.stageConfig = {
        width,
        height
      };
      const image = new window.Image();
      image.src = imagePath;
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => {
        // set image only when it is loaded
        this.image = image;
        const imageWidth = image.width;
        const imageHeight = image.height;
        const scale = getScale(width, height, imageWidth, imageHeight);
        this.imageConfig = {
          image,
          width: imageWidth,
          height: imageHeight
        };
        const stage = this.$refs.stage.getStage();
        console.log(scale);
        stage.scale({ x: scale, y: scale });

        const newPos = {
          x: width / 2 - (imageWidth / 2) * scale,
          y: 0
        };
        this.textConfig = {
          text: "LGTM",
          fontSize: 60 / scale,
          fontStyle: "bold",
          width: imageWidth,
          height: imageHeight,
          fill: "white",
          align: "center",
          verticalAlign: "middle",
          letterSpacing: 6 / scale,
          stroke: "#24292e",
          strokeWidth: 0.5 / scale
        };
        this.subTextConfig = {
          text: "Look Good To Me",
          fontSize: 15 / scale,
          fontStyle: "normal",
          width: imageWidth,
          height: imageHeight + (60 / scale) * 1.5,
          fill: "white",
          align: "center",
          verticalAlign: "middle",
          letterSpacing: 2
        };
        stage.position(newPos);
        stage.setAttrs(newPos);
        stage.batchDraw();
      };
    },
    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.remove();
    },
    download() {
      const data = this.$refs.layer.getStage().toDataURL();
      // this.downloadURI(this.$refs.stage.getStage().toDataURL(), "lgtm.us.png");
      FileSaver.saveAs(data, "lgtm.us.png");
    },
    onFileChange() {
      const files = event.target.files;
      if (files.length > 0) {
        this.imageURL = window.URL.createObjectURL(files[0]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  width: 500px;
  height: 500px;
}
</style>
