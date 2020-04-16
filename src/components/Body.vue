<template>
  <v-layout my-4 mx-2 justify-space-around>
    <Tiles v-bind:thumbnails="this.thumbnails" />
  </v-layout>
</template>

<script>
import { db } from "../main.js";
import Tiles from "@/components/Tiles";
export default {
  components: {
    Tiles: Tiles
  },
  data: () => ({
    thumbnails: []
  }),
  methods: {
    challenge(payload) {
      console.log(payload);
    }
  },
  created() {
    var unsubscribe = db.collection("cyb590").onSnapshot(
      res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            this.thumbnails.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          }
        });
      },
      () => {
        unsubscribe();
      }
    );
  }
};
</script>

<style scoped>
</style>