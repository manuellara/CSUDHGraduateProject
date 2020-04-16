import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";

Vue.config.productionTip = false

// Firebase configuration {CREATE YOUR OWN}
import firebaseConfig from './firebaseconfig'
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// AWS configuration {CREATE YOUR OWN}
var AWS = require('aws-sdk');
var json = require('./awscreds.json')
var parsedJSON = JSON.parse(JSON.stringify(json))
AWS.config.update({
  accessKeyId: parsedJSON.accessKeyId ,
  secretAccessKey: parsedJSON.secretAccessKey ,
  region: parsedJSON.region
});

const check = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    vuetify,
    created() {
      if (user) {
        store.dispatch('autoSignIn', user)
      }
    },
    render: h => h(App)
  }).$mount('#app')
  check()
})

export { db, AWS }
