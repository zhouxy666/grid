<template>
  <div>
    <Row :gutter="gutter">
      <Col span="20">
        <Table :columns="column" :data="data" size='small' :highlight-row="true" :height="height"></Table>
      </Col>
      <col span="4">
        <span class="icon icon-arrow-left back" @click.stop="back"></span>
      </col>
    </Row>
    <Modal v-model="showTable" title="日常监管检查要点表" :width="tableWidth" :styles="{top: '20px'}">
      <div  v-bind:style="{height:tableHeight + 'px'}">
        <iframe :src="tableUrl" frameborder="0" width="100%" height="100%"></iframe>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import window from 'window'
  export default {
    mounted() {
      let windowHeight = window.document.documentElement.clientHeight
      let windowWidth = window.document.documentElement.clientWidth
      this.windowHeight = windowHeight
      this.windowWidth = windowWidth
    },
    props: {
      lawData: {
        type: Array,
        default: []
      },
      height: {
        type: Number
      },
      gutter: {
        type: Number
      }
    },
    data() {
      return {
        column: [
          {
            title: '序号',
            key: 'row_num',
            width: 100
          },
          {
            title: '企业名称',
            key: 'Enterprise_Name',
            width: 250,
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    let url = `${params.row.url}?id=${params.row.ID}`
                    this.tableUrl = url
                    this.showTable = true
                  }
                }
              }, params.row.Enterprise_Name)
            }
          },
          {
            title: '所属站所',
            key: 'Department_Name',
            width: 150
          },
          {
            title: '执法表单类型',
            key: 'Law_enforcement_Doc_Title',
            width: 250
          },
          {
            title: '监管类型',
            key: 'Law_enforcement_type_Title',
            width: 150
          },
          {
            title: '检查日期',
            key: 'Create_DataTime',
            width: 200
          }
        ],
        data: [],
        tableUrl: '',
        showTable: false,
        windowHeight: 500,
        windowWidth: 700
      }
    },
    computed: {
      tableHeight() {
        return this.windowHeight * 0.7
      },
      tableWidth() {
        return this.windowWidth * 0.8
      }
    },
    watch: {
      lawData: {
        deep: true,
        handler() {
          this.data = this.lawData
        }
      }
    },
    methods: {
      back() {
        this.$emit('Lawback')
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
