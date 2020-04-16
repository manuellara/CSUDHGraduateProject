import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    LOGOUT(state) {
      state.user = null
    }
  },
  actions: {
    autoSignIn({ commit }, payload) {
      commit('SET_USER', payload)
    },
    signIn({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        commit('SET_USER', user)
      }).catch(error => {
        alert(error)
        return
      })
    },
    logout({ commit }) {
      firebase.auth().signOut().then(function () {
        commit('LOGOUT')
      }).catch(function (error) {
        alert(error)
        return
      });
    }
  },
  modules: {
  }
})
