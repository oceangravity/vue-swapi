<template>
  <div class="ssilva-loading-spinner" v-show="show">
    <img src="/img/deathstar.gif" alt="Death Star" style="width: 50px;">
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  props: {
    size: {
      default: '40px'
    }
  },
  beforeCreate () {
    const me = this

    if (!me.$store._modules.root._children[`ssilva-loading-spinner`]) {
      me.$store.registerModule(`ssilva-loading-spinner`, {
        namespaced: true,
        state: {
          show: false
        },
        getters: {
          show: state => state.show || false
        },
        actions: {
          show ({ commit }, value) {
            commit('set_show', value)
          }
        },
        mutations: {
          set_show (state, data) {
            state.show = data
          }
        }
      })
    }

    this.$options.computed = {
      ...this.$options.computed,
      ...mapState(`ssilva-loading-spinner`, ['show'])
    }
  },
  computed: {
    styles () {
      return {
        width: this.size,
        height: this.size
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .ssilva-loading-spinner {
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 99999999;
    height: 100vh;
    background-color: #1c252e38;
  }

  .spinner {
    * {
      line-height: 0;
      box-sizing: border-box;
    }
  }

  .spinner > div {
    background-color: #307e6d;
    border-radius: 100%;
    animation-fill-mode: both;
    position: absolute;
    opacity: 0;
    width: 50px;
    height: 50px;
    animation: jumper 1s 0s linear infinite;
  }

  .spinner > div:nth-child(2) {
    animation-delay: 0.33333s;
  }

  .spinner > div:nth-child(3) {
    animation-delay: 0.66666s;
  }

  @keyframes jumper {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    5% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
