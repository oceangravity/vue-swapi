<template>
  <div id="app">
    <SSilvaLoadingSpinner></SSilvaLoadingSpinner>
    <SSilvaModal max-width="895px" ref="modal-autor">
      <div slot="header" class="modal-header">
        <div class="modal-title">Credits</div>
        <div class="ssilva-modal__header--close-button" @mousedown="closeAutorModal"><font-awesome-icon icon="times"/></div>
      </div>
      <div slot="body" class="modal-body" style="    overflow: hidden;   width: calc(100% + 2000px);    padding: 0px;    margin-left: -1000px;">       <div class="fade"></div>

        <section class="star-wars">
          <div class="crawl">
            <div class="title">
              <p>Episode I</p>
              <h1>SWAPI Test</h1>
            </div>

            <p>Crafted with love by Juan Carlos Galindo Navarro, with Vue, axios, SWAPI, home made custom components (no libraries)</p>

            <p>During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.</p>

            <p>Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy….</p>
          </div>
        </section>
      </div>
    </SSilvaModal>
    <SSilvaModal max-width="895px" ref="modal-films">
      <div slot="header" class="modal-header">
        <div class="modal-title">{{selectedFilm.title}}</div>
        <div class="ssilva-modal__header--close-button" @mousedown="closeFilmsModal"><font-awesome-icon icon="times"/></div>
      </div>
      <div slot="body" class="modal-body">
        <ul>
          <li v-for="(value, propertyName, index) in selectedFilm" v-bind:key="index">
            <span v-if="propertyName === 'homeworld'"><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ Array.isArray(value) ? '' : $SSilva.renderPlanet(value) }}</span></span>
            <span v-else-if="propertyName === 'species'"><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ $SSilva.renderSpecies(value) }}</span></span>
            <span v-else><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ Array.isArray(value) ? '' : value }}</span></span>
            <ul v-if="Array.isArray(value) && propertyName === 'characters'">
              <li v-for="(data, key) in charactersForFilm" v-bind:key="key">
                <span class="ssilva-item-people" @mousedown="openPeople(data.url)" style="color: #b5c5c7">{{ data.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </SSilvaModal>
    <SSilvaModal max-width="895px" ref="modal-people">
      <div slot="header" class="modal-header">
        <div class="modal-title">{{selectedCharacter.name}}</div>
        <div class="ssilva-modal__header--close-button" @mousedown="closePeopleModal"><font-awesome-icon icon="times"/></div>
      </div>
      <div slot="body" class="modal-body">
        <ul>
          <li v-for="(value, propertyName, index) in selectedCharacter" v-bind:key="index">
            <span v-if="propertyName === 'homeworld'"><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ Array.isArray(value) ? '' : $SSilva.renderPlanet(value) }}</span></span>
            <span v-else-if="propertyName === 'species'"><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ $SSilva.renderSpecies(value) }}</span></span>
            <span v-else><span style="text-transform: capitalize">{{ propertyName.replace('_', ' ') }}</span>: <span style="color: #b5c5c7">{{ Array.isArray(value) ? '' : value }}</span></span>
            <ul v-if="Array.isArray(value) && propertyName === 'films'">
              <li v-for="(data, key) in value" v-bind:key="key">
                <span style="color: #b5c5c7">{{ $SSilva.renderFilm(data) }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </SSilvaModal>
    <div class="ssilva-header-background"></div>
    <div class="ssilva-header-logo-container">
      <div class="ssilva-header-logo"></div>
    </div>
    <div class="ssilva-header-searchbox-container">
      <SSilvaSelectBox ref="entitySelector" :list="entities" @change="navigateTo"></SSilvaSelectBox>
      <SSilvaSearchBox v-model="searchString"></SSilvaSearchBox>
    </div>
    <div class="ssilva-header-author-container">
      <SSilvaAuthorIcon></SSilvaAuthorIcon>
    </div>
    <transition name="tool" appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SSilvaModal from './components/SSilvaModal'
import SSilvaAuthorIcon from './components/SSilvaAuthorIcon'
import SSilvaSearchBox from './components/SSilvaSearchBox'
import SSilvaSelectBox from './components/SSilvaSelectBox'
import SSilvaLoadingSpinner from './components/SSilvaLoadingSpinner'
import _debounce from 'lodash.debounce'

export default {
  components: {
    SSilvaModal,
    SSilvaSearchBox,
    SSilvaSelectBox,
    SSilvaAuthorIcon,
    SSilvaLoadingSpinner
  },
  data () {
    return {
      entities: [
        { id: 1, value: 'People' },
        { id: 2, value: 'Films' }
      ],
      entitySelected: 'people',
      searchString: ''
    }
  },
  methods: {
    ...mapActions(`main`, [
      'SET_CHARACTER'
    ]),
    navigateTo (to) {
      this.entitySelected = to.value.toLowerCase()
      this.$router.push(to.value.toLowerCase())
    },
    closePeopleModal () {
      this.$store.dispatch('modal-people/show', false)
    },
    closeFilmsModal () {
      this.$store.dispatch('modal-films/show', false)
    },
    closeAutorModal () {
      this.$store.dispatch('modal-autor/show', false)
    },
    openPeople (url) {
      let data = this.$store.getters['main/getCache'](url)
      this.SET_CHARACTER(data)
      this.$store.dispatch('modal-people/show', true)
    }
  },
  computed: {
    ...mapState(`main`, [
      'results',
      'selectedCharacter',
      'selectedFilm',
      'charactersForFilm'
    ])
  },
  created () {
  },
  async mounted () {
    await this.$SSilva.recursiveFetch('planets')
    await this.$SSilva.recursiveFetch('species')
    await this.$SSilva.recursiveFetch('films')
  },
  watch: {
    searchString: _debounce(function (searchString) {
      this.$SSilva.recursiveFetch(this.entitySelected, searchString)
    }, 500),
    '$route': function (page) {
      this.$refs['entitySelector'].setItem(this.entities.filter(i => {
        return i.value.toLowerCase() === page.name.toLowerCase()
      })[0].id - 1)
    }
  }
}
</script>

<style lang="scss">
  @import 'styles/base';

  .tool-enter-active {
    animation: tool-in .5s;
  }

  .tool-leave-active {
    animation: tool-out .5s;
  }

  @keyframes tool-in {
    0% {
      opacity: 0;
      left: -5%
    }
    100% {
      opacity: 1;
      left: 0%
    }
  }

  @keyframes tool-out {
    0% {
      opacity: 1;
      left: 0%
    }
    100% {
      opacity: 0;
      left: 20%
    }
  }
</style>
