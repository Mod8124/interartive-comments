import {ref} from 'vue'

const get = (id)=> {
  const comments = ref([]);

  const error = ref(null);

  const load = async () => {
      try {
          let data = await fetch(id);
          if(!data.ok) {
              throw Error('Fail, please reload the page ')
          }
          comments.value = await data.json();
      }
      catch (err) {
          error.value = err.message;
          console.log(err.message)
      }
  }

  return {load, error, comments}
}

export default get