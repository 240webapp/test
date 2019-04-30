<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="newMsg" />
    <button @click="update">update</button>
    <button @click="repeat">repeat</button>
    <h2>{{ dbData.dbMsg }}</h2>
    <input type="text" v-model="insertMsg" />
    <button class="saveMemosBtn" @click="saveTest">save@DB</button>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types';

export default {
  name: 'HelloWorld',
  data () {
    return {
      // msg: 'Firebase&CircleCI Test'
      newMsg: null,
      insertMsg: null,
      dbData: {
        dbMsg: null
      }
    }
  },
  methods: {
    update() {
      this.$store.commit(types.UPDATE_MESSAGE, this.newMsg);
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
    }
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    },
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
