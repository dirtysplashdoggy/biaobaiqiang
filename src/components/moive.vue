
<template>
  <div>
      moive
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      id:1234444

    };
  },


  created(){
    this.getMoiveData()
  },
  methods: {
    getMoiveData(){
      axios.get(`https://movie.querydata.org/api?id=`+this.id).then(res=>{
        // console.log(res);
        
      })
      // axios.get('https://movie.querydata.org/api/generateimage?id=1302425').then(res=>{
      //   console.log(res);
        
      // })
    }
  }
}

</script>
<style scoped>
</style>