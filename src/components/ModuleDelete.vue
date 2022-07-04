<template>
    <section class="moduleDelete">
        <div class="cardDelete">
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div class="cardBtnDelete">
                <button @click="cancel">NO, Cancel</button>
                <button @click="btnDelete">Yes, delete</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            comments:[]
        }
    },
    props:['id','repliesId','msg','currentUser','cancel'],
    mounted() {
    if(this.id) {
      fetch(`https://interative.herokuapp.com/comments/${this.id}`)
    .then(res => res.json())
    .then(data => this.comments = data)
    .catch(err => console.log(err))
    }
  },
  methods:{
    async  btnDelete() {
          if(this.repliesId && this.id) {

            this.comments.replies = this.comments.replies.filter(reply => {
                if(reply.id === this.repliesId) return
                return reply
            })

            const data = await fetch(`https://interative.herokuapp.com/comments/${this.id}`, {
                method:"PUT",
                body:JSON.stringify(this.comments),
                headers:{"Content-Type":"application/json"}
            })
            const rest = await data.json()
            if(rest) {
                 window.location.reload() 
            }
            
          } else {
              const data = await fetch(`https://interative.herokuapp.com/comments/${this.id}`, {
                    method:"DELETE"
              })
              const rest = await data.json()
              if(rest) {
                     window.location.reload() 
                      }
          }
      },
  }
}
</script>

<style>

</style>