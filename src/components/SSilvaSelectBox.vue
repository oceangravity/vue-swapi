<template>
  <div class="ssilva-input-select__wrapper" @mousedown="check($event)" v-click-outside="close" >
    <div type="text" class="ssilva-input-select__input">{{list[selected].value}}</div>
    <div class="ssilva-input-select__search-icon"><font-awesome-icon icon="angle-down"/></div>
    <div v-if="opened" class="ssilva-input-select__list-wrapper">
      <div v-for="(item, index) in list" v-bind:key="index" @mousedown="selectItem(index)">
        {{item.value}}
      </div>
    </div>
  </div>
</template>
<script>

export default {

  created () {
  },
  mounted () {
  },
  data () {
    return {
      selected: 0,
      opened: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    reset () {
      this.selected = 0
      this.$emit('change', this.list[0])
    },
    setItem (index) {
      this.selected = index
    },
    selectItem (index) {
      this.selected = index
      this.$emit('change', this.list[index])
    },
    close (event, a) {
      this.opened = false
    },
    check (event) {
      if (event.target.classList.contains('ssilva-input-select__list-wrapper')) return false
      this.opened = !this.opened
    }
  }
}
</script>
<style lang="scss">

  .ssilva-input-select__wrapper {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas: ". . ." ". . .";
    border: solid 1px #2f5450;
    border-radius: 1px;
    width: auto;
    background-color: #585858;
    box-shadow: inset 1px 0.5px 10px rgba(28, 35, 39, 0.1), inset 0px -1px rgba(110, 129, 130, 0.1);
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  }

  .ssilva-input-select__input {
    grid-area: 1 / 1 / 3 / 2;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 0 0 15px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    background-color: transparent;
    font-size: 2em;
    font-family: "open sans";
    color: #abb2b3;
    font-weight: 600;
    text-shadow: 1px 1px 1px #394146;
  }

  .ssilva-input-select__cancel {
    grid-area: 1 / 2 / 3 / 3;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    color: #b3b3b3;
    padding: 0 15px;
  }

  .ssilva-input-select__search-icon {
    grid-area: 1 / 3 / 3 / 3;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    color: #b3b3b3;
    padding: 0 15px;
  }

  .ssilva-input-select__units:hover {
    background-color: #62777b;
    color: #254146;
    box-shadow: inset -1px -1px rgba(45, 51, 53, 0.66);
  }

  .ssilva-input-select__list-wrapper {
    position: absolute;
    width: 100%;
    height: auto;
    top: calc(100% + 1px);
    background-color: #354450;
    cursor: pointer;
    z-index: 1;
    max-height: calc(100vh - 300px);
    overflow: hidden;
    overflow-y: auto;

    div {
      display: flex;
      align-items: center;
      min-height: 45px;
      padding: 0 15px;
      color: white;
    }

    div:hover {
      background-color: #586571;
      color: #fcffff;
    }
  }
</style>
