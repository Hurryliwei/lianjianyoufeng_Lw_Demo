// pages/components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  // 只要想要slot能用
  // 必须要加上这个属性才可以
  options:{
    multipleSlots: true
  },
  // 这个是追加class用到的属性
  externalClasses:[
    'tag-class'
  ],
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
