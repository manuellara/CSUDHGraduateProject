<template>
  <v-layout my-4 mx-2 justify-space-around>
    <v-layout row wrap justify-center>
      <v-flex xs12 md3>
        <v-layout row justify-center>
          <v-avatar class="ma-3" size="200">
            <v-img :src="userInfo.photoURL"></v-img>
          </v-avatar>
        </v-layout>
      </v-flex>

      <v-flex xs12 md6 align-self-center>
        <h3 class="font-weight-medium d-flex justify-center">{{userInfo.displayName}}</h3>
        <p class="font-weight-light d-flex justify-center">{{userInfo.email}}</p>
        <Uploader />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import Uploader from "@/components/Uploader";
export default {
  components: {
    Uploader: Uploader
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  }
};
</script>
<style scoped>
</style>