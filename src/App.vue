<template>
  <div class="wrapper">
    <div class="loading" v-if="currentUser.length<1 && comments.length<1"><h2>Loading <span>.</span><span>.</span><span>.</span><span>.</span></h2></div>
      <Comments :comments="comments" :currentUser="currentUser" v-else/>
      <CurrentUser msg="send" :currentUser="currentUser" :img="true"/>
  </div>
</template>

<script>
import get from './composables/getComments'
import getCurrentUser from './composables/getCurrentUser'
import CurrentUser from './components/CurrentUser.vue'
import Comments from './components/Comments.vue'
import { onBeforeMount } from '@vue/runtime-core'


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
   const {loadCurrentUser, errorCurrentUser , currentUser} = getCurrentUser(keyTwo)

 onBeforeMount(()=> {
   load()
   loadCurrentUser()
})
  console.log(error, errorCurrentUser)

     return {
     comments,
     currentUser,
   }

  },
}
</script>

<style>
@import '../public/css/style.css';

</style>
