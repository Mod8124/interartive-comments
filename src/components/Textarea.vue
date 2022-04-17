<template>
        <form @submit.prevent="addReply">
            <textarea v-model="value" :placeholder="'@'+username" v-if="this.msg.match('reply')"></textarea>
            <textarea v-model="valueNoUsername" placeholder="add Comment"  v-if="this.msg.match('send')"></textarea>
             <textarea v-model="valueUpdate" placeholder=""  v-if="this.msg.match('update')"></textarea>
            <div class="formBtn"><button>{{msg}}</button></div>
        </form>
</template>

<script>
export default {
  name: 'Textarea.vue',
  props: ['msg', 'username','id','currentUser','repliesId','usernameMsg'],
  data() {
    return {
      value:`@${this.username}, ` ,
      valueNoUsername:"",
      valueUpdate:this.username !== '' ? `@${this.username}, ${this.usernameMsg}` : `${this.usernameMsg}`,
      date:new Date(),
      comments:[],
    }
  },
  methods:{
   async addReply () {

      const person = {
             content:this.valueNoUsername,
             createdAt:new Date().toDateString() +" ago",
             score:1,
             user:{
             image:{
                    png:this.currentUser.image.png,
                    webp:this.currentUser.image.webp
                  },
             username:this.currentUser.username
                 },
            replies:[]
          }

      if(this.msg.match('send')) {
        this.methodFetch('https://interative.herokuapp.com/comments', "POST", person)
      }

      if(this.msg.match('reply')) {

        const reply = {
             id: '',
            content:this.value.replace(`@${this.username}, `, ""),
            createdAt: new Date().toDateString(),
            score: 1,
            replyingTo: this.username,
            user: {
            image: {
                png:this.currentUser.image.png,
                    webp:this.currentUser.image.webp
                    },
             username:this.currentUser.username
                   }

          }

          if(this.comments.replies.length >= 0) {
            reply.id = this.comments.replies.length+1
           
              this.comments.replies.push(reply)

              if(this.comments) {
                this.methodFetch(`https://interative.herokuapp.com/comments/${this.id}`, "PUT", this.comments)
              }
      }
      }

        if(this.msg.match('update') && this.username !== '') {
        this.comments.replies[this.repliesId-1].createdAt = new Date().toDateString();
      this.comments.replies[this.repliesId-1].content = this.valueUpdate.replace(`@${this.username},`, '')

       if(this.comments) {
         this.methodFetch(`https://interative.herokuapp.com/comments/${this.id}`, 'PUT', this.comments)
       }
      }

      if(this.msg.match('update') && this.username === '') {
        this.comments.createdAt = new Date().toDateString();
        this.comments.content = this.valueUpdate
        if(this.comments) {
          this.methodFetch(`https://interative.herokuapp.com/comments/${this.id}`, "PUT", this.comments)
        }
      }

    },
    async methodFetch(url, method, json) {
          const data = await fetch(url,{
            method:method,
            body:JSON.stringify(json),
            headers:{"Content-Type":"application/json"}
          })
          const res = await data.json()
          if(res) {
            window.location.reload() 
          }
    }


  },
  mounted() {
    if(this.id) {
      fetch(`http://localhost:3000/comments/${this.id}`)
    .then(res => res.json())
    .then(data => this.comments = data)
    .catch(err => console.log(err))
    }
  },

}
</script>

<style scoped>

</style>
