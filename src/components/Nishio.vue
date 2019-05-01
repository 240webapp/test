<template>
  <div id = 'nishio'>
    <h4>Hi.</h4>
    <img class="nishio__img" src="../assets/nishio.jpg">
    <button type="button" class="btn btn-default" @click="signOut">SignOut</button>
  </div>
</template>

<script>
import { error } from 'util';
export default {
  name: 'Nishio',
  methods: {
    signOut () {
      firebase.auth().signOut().then(()=>{
        console.log("ログアウトしました");
      }).catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
    }
  }
}
</script>

<style scoped>
div#nishio{
  background: #ffdd80;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 200px;
  height: auto;
}
</style>
