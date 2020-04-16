<template>
  <v-container>
    <div v-if="this.$store.state.user != null">
      <Userinfo />

      <Body />
    </div>

    <div v-else>
      Please log in
    </div>
  </v-container>
</template>

<script>
import Userinfo from "@/components/Userinfo";
import Body from "@/components/Body";

export default {
  components: {
    Body: Body,
    Userinfo: Userinfo
  },
  data: () => ({}),
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  }
};
</script>
<style scoped>
</style>