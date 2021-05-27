<template>
  <li class="card" @click="toggleCheck">
    <div class="card__header">
      <p class="card__title" v-bind:class="{'-check': isCheck}">{{title}}</p>
      <span class="circle" v-if="isLoading"><span class="ouro ouro2"><span class="left"><span class="anim"></span></span><span class="right"><span class="anim"></span></span></span></span>
    </div>
    <div class="card__footer">
      <template v-if="type === 0">
        <p class="card__optionTitle -purple">毎日通知</p>
        <p class="card__optionText">紫外線が多い日に通知します</p>
      </template>
      <template v-if="type === 1">
        <p class="card__optionTitle -green">天気で通知</p>
      </template>
    </div>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isCheck: false,
      isLoading: false,
    }
  },
  props: {
    id: Number,
    title: String,
    type: Number,
    check: Boolean,
  },
  methods: {
    toggleCheck: function() {
      this.isLoading = true
      if(this.isCheck === false) {
        this.postCheck();
      }
      else {
        this.postUncheck();
      }
    },
    postCheck: function() {
      axios
        .post(
          'https://gtb2021teamg.mydns.jp/api/check/on/' + this.id, {}, {
          headers: {
            Authorization: `Bearer ${this.$route.query.token}`,
          },
        })
        .then(response => {
          this.isCheck = !this.isCheck;
          console.log("チェックを付けるのに成功");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    postUncheck: function() {
      axios
        .post(
          'https://gtb2021teamg.mydns.jp/api/check/off/' + this.id, {}, {
          headers: {
            Authorization: `Bearer ${this.$route.query.token}`,
          },
        })
        .then(response => {
          this.isCheck = !this.isCheck;
          console.log("チェックを外すのに成功");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created: function() {
    if (this.check) {
      this.isCheck = true
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 126px;
  padding: 0 30px 0 84px;
  margin: 0 0 20px;
  background: #fff;
  border-radius: 12px;
  position: relative;
  //transition: 0.3s ease-out;

  @media only screen and (max-width: 767px) {
    height: 89px;
    padding: 0 30px 0 52px;
  }

  &:hover {
    border: 2px solid #818189;
    cursor: pointer;
  }

  &__header {
    display: flex;
    position: relative;
  }

  &__footer {
    display: flex;
  }

  &__title {
    margin: 0 0 8px;
    font-size: 24px;
    position: relative;
    &::before {
      content: "";
      width: 32px;
      height: 32px;
      background: url("../assets/icon_nocheck.png");
      background-size: cover;
      position: absolute;
      top: 50%;
      left: -52px;
      transform: translateY(-50%);
    }
    &.-check {
      &::before {
        background: url("../assets/icon_check.png");
        background-size: cover;
      }
    }
    @media only screen and (max-width: 767px) {
      padding-left: 5px;
      font-size: 14px;
      &::before {
        width: 24px;
        height: 24px;
        top: 0;
        left: -12px;
        transform: translateX(-100%);
      }
    }
  }

  &__optionTitle {
    margin: 0 16px 0 0;
    font-weight: bolder;

    &.-green {
      color: #598051;
    }
    &.-purple {
      color: #7E559E;
    }
    @media only screen and (max-width: 767px) {
      font-size: 12px;
    }
  }

  &__optionText {
    margin: 0;
    @media only screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
}

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------
.circle {
  position: absolute;
  top: 50%;
  left: -75px;
  transform: translateY(-50%) scale(0.9);
  @media only screen and (max-width: 767px) {
    //top: 0;
    //left: -12px;
    //transform: translateX(-100%);
    top: calc(50% - 1px);
    left: -63px;
    transform: translateY(-50%) scale(0.67);
  }
}

.ouro {
  position: relative;
  display: inline-block;
  height: 46px;
  width: 46px;
  margin: 1em;
  border-radius: 50%;
  background: none repeat scroll 0 0 #E6E6E6;
  /* ベースの色 - 可変 */
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset, 0 0 25px rgba(0, 0, 255, 0.075);
}

.ouro:after {
  content: "";
  position: absolute;
  top: 9px;
  left: 9px;
  display: block;
  height: 28px;
  width: 28px;
  background: none repeat scroll 0 0 #F2F2F2;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
}

.ouro>span {
  position: absolute;
  height: 100%;
  width: 50%;
  overflow: hidden;
}

.left {
  left: 0
}

.right {
  left: 50%
}

.anim {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: none repeat scroll 0 0 #598051;
  /* Ouroborosの色 - 可変 */
  opacity: 0.8;
  -webkit-animation: ui-spinner-rotate-left 3s infinite;
  animation: ui-spinner-rotate-left 3s infinite;
  -webkit-transform-origin: 0 50% 0;
  transform-origin: 0 50% 0;
}

.left .anim {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.right .anim {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  left: -100%;
  -webkit-transform-origin: 100% 50% 0;
  transform-origin: 100% 50% 0;
}


/* v2 */

.ouro2 .anim {
  -webkit-animation-delay: 0;
  animation-delay: 0;
}

.ouro2 .right .anim {
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}


/* v3 */

.ouro3 .anim {
  -webkit-animation-delay: 0s;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  animation-delay: 0s;
  animation-duration: 3s;
  animation-timing-function: linear;
}

.ouro3 .right .anim {
  -webkit-animation-name: ui-spinner-rotate-right;
  -webkit-animation-delay: 0;
  -webkit-animation-delay: 1.5s;
  animation-name: ui-spinner-rotate-right;
  animation-delay: 0;
  animation-delay: 1.5s;
}


/* round variation */

.round .ouro:after {
  display: none
}


/* double variation */

.double .ouro:after {
  height: 13px;
  width: 13px;
  left: 7px;
  top: 7px;
  border: 10px solid #ddd;
  background: transparent;
  box-shadow: none;
}

@keyframes ui-spinner-rotate-right {
  0% {
    transform: rotate(0deg)
  }
  25% {
    transform: rotate(180deg)
  }
  50% {
    transform: rotate(180deg)
  }
  75% {
    transform: rotate(360deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

@keyframes ui-spinner-rotate-left {
  0% {
    transform: rotate(0deg)
  }
  25% {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(180deg)
  }
  75% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

@-webkit-keyframes ui-spinner-rotate-right {
  0% {
    -webkit-transform: rotate(0deg)
  }
  25% {
    -webkit-transform: rotate(180deg)
  }
  50% {
    -webkit-transform: rotate(180deg)
  }
  75% {
    -webkit-transform: rotate(360deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  }
}

@-webkit-keyframes ui-spinner-rotate-left {
  0% {
    -webkit-transform: rotate(0deg)
  }
  25% {
    -webkit-transform: rotate(0deg)
  }
  50% {
    -webkit-transform: rotate(180deg)
  }
  75% {
    -webkit-transform: rotate(180deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  }
}
</style>
