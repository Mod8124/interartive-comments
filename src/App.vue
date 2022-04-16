<template>
  <div class="wrapper">
      <Comments :comments="comments" :currentUser="currentUser"/>
      <CurrentUser msg="send" :currentUser="currentUser" :img="true"/>
  </div>
</template>

<script>
import get from './composables/getComments'
import getCurrentUser from './composables/getCurrentUser'
import CurrentUser from './components/CurrentUser.vue'
import Comments from './components/Comments.vue'

export default {
  name: 'App',
  components: {
    CurrentUser,
    Comments
  },
 setup() {
   const key = 'http://localhost:3000/comments'
   const keyTwo = 'http://localhost:3000/currentUser'
   const {load, error, comments} = get(key)
   const {loadCurrentUser, errorCurrentUser , currentUser} = getCurrentUser(keyTwo)
   load()
   loadCurrentUser()
  console.log(error, errorCurrentUser)
   return {
     comments,
     currentUser
   }
  },
}
</script>

<style>
@import '../public/css/style.css';

</style>
