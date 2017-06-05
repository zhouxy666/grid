<template>
  <div class="table-wrapper">
    <Table :columns="columns" :data="data" :size="small" stripe></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        columns: [
          {
            title: '汇总类型',
            key: 'type',
            width: 100
          },
          {
            title: '盐湖',
            key: 'yhfj',
            width: 60
          },
          {
            title: '河津',
            key: 'hjs',
            width: 60
          },
          {
            title: '永济',
            key: 'yjs',
            width: 60
          },
          {
            title: '临猗',
            key: 'lyx',
            width: 60
          },
          {
            title: '芮城',
            key: 'rcx',
            width: 60
          },
          {
            title: '平陆',
            key: 'plx',
            width: 60
          },
          {
            title: '稷山',
            key: 'jsx',
            width: 60
          },
          {
            title: '万荣',
            key: 'wrx',
            width: 60
          },
          {
            title: '夏县',
            key: 'xx',
            width: 60
          },
          {
            title: '绛县',
            key: 'jx',
            width: 60
          },
          {
            title: '新绛',
            key: 'xjx',
            width: 60
          },
          {
            title: '垣曲',
            key: 'yqx',
            width: 60
          },
          {
            title: '闻喜',
            key: 'wxx',
            width: 60
          },
          {
            title: '运城开发区',
            key: 'ycjjkfq',
            width: 80
          },
          {
            title: '风陵渡开发区',
            key: 'fldkfq',
            width: 80
          },
          {
            title: '空港开发区',
            key: 'kgkfq',
            width: 80
          },
          {
            title: '绛县开发区',
            key: 'jxjjkfq',
            width: 80
          },
          {
            title: '总计',
            key: 'total',
            width: 80
          }
        ],
        data: [
          {
            type: '获证企业数',
            yhfj: 103,
            hjs: 24,
            yjs: 31,
            lyx: 50,
            rcx: 34,
            plx: 16,
            jsx: 73,
            wrx: 17,
            xx: 29,
            jx: 25,
            xjx: 21,
            yqx: 16,
            wxx: 47,
            ycjjkfq: 8,
            fldkfq: 11,
            kgkfq: 29,
            jxjjkfq: 1,
            total: 535
          },
          {
            type: '风险等级（A级）',
            yhfj: 19,
            hjs: 0,
            yjs: 1,
            lyx: 0,
            rcx: 3,
            plx: 3,
            jsx: 7,
            wrx: 3,
            xx: 1,
            jx: 4,
            xjx: 5,
            yqx: 2,
            wxx: 7,
            ycjjkfq: 0,
            fldkfq: 2,
            kgkfq: 3,
            jxjjkfq: 0,
            total: 60
          },
          {
            type: '风险等级（B级）',
            yhfj: 53,
            hjs: 9,
            yjs: 9,
            lyx: 38,
            rcx: 11,
            plx: 8,
            jsx: 27,
            wrx: 10,
            xx: 14,
            jx: 16,
            xjx: 6,
            yqx: 6,
            wxx: 28,
            ycjjkfq: 0,
            fldkfq: 9,
            kgkfq: 17,
            jxjjkfq: 0,
            total: 261
          },
          {
            type: '风险等级（C级）',
            yhfj: 26,
            hjs: 8,
            yjs: 9,
            lyx: 10,
            rcx: 19,
            plx: 3,
            jsx: 34,
            wrx: 4,
            xx: 12,
            jx: 2,
            xjx: 7,
            yqx: 5,
            wxx: 10,
            ycjjkfq: 7,
            fldkfq: 0,
            kgkfq: 6,
            jxjjkfq: 1,
            total: 163
          },
          {
            type: '风险等级（D级）',
            yhfj: 5,
            hjs: 7,
            yjs: 12,
            lyx: 2,
            rcx: 1,
            plx: 2,
            jsx: 5,
            wrx: 0,
            xx: 2,
            jx: 3,
            xjx: 3,
            yqx: 3,
            wxx: 2,
            ycjjkfq: 1,
            fldkfq: 0,
            kgkfq: 3,
            jxjjkfq: 0,
            total: 51
          },
          {
            type: '年产值（亿）',
            yhfj: '9.10',
            hjs: '1.10',
            yjs: '3.90',
            lyx: '1.60',
            rcx: '3.90',
            plx: '0.25',
            jsx: '2.10',
            wrx: '1.50',
            xx: '4.30',
            jx: '0.42',
            xjx: '0.45',
            yqx: '1.40',
            wxx: '1.10',
            ycjjkfq: '0.02',
            fldkfq: '0.63',
            kgkfq: '3.10',
            jxjjkfq: '0.04',
            total: '34.91'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .table-wrapper
    padding 25px
</style>
