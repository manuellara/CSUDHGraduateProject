<template>
  <v-layout mx-2 justify-space-around>
    <div class="imgbox">
      <v-img class="center-fit" :src="imgURL" contain></v-img>
    </div>
  </v-layout>
</template>
<script>
import { db, AWS } from "../main";
export default {
  props: ["docID"],
  data: () => ({
    imgURL: "",
    localName: "",
  }),
  methods: {
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    getPhoto(data, name) {
      let objectData = data.Body.toString("base64");
      this.imgURL = `data:image/jpg;base64,${objectData}`;
      var imageFile = this.dataURLtoFile(this.imgURL, name);
      console.log(imageFile);
    },
  },
  mounted() {
    if (this.docID && this.$store.state.user != null) {
      var docRef = db.collection("cyb590").doc(this.docID);

      docRef.get().then((doc) => {
        if (doc.exists) {
          this.localName = doc.data().name;

          // this.imgURL = `https://cyb590edited.s3-us-west-2.amazonaws.com/${this.localName}`;

          var s3 = new AWS.S3();
          s3.headObject(
            { Bucket: "cyb590edited", Key: this.localName },
            (err) => {
              if (err) this.imgURL = doc.data().photo;
              else
                this.imgURL = `https://cyb590edited.s3-us-west-2.amazonaws.com/${this.localName}`;
            }
          );
        } else {
          alert("No such document!");
        }
      });
    } else {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
<style scoped>
.imgbox {
  display: grid;
  height: 100%;
  position: relative;
}
.center-fit {
  max-width: 100%;
  max-height: 100vh;
  /* max-height: 100%; */
  margin: auto;
}
</style>
