<template>
  <main class="wrapper">
    <section class="loading" v-if="currentUser.length<1 && comments.length<1"><h2>Loading <span>.</span><span>.</span><span>.</span><span>.</span></h2></section>
      <Comments :comments="comments" :currentUser="currentUser" v-else/>
      <CurrentUser msg="send" :currentUser="currentUser" :img="true"/>
  </main>
</template>

<script>
import get from './composables/getComments'
import getCurrentUser from './composables/getCurrentUser'
import CurrentUser from './components/CurrentUser.vue'
import Comments from './components/Comments.vue'
import { onBeforeMount,} from '@vue/runtime-core'
import Urls from './helpers/Urls'

export default {
  name: 'App',
  components: {
    CurrentUser,
    Comments
  },
 setup() {

  const { URLCOMMENTS,URLUSER } = Urls()
  const {load, error, comments} = get(URLCOMMENTS)
  const {loadCurrentUser, errorCurrentUser , currentUser} = getCurrentUser(URLUSER)

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
