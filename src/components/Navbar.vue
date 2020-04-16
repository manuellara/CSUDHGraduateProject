<template>
  <v-app-bar app color="grey-lighten-4" elevate-on-scroll>
    <router-link to="/">
      <v-img class="mr-2" src="@/assets/dh.png" max-height="50" max-width="50" contain />
    </router-link>

    <v-divider class="mx-4" inset vertical></v-divider>

    <v-toolbar-title>
      <span>{{title}}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tooltip bottom v-for="(x, i) in buttons" :key="i">
      <template v-slot:activator="{ on }">
        <v-btn icon :href="x.link" :target="x.target" v-on="on">
          <v-icon :color="x.color" dark>{{ x.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{x.tooltip}}</span>
    </v-tooltip>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="black">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="googleSignIn">
          <v-list-item-icon>
            <v-icon color="black">mdi-google</v-icon>
          </v-list-item-icon>
          <v-list-item-title>sign-in</v-list-item-title>
        </v-list-item>
        <v-list-item @click="googleSignOut">
          <v-list-item-icon>
            <v-icon color="black">mdi-google</v-icon>
          </v-list-item-icon>
          <v-list-item-title>sign-out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    title: "CYB 590",
    buttons: [
      {
        link:
          "mailto:mlara2@toromail.csudh.edu?subject=CYB 590 - Graduate Project",
        icon: "mdi-gmail",
        target: "_blank",
        tooltip: "Email",
        color: "black"
      },
      {
        link: "https://github.com/manuellara",
        icon: "mdi-github",
        target: "_blank",
        tooltip: "Github",
        color: "black"
      }
    ]
  }),
  methods: {
    googleSignIn() {
      this.$store.dispatch("signIn");
    },
    googleSignOut() {
      this.$store.dispatch("logout");
    }
  }
};
</script>