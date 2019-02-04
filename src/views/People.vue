<template>
  <div class="ssilva-router-view">
    <div class="ssilva-filters-container">
      <h1>Filter Results</h1>
      <div class="ssilva-filters__input-group">
        <div>Name/Specie</div>
        <input type="text" v-model="searchString" @keypress="$SSilva.onlyText($event)">
      </div>
      <div class="ssilva-filters__input-group">
        <div>Planets</div>
        <SSilvaSelectBox ref="selectBoxPlanets" :list="planets" @change="selectPlanet"></SSilvaSelectBox>
      </div>
      <div class="ssilva-filters__input-group">
        <div>Gender</div>
        <SSilvaSelectBox ref="selectBoxGender" :list="gender" @change="selectGender"></SSilvaSelectBox>
      </div>
      <div style="display: grid; grid-template-columns: .5fr .5fr; grid-column-gap: 10px;">
        <div class="ssilva-filters__input-group">
          <div>From</div>
          <input type="text" v-model="from" @keypress="$SSilva.onlyNumber($event)" style="padding: 0; text-align: center;">
        </div>
        <div class="ssilva-filters__input-group">
          <div>To</div>
          <input type="text" v-model="to" @keypress="$SSilva.onlyNumber($event)" style="padding: 0; text-align: center;">
        </div>
      </div>
      <div class="ssilva-filters__reset-button" @mousedown="reset">Reset Filters</div>
    </div>
    <div class="ssilva-results-container">
      <SSilvaGrid :header="header" :data="people" :columns="columns" @select="openDetail"></SSilvaGrid>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SSilvaGrid from '../components/SSilvaGrid'
import SSilvaSelectBox from '../components/SSilvaSelectBox'
import _orderBy from 'lodash/orderBy'
import _filter from 'lodash/filter'

export default {
  name: 'People',
  components: {
    SSilvaGrid,
    SSilvaSelectBox
  },
  data () {
    return {
      from: '',
      to: '',
      searchString: '',
      gender: [
        {
          id: 0,
          value: ''
        },
        {
          id: 1,
          value: 'Male'
        },
        {
          id: 2,
          value: 'Female'
        }
      ],
      selectedGender: '',
      selectedPlanet: '',
      header: ['Name', 'Species', 'Homeworld', 'Gender', 'Birth Year'],
      columns: [
        { name: 'name' },
        {
          name: 'species',
          beforeRender: this.$SSilva.renderSpecies
        },
        {
          name: 'homeworld',
          beforeRender: this.$SSilva.renderPlanet
        },
        { name: 'gender' },
        {
          name: 'birth_year',
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
      'SET_CHARACTER'
    ]),
    openDetail (row) {
      this.SET_CHARACTER(row)
      this.$store.dispatch('modal-people/show', true)
    },
    selectPlanet (data) {
      this.selectedPlanet = data.value
    },
    selectGender (data) {
      this.selectedGender = data.value
    },
    reset () {
      this.$refs.selectBoxPlanets.reset()
      this.$refs.selectBoxGender.reset()
      this.searchString = ''
      this.from = ''
      this.to = ''
    }
  },
  computed: {
    ...mapState(`main`, [
      'results',
      'selectedCharacter'
    ]),
    planets () {
      let planets = this.results['planets'] === undefined ? [{
        id: 1,
        value: 'Loading...'
      }] : this.results['planets'].map((planet) => {
        return {
          id: 1,
          value: planet.name
        }
      })
      planets.unshift({
        id: 0,
        value: ''
      })
      return planets
    },
    people () {
      const me = this
      let data = JSON.parse(JSON.stringify(me.results['people'] || []))
      if (me.searchString !== '') {
        data = _filter(data, function (o) {
          return o.name.toLowerCase()
            .includes(me.searchString.toLowerCase()) || me.$SSilva.renderSpecies(o.species)
            .toLowerCase()
            .includes(me.searchString.toLowerCase())
        })
      }
      if (me.selectedPlanet !== '') {
        data = _filter(data, function (o) {
          return me.$SSilva.renderPlanet(o.homeworld)
            .toLowerCase() === me.selectedPlanet.toLowerCase()
        })
      }
      if (me.selectedGender !== '') {
        data = _filter(data, function (o) {
          return o.gender.toLowerCase() === me.selectedGender.toLowerCase()
        })
      }
      if (me.from !== '' && me.to !== '') {
        data = _filter(data, function (o) {
          return o.birth_year !== 'unknown' && parseInt(o.birth_year) > parseInt(me.from) && parseInt(o.birth_year) < parseInt(me.to)
        })
      }
      return data
    }
  }

}
</script>

<style lang="scss">

</style>
