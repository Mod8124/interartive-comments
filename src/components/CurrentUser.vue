<template>
        <div class="currentUser">
          <div class="currentUserImg">
              <img src="../images/avatars/image-juliusomo.png" :alt="currentUser.username" v-if="img">
          </div>

          <div class="post">
              <Textarea :msg="msg" :username="username" :id="id" :currentUser="currentUser" :repliesId="repliesId" :usernameMsg="usernameMsg"/>
          </div>

        </div>
</template>

<script>
import Textarea from './Textarea.vue';

export default {
  name: 'CurrentUser',
  props: ['id','username', 'msg','currentUser','img','edit','repliesId','usernameMsg'],
  components:{
      Textarea
  },
  data() {
    return {
    
    }
  },
  computed:{
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
