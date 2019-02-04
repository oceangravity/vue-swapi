<template>
 <div class="ssilva-router-view">
   <div class="ssilva-filters-container">
     <h1>Filter Results</h1>
     <div class="ssilva-filters__input-group">
       <div>Title</div>
       <input type="text" v-model="searchString" @keypress="$SSilva.onlyText($event)">
     </div>
     <div class="ssilva-filters__input-group">
       <div>Episode</div>
       <SSilvaSelectBox ref="selectBoxEpisode" :list="episodes" @change="selectEpisode"></SSilvaSelectBox>
     </div>
     <div class="ssilva-filters__input-group">
       <div>Directors</div>
       <SSilvaSelectBox ref="selectBoxDirectors" :list="directors" @change="selectDirector"></SSilvaSelectBox>
     </div>
     <div style="display: grid; grid-template-columns: .5fr .5fr; grid-column-gap: 10px;">
       <div class="ssilva-filters__input-group">
         <div>From</div>
         <datepicker :value="new Date(1977, 1,  1)" v-model="from" format="yyyy" :minimumView="'year'" :maximumView="'year'" :initialView="'year'"></datepicker>
       </div>
       <div class="ssilva-filters__input-group">
         <div>To</div>
         <datepicker :value="new Date(1977, 1,  1)" v-model="to" format="yyyy" :minimumView="'year'" :maximumView="'year'" :initialView="'year'"></datepicker>
       </div>
     </div>
     <div class="ssilva-filters__reset-button" @mousedown="reset">Reset Filters</div>
   </div>
   <div class="ssilva-results-container">
     <SSilvaGrid :header="header" :data="films" :columns="columns" @select="openDetail"></SSilvaGrid>
   </div>
 </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SSilvaGrid from '../components/SSilvaGrid'
import SSilvaSelectBox from '../components/SSilvaSelectBox'
import Datepicker from 'vuejs-datepicker'
import _orderBy from 'lodash/orderBy'
import _filter from 'lodash/filter'

export default {
  name: 'People',
  components: {
    Datepicker,
    SSilvaGrid,
    SSilvaSelectBox
  },
  data () {
    return {
      searchString: '',
      value: 0,
      selectedEpisode: '',
      selectedDirector: '',
      characteres: [],
      from: '',
      to: '',
      episodes: [
        { id: 0, value: '' },
        { id: 1, value: '1' },
        { id: 2, value: '2' },
        { id: 3, value: '3' },
        { id: 4, value: '4' },
        { id: 5, value: '5' },
        { id: 6, value: '6' },
        { id: 7, value: '7' }
      ],
      directors: [
        { id: 0, value: '' },
        { id: 1, value: 'George Lucas' },
        { id: 2, value: 'Richard Marquand' },
        { id: 3, value: 'Irvin Kershner' },
        { id: 4, value: 'J. J. Abrams' }
      ],
      header: ['Title', 'Episode', 'Director', 'Release Date'],
      columns: [
        { name: 'title' },
        { name: 'episode_id' },
        { name: 'director' },
        {
          name: 'release_date',
          sortBehavior: function (data, column, order) {
            return _orderBy(data, function (obj) {
              return parseInt(obj[column], 10)
            }, [order])
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions(`main`, [
      'SET_FILM',
      'SET_CHARACTERS_FOR_FILM'
    ]),
    selectEpisode (data) {
      this.selectedEpisode = data.value
    },
    selectDirector (data) {
      this.selectedDirector = data.value
    },
    reset () {
      this.$refs.selectBoxEpisode.reset()
      this.$refs.selectBoxDirectors.reset()
      this.searchString = ''
      this.from = ''
      this.to = ''
    },
    async openDetail (row) {
      const me = this
      this.$store.dispatch('ssilva-loading-spinner/show', true)
      me.SET_FILM(row)
      const data = await this.$SSilva.requestCharacters(row.characters)
      await data.forEach(async (item) => {
        me.$store.dispatch('main/SET_CACHE', { request: item.data.url, results: item.data })
      })
      me.SET_CHARACTERS_FOR_FILM(await this.$SSilva.renderCharacters(row.characters))
      this.$store.dispatch('modal-films/show', true)
      this.$store.dispatch('ssilva-loading-spinner/show', false)
    }
  },
  computed: {
    ...mapState(`main`, [
      'results'
    ]),
    planets () {
      return this.results['planets'] === undefined ? [{ id: 1, value: 'Loading...' }] : this.results['planets'].map((planet) => {
        return { id: 1, value: planet.name }
      })
    },
    films () {
      const me = this
      let data = JSON.parse(JSON.stringify(me.results['films'] || []))
      if (me.searchString !== '') {
        data = _filter(data, function (o) {
          return o.title.toLowerCase().includes(me.searchString.toLowerCase())
        })
      }
      if (me.selectedEpisode !== '') {
        data = _filter(data, function (o) {
          return parseInt(o.episode_id) === parseInt(me.selectedEpisode)
        })
      }
      if (me.selectedDirector !== '') {
        data = _filter(data, function (o) {
          return o.director.toLowerCase() === me.selectedDirector.toLowerCase()
        })
      }
      if (me.from !== '' && me.to !== '') {
        data = _filter(data, function (o) {
          return new Date(o.release_date) > me.from && new Date(o.release_date) < me.to
        })
      }
      return data
    }
  }

}
</script>

<style lang="scss">

</style>
