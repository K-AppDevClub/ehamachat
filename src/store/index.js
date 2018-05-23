import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './modules/userInfo';
import createPlan from './modules/createPlan';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
    createPlan,
  },

  state: {
    menuIsOpen: false,
    roomMessages: [],
    newMessage: {},
    dragObj: {},
    dragPos: {},
    dragStream: {},
  },
  
  mutations: {
    toggleMenu(state, isToggle) {
      if (typeof isToggle !== 'undefined') {
        state.menuIsOpen = isToggle;
      } else {
        state.menuIsOpen = !state.menuIsOpen;
      }
    },

    addMessage(state, data) {
      state.roomMessages.push(data);
      state.newMessage = data;
      console.log(this.World)
    },
    newDragStream(state, data) {
      state.dragStream = data;
    },
    newDragObj(state, obj) {
      state.dragObj = obj;
    },
    changeDragPos(state, position) {
      console.log(position);
      state.dragPos = position;
    },
    initMessage(state, data) {
      state.roomMessages = data;
    },
  },
});
