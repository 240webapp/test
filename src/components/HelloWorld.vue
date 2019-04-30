<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <nishio></nishio> -->
    <input type="text" v-model="newMsg" />
    <button @click="update">VuexMsgUpdate</button>
    <!-- <button @click="repeat">repeat</button> -->
    <h2>{{ dbData.dbMsg }}</h2>
    <input type="text" v-model="insertMsg" />
    <button class="saveMemosBtn" @click="saveTest">DBMsgUpdate</button>
    <signup v-if='!isSignUp'></signup>
    <nishio v-if='isSignUp'></nishio>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types';
import SignUp from '@/components/SignUp';
import Nishio from '@/components/Nishio';

export default {
  name: 'HelloWorld',
  components: {
    "signup": SignUp,
    "nishio": Nishio
  },
  data () {
    return {
      isSignUp: false,
      newMsg: null,
      insertMsg: null,
      dbData: {
        dbMsg: null
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch('update', this.newMsg)
    },
    repeat() {
      this.$store.dispatch('repeat')
    },
    saveTest: function() {
      firebase
        .database()
        .ref('mode')
        .set(this.insertMsg);
    },
    getFirebaseData() {
      firebase
        .database()
        .ref('mode')
        .on('value', snapshot => {
          if (snapshot.exists()) {
            this.$set(this.dbData, 'dbMsg', snapshot.val());
          }
        });
    },
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    },
  },
  created () {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // User is signed in.
        console.log('is login.')
        console.log('uid: '+user.uid)
        this.isSignUp = true
      } else {
        // No user is signed in.
        console.log('No user is signed in.')
        this.isSignUp = false
      }
    })
  },
  mounted: function() {
    this.getFirebaseData()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
