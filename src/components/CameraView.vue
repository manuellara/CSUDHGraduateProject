<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream" />

    <div class="camera-modal-container">
      <span
        @click="capture"
        class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
      >
        <i class="material-icons">camera</i>
      </span>
    </div>
    <v-snackbar v-model="snackbarUpload">
      {{ text }}
      <v-btn color="error" text @click="snackbarUpload = false">Close</v-btn>
    </v-snackbar>
    
  </div>
</template>

<script>
require("material-design-lite");
import { db, AWS } from "../main";
export default {
  props: ["docID"],
  data: () => ({
    mediaStream: null,
    snackbarUpload: false,
    text: "Challenge Photo Uploaded to AWS",
  }),
  methods: {
    capture() {
      if (this.$store.state.user != null) {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
        const imageCapture = new window.ImageCapture(mediaStreamTrack);
        return imageCapture.takePhoto().then(blob => {
          
          db.collection("cyb590")
            .doc(this.docID)
            .get()
            .then(doc => {
              // Get photo name
              let photoName = doc.data().name;
              return photoName;
            })
            .then(photoName => {
              // Cast blob to file
              var imageFile = new File([blob], photoName);

              // AWS S3 bucket settings
              const s3Upload = new AWS.S3({
                apiVersion: "2006-03-01",
                params: {
                  Bucket: "cyb590challenge"
                }
              });
              var upload = s3Upload
                .putObject({
                  Key: photoName,
                  Body: imageFile
                })
                .promise();

                upload.then(() => {
                  console.log("Uploaded to S3")
                  this.snackbarUpload = true;
                })
////////////////////////////////////////////////////////////////
              //       db.collection("cyb590")
              //         .doc(this.docID)
              //         .update({
              //           matchedUsers: firebase.firestore.FieldValue.arrayUnion(
              //             this.$store.state.user.email
              //           )
              //         });
////////////////////////////////////////////////////////////////
            });
        });
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  mounted() {
    if (this.$store.state.user != null) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        })
        .catch(error => console.error("getUserMedia() error:", error));
    } else {
      this.$router.push({ name: "Home" });
    }
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");

.camera-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}
.take-picture-button {
  display: flex;
}
</style> 