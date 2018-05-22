<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  img {
    max-width: 150px;
  }
  ons-list-item {
    cursor: pointer;
  }
  ons-button {
    color: white;
    font-weight: 600;
  }
</style>

<template>
  <v-ons-toolbar class="home-toolbar">
    <div v-if="navType=='menu'" class="left">
      <v-ons-toolbar-button @click="toggleMenu()">
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
    <div v-if="navType=='brank'" class="left">
    </div> 
    <div v-else-if="navType=='back'" class="left">
      <div v-if="backType=='router'" class="left">
        <!-- <v-ons-back-button modifier="quiet" @click="backHome"><div class="back">戻る</div></v-ons-back-button> -->
        <v-ons-button modifier="quiet" @click="backHome"><div class="back">戻る</div></v-ons-button>
      </div>
      <div v-else class="left">
        <v-ons-back-button>戻る</v-ons-back-button>
      </div>
    </div>
    <div class="center" style="font-size: 15px;font-weight:800;">{{ msg }}</div>
  </v-ons-toolbar>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    msg: {
      default: 'タイトル',
    },
    navType: {
      default: 'menu',
    },
    backType: {
      default: 'onsen',
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMenu', true);
    },
    backHome() {
      this.$router.go(-1);
    },
  },
};
</script>
