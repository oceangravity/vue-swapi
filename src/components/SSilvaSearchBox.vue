<template>
  <div class="ssilva-input-search__wrapper">
    <input type="text" class="ssilva-input-search__input" ref="input" :value="value" @input="updateValue($event.target.value)">
    <div v-if="!empty" @mousedown="reset" class="ssilva-input-search__cancel"><font-awesome-icon icon="trash-alt"/></div>
    <div v-else class="ssilva-input-search__search-icon"><font-awesome-icon icon="search"/></div>
  </div>
</template>
<script>

export default {

  created () {
  },
  mounted () {
    this.$emit('input', this.$refs.input.value)
  },
  data () {
    return {
      nsPad: '',
      empty: true
    }
  },
  props: {
    value: String
  },
  methods: {
    updateValue (val) {
      this.$emit('input', this.$refs.input.value)
      this.$refs.input.value === '' ? this.empty = true : this.empty = false
    },
    reset () {
      this.$refs.input.value = ''
      this.empty = true
      this.$emit('input', '')
    }
  }
}
</script>
<style lang="scss">

  .ssilva-input-search__wrapper {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas: ". . ." ". . .";
    border: solid 1px #2f5450;
    border-radius: 1px;
    overflow: hidden;
    width: auto;
    background-color: #585858;
    box-shadow: inset 1px 0.5px 10px rgba(28, 35, 39, 0.1), inset 0px -1px rgba(110, 129, 130, 0.1);
    width: 100%;
    height: 100%;
  }

  .ssilva-input-search__input {
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

  .ssilva-input-search__cancel {
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

  .ssilva-input-search__search-icon {
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

  .ssilva-input-search__units:hover {
    background-color: #62777b;
    color: #254146;
    box-shadow: inset -1px -1px rgba(45, 51, 53, 0.66);
  }
</style>
