<template>
  <v-ons-page>
    <chat-room/>
  </v-ons-page>
</template>

<script>
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import ChatRoom from '../../components/chat-room/ChatRoom'

export default {
  name: 'posts-page',
  
  components: {
    LoadingIndicator,
    ChatRoom
  },

};
</script>
