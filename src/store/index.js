import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
  msg: 'Vue App Demo',
};

const mutations = {
  [types.UPDATE_MESSAGE](state, newMsg) {
    state.msg = newMsg;
  },
};

const actions = {
  update(context, msg) {
    context.commit(types.UPDATE_MESSAGE, msg);
  },
  repeat(context) {
    let msg = context.state.msg;
    context.commit(types.UPDATE_MESSAGE, `${msg} ${msg}`);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});