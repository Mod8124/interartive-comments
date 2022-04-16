<template>
        <div class="comments" v-for="comment in sortByComment" :key="comment"><!--start comments-->
           <div class="comment"><!--start comment-->
             <div class="score">
               <button @click="comment.score++">+</button>
               <p>{{comment.score}}</p>
               <button @click="comment.score--" v-if="comment.score < 0 ? comment.score === 0 : comment.score">-</button>
             </div>

             <div class="info">

               <div class="infoUser">
                 <div class="infoUserImg">
                   <img :src="comment.user.image.png" :alt="comment.user.image.png">
                 </div>
                 <div class="infoUsername" >
                  <h2>{{comment.user.username}}<span v-if="comment.user.username === currentUser.username">You</span></h2>
                 </div>

                 <div class="infoUserCreated" :id="comment.user.username === currentUser.username ? 'infoUserCreatedM' : '' "><p>{{comment.createdAt}}</p></div>

                 <div class="replyIcon" v-if="comment.user.username !== currentUser.username">
                   <div>
                     <img src="../images/icon-reply.svg" alt="icon_reply" @click="changeShow($event)" :data-reply="comment.id">
                      <p @click="changeShow($event)" :data-reply="comment.id">Reply</p>
                   </div>
                 </div>

                   <div class="replyEditAndDelte"  v-if="comment.user.username === currentUser.username">
                      <div> <img src="../images/icon-delete.svg" alt="icon-delete" @click="changeDeleteCurrentUser($event)" :data-id="comment.id"><p @click="changeDeleteCurrentUser($event)" :data-id="comment.id" >Delete</p></div>
                      <div> <img src="../images/icon-edit.svg" alt="icon-edit" @click="changeEditCurrentUser($event)" :data-id="comment.id"><p @click="changeEditCurrentUser($event)" :data-id="comment.id">Edit</p></div>
                 </div>

               </div>

               <div class="infoComment"><!---start infoComment-->
                     <div class="infoCommentContentOne" :data-id="comment.id">
                        <p>{{comment.content}}</p>
                    </div>

                      <div class="currentUserUpdate" :data-id="comment.id" v-if="comment.user.username === currentUser.username">
                           <CurrentUser :id="comment.id" :username="''" :usernameMsg="comment.content" msg="update" :currentUser="currentUser" :img="false" :updateUser="true"/>
                      </div>

                      <div class="currentUserReplyDelete" v-if="comment.user.username === currentUser.username" :data-id="comment.id">
                           <ModuleDelete  :id="comment.id"  :msg="msgDelete" :currentUser="currentUser" :cancel="cancel" />
                      </div>
               </div><!-- end infoComment-->

             </div>

           </div><!--end Comment-->

               <div class="replyCurrentUser" :data-reply="comment.id">
                       <CurrentUser :id="comment.id" :username="comment.user.username" msg="reply" :currentUser="currentUser" :img="true"/>
                 </div>


           <div class="reply" v-for="replies in comment.replies.sort((a,b)=>a.score > b.score ? -1 : 1)" :key="replies"><!--start reply-->
                <div class="replies" >
                       <div class="score">
               <button @click="replies.score++">+</button>
               <p>{{replies.score}}</p>
               <button @click="replies.score--" v-if="replies.score < 0 ? replies.score === 0 : replies.score">-</button>
             </div>

             <div class="info" style="background=blue">

               <div class="infoUser">

                 <div class="infoUserImg">
                    <img :src="replies.user.image.png" :alt="replies.user.image.png">
                 </div>

                 <div class="infoUsername" >
                  <h2>{{replies.user.username}}  <span v-if="replies.user.username === currentUser.username">You</span></h2>
                 </div>

                 <div class="infoUserCreated"  :id="replies.user.username === currentUser.username ? 'infoUserCreatedM' : '' "><p>{{replies.createdAt}}</p></div>

                 <div class="replyIcon" v-if="replies.user.username !== currentUser.username">
                     <div>
                      <img src="../images/icon-reply.svg" alt="" :data-id="comment.id" :data-replies="replies.id" @click="answerReply($event)">
                      <p :data-id="comment.id" :data-replies="replies.id" @click="answerReply($event)">Reply</p>
                   </div>
                   
                 </div>

                 <div class="replyEditAndDelte"  v-if="replies.user.username === currentUser.username">
                    <div> <img src="../images/icon-delete.svg" alt="icon-delete" @click="btnDelete($event)" :data-id="comment.id" :data-replies="replies.id"><p @click="btnDelete($event)" :data-id="comment.id" :data-replies="replies.id">Delete</p></div>
                      <div> <img src="../images/icon-edit.svg" alt="icon-edit"  @click="changeEdit($event)" :data-id="comment.id" :data-replies="replies.id"><p  @click="changeEdit($event)" :data-id="comment.id" :data-replies="replies.id">Edit</p></div>
                 </div>

               </div>

               <div class="infoComment"><!---start infoComment-->
                    <div class="infoCommentContent" :data-id="comment.id" :data-replies="replies.id">
                        <p><span class="infoCommentContentC">@{{replies.replyingTo}}</span> {{replies.content}}</p>
                    </div>

                   <div class="answerReply" v-if="replies.user.username === currentUser.username" :data-id="comment.id" :data-replies="replies.id">
                       <CurrentUser :repliesId="replies.id" :id="comment.id" :username="replies.replyingTo" :usernameMsg="replies.content" msg="update" :currentUser="currentUser" :img="false"/>
                   </div>

                     <div class="infoCommentReplyDelete" v-if="replies.user.username === currentUser.username" :data-id="comment.id" :data-replies="replies.id">
                       <ModuleDelete :repliesId="replies.id" :id="comment.id"  :msg="msgDelete" :currentUser="currentUser" :cancel="cancel" />
                   </div>

               </div><!-- end infoComment-->

             </div>
                </div>

              <div class="replyCurrentUserTwo" :data-id="comment.id" :data-replies="replies.id" v-if="replies.user.username !== currentUser.username">
                       <CurrentUser :id="comment.id" :username="replies.user.username" msg="reply" :currentUser="currentUser" :img="true"/>
              </div>

           </div><!--end reply-->

        </div><!--end comments-->
