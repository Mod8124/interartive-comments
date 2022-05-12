<template>
  <div class="wrapper">
    <div class="loading" v-if="show || !comments"><h2>Loading <span>.</span><span>.</span><span>.</span><span>.</span></h2></div>
      <Comments :comments="comments" :currentUser="currentUser" v-if="comments && currentUser && !show"/>
      <CurrentUser msg="send" :currentUser="currentUser" :img="true"/>
  </div>
</template>

<script>
import get from './composables/getComments'
import getCurrentUser from './composables/getCurrentUser'
import CurrentUser from './components/CurrentUser.vue'
import Comments from './components/Comments.vue'
import {onMounted} from '@vue/runtime-core'
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

      load()
      loadCurrentUser()


   onMounted(() => {
     if(comments && currentUser) {
       setTimeout(()=>{
         show.value = false
       },1000)
     } 
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
