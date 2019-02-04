<template>
  <div class="ssilva-results-grid">
    <div class="ssilva-results-grid__header" v-bind:style="{ 'grid-template-columns': columndDefinition }">
      <div v-for="(item, index) in header" v-bind:key="index" class="ssilva-results-grid__header--column-wrapper" @mousedown="orderBy(index)">
        <div class="ssilva-results-grid__header--cell">{{item}}</div>
        <div class="ssilva-results-grid__header--sort">
          <font-awesome-icon v-if="currentOrder === index" :icon="`angle-${order === 'desc' ? 'down' : 'up'}`"/>
        </div>
      </div>
    </div>
    <div v-bar>
      <div class="ssilva-results-grid__rows">
        <div class="ssilva-results-grid__row-wrapper" v-bind:style="{ 'grid-template-columns': columndDefinition }" v-for="(row, rowIndex) in internalData" v-bind:key="rowIndex" @mousedown="selectRow(rowIndex)">
          <template v-for="(cell, cellIndex) in prepareRow(row)" @mousedown="selectCell(cellIndex)">
            <div v-bind:key="cellIndex" v-bind:style="{ 'grid-area': `1 / ${cellIndex + 1} / 1 / ${cellIndex + 1}` }">{{renderCell(cell)}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _orderBy from 'lodash/orderBy'

export default {

  created () {
  },
  mounted () {
    this.internalData = JSON.parse(JSON.stringify(this.data))
  },
  data () {
    return {
      counter: 0,
      internalData: [],
      order: 'asc',
      currentOrder: null
    }
  },
  watch: {
    data: function (data) {
      this.internalData = JSON.parse(JSON.stringify(data))
    }
  },
  props: {
    columnTemplate: {
      type: String
    },
    header: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    columndDefinition () {
      return this.columnTemplate === undefined ? (this.header.length > 0 ? `${1 / this.header.length}fr `.repeat(this.header.length) : 'auto') : this.columnTemplate
    }
  },
  methods: {
    orderBy (index) {
      this.order = this.order === 'desc' ? 'asc' : 'desc'
      this.currentOrder = index
      this.internalData = this.columns[index].sortBehavior === undefined ? _orderBy(JSON.parse(JSON.stringify(this.internalData)), [this.columns[index].name], [this.order]) : this.columns[index].sortBehavior(this.internalData, this.columns[index].name, this.order)
    },
    selectRow (index) {
      this.$emit('select', this.internalData[index])
    },
    renderCell (cell) {
      let data = cell.data
      if (cell.beforeRender) {
        data = cell.beforeRender(cell.data)
      }
      return data
    },
    prepareRow (row) {
      let arr = []
      this.columns.forEach((column) => {
        arr.push({
          data: row[column.name],
          beforeRender: column.beforeRender
        })
      })
      return arr
    }
  }
}
</script>
<style lang="scss">
  .ssilva-results-grid {
    height: 100vh;
    display: grid;
    grid-template-rows: 30px auto;
    max-height: 100%;

    .ssilva-results-grid__header {
      display: grid;
      background-color: #1d262d;
      color: #7c9ba7;

      div {
        display: grid;
        align-items: center;
        word-break: break-all;
      }

      .ssilva-results-grid__header--column-wrapper {
        grid-template-columns: auto .1fr;
        cursor: pointer;
      }

      .ssilva-results-grid__header--column-wrapper:hover {
        background-color: #3b4e56;
        color: #fff;
      }

      .ssilva-results-grid__header--cell {
        padding: 0 0 0 20px;
        height: 100%;
      }

      .ssilva-results-grid__header--sort {
        justify-content: center;
      }
    }

    .ssilva-results-grid__rows {
      overflow-y: auto;
      max-height: 100%;

      .ssilva-results-grid__row-wrapper {
        display: grid;
        background-color: #353e46;
        color: #a7b9bb;
        min-height: 50px;

        div {
          display: grid;
          position: relative;
          align-items: center;
          padding: 0 20px;
          overflow: hidden;
          word-break: break-all;
        }
      }

      .ssilva-results-grid__row-wrapper:hover {
        background-color: #12212d;
        color: #a9c5c5;
      }
    }

    .ssilva-results-grid__row-layer {
      background-color: aliceblue;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
</style>