</template>

<script>
import CurrentUser from './CurrentUser.vue'
import ModuleDelete from './ModuleDelete.vue'

export default {
  name: 'Comments',
  props: ['comments','currentUser'],
  components:{
  CurrentUser,
  ModuleDelete
  },
  data() {
    return {
      msgDelete:''
    }
  },
  computed:{
    sortByComment() {
      return this.comments.slice(0).sort((a,b)=> a.score > b.score ? -1 : 1)
    },
},
methods :{
  addActive(target) {
    target.style.display = 'block'
   setTimeout(()=> {
      target.classList.add('active')
   },100)
  },
  addDisplayNone(target) {
      target.style.display = 'none'
  },
  changeShow(e) {
   const currentUser = document.querySelector(`.replyCurrentUser[data-reply="${e.target.dataset.reply}"]`)
    this.addActive(currentUser)
  },
  answerReply(e) {
          const currentUser = document.querySelector(`.replyCurrentUserTwo[data-id="${e.target.dataset.id}"][data-replies="${e.target.dataset.replies}"]`)
          this.addActive(currentUser)
  },
  changeEdit(e) {
    const answerReply = document.querySelector(`.answerReply[data-id="${e.target.dataset.id}"][data-replies="${e.target.dataset.replies}"]`)
    const infoCommentContent = document.querySelector(`.infoCommentContent[data-id="${e.target.dataset.id}"][data-replies="${e.target.dataset.replies}"]`);
    this.addActive(answerReply)
    this.addDisplayNone(infoCommentContent)
  },
  btnDelete(e) {
    const answerReply = document.querySelectorAll('.answerReply')
    answerReply.forEach(x => this.addDisplayNone(x))

    const infoCommentContent = document.querySelector(`.infoCommentContent[data-id="${e.target.dataset.id}"][data-replies="${e.target.dataset.replies}"]`);
    this.addDisplayNone(infoCommentContent)

    const infoCommentReplyDelete = document.querySelector(`.infoCommentReplyDelete[data-id="${e.target.dataset.id}"][data-replies="${e.target.dataset.replies}"]`)
    this.addActive(infoCommentReplyDelete)
  },
  cancel() {
    const infoComment = document.querySelectorAll('.infoCommentContent')
    infoComment.forEach(x => this.addActive(x))

    const infoCommentReplyDelete = document.querySelectorAll('.infoCommentReplyDelete')
    infoCommentReplyDelete.forEach(x => this.addDisplayNone(x))

     const currentUserUpdate = document.querySelectorAll(`.currentUserReplyDelete`);
     currentUserUpdate.forEach(x => this.addDisplayNone(x))

    const infoCommentContentOne = document.querySelectorAll('.infoCommentContentOne');
    infoCommentContentOne.forEach(x => this.addActive(x))

  },
 changeEditCurrentUser (e) {
   
    const currentUserReplyDelete = document.querySelectorAll('.currentUserReplyDelete')
    currentUserReplyDelete.forEach(x => this.addDisplayNone(x))

    const currentUserUpdate = document.querySelector(`.currentUserUpdate[data-id="${e.target.dataset.id}"]`);
        this.addActive(currentUserUpdate)

    const infoCommentContentOne = document.querySelector(`.infoCommentContentOne[data-id="${e.target.dataset.id}"]`)
    this.addDisplayNone(infoCommentContentOne)

  },
  changeDeleteCurrentUser (e) {

    const currentUserUpdate = document.querySelectorAll('.currentUserUpdate');
    currentUserUpdate.forEach(x => this.addDisplayNone(x))

    const infoCommentContentOne = document.querySelector(`.infoCommentContentOne[data-id="${e.target.dataset.id}"]`)
    this.addDisplayNone(infoCommentContentOne)

    const currentUserReplyDelete = document.querySelector(`.currentUserReplyDelete[data-id="${e.target.dataset.id}"]`)
    this.addActive(currentUserReplyDelete)
  },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.replyCurrentUser, .replyCurrentUserTwo, .answerReply, .infoCommentReplyDelete, .currentUserUpdate, .currentUserReplyDelete  {
   display: none;
   opacity: 0;
   transition: all 0.4s ease-in-out;
}

.infoCommentReplyDelete.active, .currentUserUpdate.active, .answerReply.active, .replyCurrentUserTwo.active, .replyCurrentUser.active, .currentUserUpdate.active, .currentUserReplyDelete.active, .infoCommentContentOne.active   {
  opacity: 1;
}

</style>
