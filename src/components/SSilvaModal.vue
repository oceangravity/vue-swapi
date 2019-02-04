<template>
  <transition name="modal">
    <div v-if="show" ref="modal" class="modal-mask" v-on:keyup.esc="close" tabindex="0">
      <div class="modal-wrapper">
        <div class="modal-content" v-bind:style="{maxWidth:maxWidth}">
          <slot name="header">
            <div class="modal-header">
              default header
            </div>
          </slot>
          <slot name="body">
            <div class="modal-body">
              default body
            </div>
          </slot>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

import { mapState } from 'vuex'

export default {
  props: {
    maxWidth: {}
  },
  data () {
    return {
      top: 0
    }
  },
  methods: {
    close (e) {
      const me = this
      me.$emit('update:show', false)
    },
    handleScroll () {
      const me = this
      // :D
      window.scrollTo(0, me.top)
    }
  },
  beforeCreate () {
    const me = this

    if (!me.$vnode.data.ref) {
      console.log(`%c SSilva %c Error: %c El control [Modal] requiere una referencia %c`,
        'background:#6bc4b0 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:red; padding: 1px; border-radius: 0;color: yellow',
        'background:#fff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000', 'background:transparent')
      return
    }

    if (!me.$store._modules.root._children[`${me.$vnode.data.ref}`]) {
      me.$store.registerModule(`${me.$vnode.data.ref}`, {
        namespaced: true,
        state: {
          show: false
        },
        actions: {
          show ({ commit }, data) {
            commit('set_show', data)
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
      ...mapState(`${me.$vnode.data.ref}`, [
        'show'
      ])
    }
  },
  mounted () {
  },
  destroyed () {
    const me = this
    window.removeEventListener('scroll', me.handleScroll, true)
  }
}

</script>
<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: flex;
    vertical-align: middle;
    height: inherit;
    max-height: calc(100%);
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    overflow: hidden;
    color: #555;
    border-width: 0;
    width: 100%;
    max-height: max-content;
    display: flex;
    flex-direction: column;
    background-color: #171717;
    color: #79aac7;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    background-color: #444c4e;
    color: #fff;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    font-size: 2em;
  }

  .modal-footer {
    background-color: #bcdad7;
    bottom: 0;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .modal-title {
    flex: 1;
  }

  .close {
    font-size: 2em;
    padding-top: 6px;
    color: white;
  }

  .modal-body {
    margin: 0;
    height: auto;
    overflow-y: auto;
    padding: 20px;
    max-height: calc(100vh - 400px);
    min-height: 200px;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
