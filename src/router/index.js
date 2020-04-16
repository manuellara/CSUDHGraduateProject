import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CameraView from '@/components/CameraView'
import ImageView from '@/components/ImageView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/camera/:docID',
    name: 'camera',
    component: CameraView,
    props: true
  },
  {
    path: '/image/:docID',
    name: 'image',
    component: ImageView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
