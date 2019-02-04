<template>
  <div class="ssilva-autor-icon__wrapper" @mousedown="open"></div>
</template>

<script>
export default {
  methods: {
    open () {
      this.$store.dispatch('modal-autor/show', true)
    }
  }
}
</script>

<style lang="scss">
  .ssilva-autor-icon__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #96a5b3;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-image: url(/img/juancarlos.jpg);
    background-position: 50% 50%;
    background-size: contain;
    cursor: pointer;
    transition: all .5s;
  }

  .ssilva-autor-icon__wrapper:hover {
    transform: scale(1.2);
  }

</style>
