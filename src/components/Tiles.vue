<template>
  <v-layout row justify-space-around>
    <v-flex xs12 md10>
      <v-card flat>
        <v-container fluid>
          <v-row>
            <v-col v-for="x in thumbnails" :key="x.id" class="d-flex child-flex" :cols="columns">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card flat tile class="d-flex">
                    <v-img :src="x.thumbnail" aspect-ratio="1" class="grey">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute z-index="0" color="grey darken--4">
                        <v-btn
                          outlined
                          fab
                          class="ma-2"
                          :to="{ name: 'image', params: {docID: x.id} }"
                        >
                          <v-icon>mdi-image-size-select-large</v-icon>
                        </v-btn>

                        <v-btn
                          outlined
                          fab
                          class="ma-2"
                          :to="{ name: 'camera', params: {docID: x.id} }"
                        >
                          <v-icon>mdi-face-recognition</v-icon>
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["thumbnails"],
  data: () => ({
    columns: 4
  }),
  mounted() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        this.columns = 12;
        break;
      case "sm":
        this.columns = 12;
        break;
      case "md":
        this.columns = 4;
        break;
      case "lg":
        this.columns = 4;
        break;
      case "xl":
        this.columns = 4;
        break;
    }
  }
};
</script>