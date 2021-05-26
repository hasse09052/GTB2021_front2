<template>
  <li class="card" @click="toggleCheck">
    <div class="card__header">
      <p class="card__title" v-bind:class="{'-check': isCheck}">{{title}}</p>
    </div>
    <div class="card__footer">
      <p class="card__optionTitle -green">天気で通知</p>
      <p class="card__optionTitle -purple">毎日通知</p>
      <p class="card__optionText">紫外線が多い日に通知します</p>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isCheck: false,
    }
  },
  props: {
    title: String,
  },
  methods: {
    toggleCheck: function() {
      this.isCheck = !this.isCheck
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
</style>
