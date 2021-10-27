// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      // 这里是重点，
      // 当定义了对象
      // 并且对象后面直接跟上['key']
      // 那么打印输出的就是key对应的value值
      // 这里类似于解构赋值 反正就是可以直接赋值【key】对应的新值给 typeText
      observer: function (newVal) {
        if (newVal) {
          // 直接定义对象和数组然后直接进行结构赋值
          // 这里每当有新的值传进来 就进行判断是100 还200 将对应的text赋值给typeText
          // 然后进行双向绑定将值给与typeText 显示到小程序上
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          }
          [newVal.type]
        }
        this.setData({
          typeText:typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      }, {})
    }
  }
})