<template>
  <div>
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span v-if="!imageData" class="placeholder">
        Choose an Image
      </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      />
    </div>
    <div>
      <button
        class="btn ml-2"
        type="button"
        :disabled="!imageData"
        @click="onUpload"
      >
        Upload
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { storage, db } from "@/firebase";
import { mapState } from "vuex";
import uuidv1 from "uuid/v1";

export default {
  data() {
    return {
      imageData: null,
      file: null,
      hash: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        this.file = files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
    async onUpload() {
      this.hash = uuidv1();
      var storageRef = storage
        .ref()
        .child(`temp/${this.user.uid}/${this.hash}`);
      var uploadTask = storageRef.put(this.file);
      const that = this;
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        error => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            that.insertToDB(downloadURL);
          });
        }
      );
    },
    async insertToDB(fileURL) {
      db.ref("temp")
        .child(this.hash)
        .set({
          actualImageUrl: fileURL,
          hash: this.hash,
          id: this.hash,
          uploadedBy: this.user.uid,
          uploadedAt: new Date().toISOString()
        });
    },
    reset() {
      this.hash = "";
      this.file = null;
      this.imageData = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
