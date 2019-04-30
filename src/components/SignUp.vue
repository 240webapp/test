<template>
  <div id = 'signup'>
    <h3>SignUp</h3>
    <p>AnonymousAuthentication</p>
    <input type="text" v-model="teamName" placeholder="Team"/>
    <input type="text" v-model="userName" placeholder="UserName"/>
    <button type="button" class="btn btn-default" @click="login">SignUp</button>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      userName: null,
      teamName: null,
    }
  },
  methods: {
    login(){
      firebase.auth().signInAnonymously().then(e => {
        // ログイン成功
        console.log(e.user.uid)
        let _userInfo = {
          userName : this.userName,
          teamName : this.teamName
        }
        firebase.database().ref('userInfo/'+e.user.uid+'/').set(_userInfo);
      }).catch((error) => {
        // エラーメッセージ
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('エラーメッセージ', errorCode, errorMessage)
      });
    },
    pushData () {
      firebase.database().ref('test/').push({
        name: 'test',
        message: 'foo'
      })
    }
  }
}
</script>

<style scoped>
div#signup{
  background: #99d8d8;
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
</style>
