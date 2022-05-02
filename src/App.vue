<template>
  <div class="wrapper">
    <div class="loading" v-if="show"><h2>loading....</h2></div>
      <Comments :comments="comments" :currentUser="currentUser" v-else/>
      <CurrentUser msg="send" :currentUser="currentUser" :img="true"/>
  </div>
</template>

<script>
import get from './composables/getComments'
import getCurrentUser from './composables/getCurrentUser'
import CurrentUser from './components/CurrentUser.vue'
import Comments from './components/Comments.vue'
import { onBeforeMount, onMounted} from '@vue/runtime-core'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    CurrentUser,
    Comments
  },
 setup() {
   const key = 'https://interative.herokuapp.com/comments'
   const keyTwo = 'https://interative.herokuapp.com/currentUser'
   const {load, error, comments} = get(key)
   const show = ref(true)
   const {loadCurrentUser, errorCurrentUser , currentUser} = getCurrentUser(keyTwo)

     onBeforeMount(()=> {
      load()
      loadCurrentUser()
   })

   onMounted(() => {
     setTimeout(()=> {
       show.value = false
     },2200)
   })
  console.log(error, errorCurrentUser)

     return {
     comments,
     currentUser,
     show
   }

  },
}
</script>

<style>
@import '../public/css/style.css';

</style>
