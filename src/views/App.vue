<template>
  <div class="applist">
    <Header v-bind:name="this.$store.state.user_name" v-bind:image="this.$store.state.image_url"/>
    <div class="bg">
      <main class="container">
        <div class="searchWrap">
          <input type="text" placeholder="検索" v-model="search" @input="filter">
        </div>

        <div class="loading" v-if="loading">
          <span class="gauge-loader"></span>
        </div>

        <ul class="list">
          <Card v-for="item in showlist"
                :key="item.id"
                v-bind:id="item.id"
                v-bind:title="item.item_name"
                v-bind:type="item.notification_type_id"
                v-bind:check="'pivot' in item"/>
        </ul>

        <transition>
          <figure class="emptyImg" v-if="isEmpty"><img src="../assets/img_empty.png" alt="持ちものが見つかりませんでした"></figure>
        </transition>

      </main>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";
import axios from 'axios';

export default {
  data() {
    return {
      search: "",
      loading: true,
      itemlist: [],
      showlist: [],
      isEmpty: false,
    }
  },
  methods: {
    filter: function() {
      this.isEmpty = false

      this.showlist = this.itemlist.filter( list => {
        if(list.item_name.indexOf(this.search) === 0){
          return list
        }
      });
      
      if(this.showlist.length === 0) {
        this.isEmpty = true
      }
    },
    getUserInfo: function() {
      if(this.$store.state.user_name.length !== 0) { return }

      axios
        .get(
          'https://gtb2021teamg.mydns.jp/api/user', {
          headers: {
            Authorization: `Bearer ${this.$route.query.token}`,
          },
        })
        .then(response => {
          //const token = response.data.api_token;
          const name = response.data.user_name;
          const url = response.data.avatar_url;
          //this.$store.commit('setToken', token);
          this.$store.commit('setName', name);
          this.$store.commit('setImageUrl', url);
        });
    },
    getItemInfo: function() {
      const token = this.$store.state.token.length !== 0 ? this.$store.state.token : this.$route.query.token;

      axios
        .get(
          'https://gtb2021teamg.mydns.jp/api/item', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          this.itemlist = response.data.items
          this.showlist = Array.from(this.itemlist);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created: function() {
    if(this.$route.query.status === "0") {
      this.$store.commit('setToken', this.$route.query.token);
    }
    this.getUserInfo();
    this.getItemInfo();
  },
  mounted: function() {
    this.showlist = this.itemlist
  },
  components: {
    Header,
    Card,
    Loading,
  }
}
</script>

<style scoped lang="scss">
.searchWrap {
  margin: 0 0 48px;
  position: relative;

  @media only screen and (max-width: 767px) {
    margin: 0 0 24px;
  }

  &::before {
    content: "";
    width: 32px;
    height: 32px;
    border: none;
    background: url("../assets/icon_search.png");
    background-size: cover;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    @media only screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  }

  input {
    width: 100%;
    height: 60px;
    padding: 16px 66px 16px 20px;
    border: 2px solid #E6E6E6;
    border-radius: 12px;
    font-size: 24px;
    font-family: 'Noto Sans JP', 'Roboto', sans-serif;
    &:focus {
      border: 2px solid #818189;
      outline: 0;
    }
    @media only screen and (max-width: 767px) {
      height: 48px;
      font-size: 14px;
    }
  }
}

.list {
  padding: 0;
  margin:  0;
  list-style: none;
}

.emptyImg {
  padding: 0;
  margin: 0 auto;
}

.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 48px 0 0;
  background: none;
  position: absolute;
  top: 50%;
  left: 0;
  transform: scale(1);
}

</style>