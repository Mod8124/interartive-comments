import {ref} from 'vue'

const getCurrentUser = (id)=> {
  const currentUser = ref([]);

  const errorCurrentUser = ref(null);

  const loadCurrentUser = async () => {
      try {
          let data = await fetch(id);
          if(!data.ok) {
              throw Error('Fail, please reload the page ')
          }
          currentUser.value = await data.json();
      }
      catch (err) {
          errorCurrentUser.value = err.message;
      }
  }

  return {loadCurrentUser, errorCurrentUser, currentUser}
}

export default getCurrentUser;