<template>
  <v-layout row wrap justify-center>
    <!-- <input type="file" accept="image/*" @change="selectImage" /> -->
    <v-flex xs6 md6>
      <v-file-input
        chips
        accept="image/*"
        label="Upload image here"
        v-model="photo"
      ></v-file-input>
    </v-flex>

    <v-btn
      @click="uploadImage"
      fab
      dark
      large
      color="primary"
      fixed
      right
      bottom
      v-if="photo != null"
    >
      <v-icon dark>mdi-upload</v-icon>
    </v-btn>

    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="error" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from "firebase/app";
import { AWS } from "../main";
export default {
  data: () => ({
    photo: null,
    snackbar: false,
    text: "Uploaded to Firebase & AWS"
  }),
  methods: {
    uploadImage() {
      const time = Date.now();

      // Firebase Storage Upload
      firebase
        .storage()
        // .ref("photos/" + this.photo.name)
        .ref("photos/" + `${time}.jpg`)
        .put(this.photo);

      // AWS upload to cyb590
      const s3Upload = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: "cyb590"
        }
      });

      s3Upload
        .putObject({
          // Key: this.photo.name,
          Key: `${time.toString()}.jpg`,
          Body: this.photo
        })
        .promise();

      //Snackbar trigger
      this.snackbar = true;
      // Reset photo object
      this.photo = null;
    }
  }
};
</script>
