<template>
  <div class="setting">
    <header class="header">
      <router-link to="/app" class="header__button" v-if="this.$store.state.user_name.length != 0">閉じる</router-link>
    </header>
    <div class="bg">
      <main class="container">
        <form class="settingForm">
          <h1 class="settingForm__title">設定</h1>
          <div class="settingForm__block">
            <h2 class="settingForm__subTitle">天気の取得場所</h2>
            <p class="settingForm__text">天気に合わせて変化する持ち物を特定するのに使います。（文章変える）</p>
            <div class="settingForm__selectWrap">
              <select class="settingForm__select" v-model="region">
                <option value="北海道">北海道</option>
                <option value="青森">青森</option>
                <option value="岩手">岩手</option>
                <option value="宮城">宮城</option>
                <option value="秋田">秋田</option>
                <option value="山形">山形</option>
                <option value="福島">福島</option>
                <option value="茨城">茨城</option>
                <option value="栃木">栃木</option>
                <option value="群馬">群馬</option>
                <option value="埼玉">埼玉</option>
                <option value="千葉">千葉</option>
                <option value="東京">東京</option>
                <option value="神奈川">神奈川</option>
                <option value="新潟">新潟</option>
                <option value="富山">富山</option>
                <option value="石川">石川</option>
                <option value="福井">福井</option>
                <option value="山梨">山梨</option>
                <option value="長野">長野</option>
                <option value="岐阜">岐阜</option>
                <option value="静岡">静岡</option>
                <option value="愛知">愛知</option>
                <option value="三重">三重</option>
                <option value="滋賀">滋賀</option>
                <option value="京都">京都</option>
                <option value="大阪">大阪</option>
                <option value="兵庫">兵庫</option>
                <option value="奈良">奈良</option>
                <option value="和歌山">和歌山</option>
                <option value="鳥取">鳥取</option>
                <option value="島根">島根</option>
                <option value="岡山">岡山</option>
                <option value="広島">広島</option>
                <option value="山口">山口</option>
                <option value="徳島">徳島</option>
                <option value="香川">香川</option>
                <option value="愛媛">愛媛</option>
                <option value="高知">高知</option>
                <option value="福岡" selected>福岡</option>
                <option value="佐賀">佐賀</option>
                <option value="長崎">長崎</option>
                <option value="熊本">熊本</option>
                <option value="大分">大分</option>
                <option value="宮崎">宮崎</option>
                <option value="鹿児島">鹿児島</option>
                <option value="沖縄">沖縄</option>
              </select>
            </div>
          </div>

          <div class="settingForm__block">
            <h2 class="settingForm__subTitle">LINE配信</h2>
            <p class="settingForm__text">LINEのトークに持ち物リストが届きます。</p>
            <button class="settingForm__lineButton" type="button">LINEでログイン</button>
          </div>

          <button class="settingForm__button" type="button" @click="post">確定</button>
        </form>
      </main>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import axios from 'axios';

export default {
  data() {
    return {
      region: "沖縄",
      token: this.$route.query.token,
      loading: false,
    }
  },
  methods: {
    post: function() {
      this.loading = true;
      axios
        .post(
          'https://gtb2021teamg.mydns.jp/api/user/region/' + this.region, {}, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then(response => {
          const token = response.data.api_token;
          const name = response.data.user_name;
          const url = response.data.avatar_url;
          this.$store.commit('setToken', token);
          this.$store.commit('setName', name);
          this.$store.commit('setImageUrl', url);
          this.$router.push('app')
          //this.$router.push({name: 'App', params: {name: name, image: image, token: token}})
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    Loading,
  }
}
</script>

<style scoped lang="scss">
.header {
  justify-content: flex-end;
  &__button {
    width: 142px;
    justify-content: flex-start;
    padding: 0 0 0 32px;
    background: #E6E6E6;
    color: #333338;
    position: relative;
    &:hover {
      opacity: 0.8;
    }
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      background: url("../assets/icon_close.png");
      background-size: cover;
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%);
    }
    @media only screen and (max-width: 767px) {
      width: 108px;
      padding: 0 0 0 20px;
      font-size: 16px;
      &::before {
        width: 13px;
        height: 13px;
        right: 16px;
      }
    }
  }
}

.settingForm {
  padding: 40px;
  background: #fff;
  border-radius: 12px;

  &__block {
    margin: 0 0 56px;
    @media only screen and (max-width: 767px) {
      margin: 0 0 40px;
    }
  }

  &__title {
    margin: 0 0 48px;
    font-size: 36px;
    @media only screen and (max-width: 767px) {
      margin: 0 0 24px;
      font-size: 24px;
    }
  }

  &__subTitle {
    margin: 0 0 16px;
    font-size: 28px;
    @media only screen and (max-width: 767px) {
      margin: 0 0 12px;
      font-size: 20px;
    }
  }

  &__text {
    font-size: 24px;
    line-height: 36px;
    @media only screen and (max-width: 767px) {
      font-size: 13px;
      line-height: 24px;
    }
  }

  &__selectWrap {
    position: relative;
    &::before {
      content: "";
      width: 32px;
      height: 32px;
      background: url("../assets/icon_pulldown.png");
      background-size: cover;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
    @media only screen and (max-width: 767px) {
      &::before {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__select {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    border: 2px solid #E6E6E6;
    border-radius: 12px;
    background: #fff;
    font-size: 24px;
    font-family: 'Noto Sans JP', 'Roboto', sans-serif;
    appearance: none;
    &:hover {
      border: 2px solid #818189;
      cursor: pointer;
    }
    &:focus {
      border: 2px solid #818189;
      outline: 0;
    }
    @media only screen and (max-width: 767px) {
      height: 48px;
      padding: 0 16px;
      font-size: 14px;
    }
  }

  &__lineButton {
    display: block;
    width: 274px;
    height: 60px;
    padding: 0 41px 0 0;
    margin: 0 auto;
    border: none;
    border-radius: 16px;
    background: #00C300;
    color: #fff;
    font-weight: bolder;
    font-size: 18px;
    text-align: right;
    position: relative;
    transition: 0.3s ease-out;
    &::before {
      content: "";
      width: 36px;
      height: 36px;
      background: url("../assets/icon_line.png");
      background-size: cover;
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
    }
    &::after {
      content: "";
      width: 2px;
      height: 60px;
      background: #00B300;
      position: absolute;
      top: 0;
      left: 60px;
    }
    &:hover {
      background: #00e000;
      cursor: pointer;
      &::after {
        background: #00c900;
      }
    }
    @media only screen and (max-width: 767px) {
      width: 232px;
      height: 48px;
      padding: 0 33px 0 0;
      font-size: 16px;
      &::before {
        width: 28px;
        height: 28px;
      }
      &::after {
        height: 48px;
        left: 48px;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 57px;
    margin: 0 auto;
    border: none;
    border-radius: 100px;
    background: #598051;
    color: #fff;
    font-size: 18px;
    font-weight: bolder;
    text-decoration: none;
    transition: 0.3s ease-out;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
    @media only screen and (max-width: 767px) {
      width: 72px;
      height: 39px;
      font-size: 16px;
    }
  }
}
</style>