// pages/components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:"../image/triangle.dis@left.png",
    leftSrc:"../image/triangle@left.png",
    disRightSrc:"../image/triangle.dis@right.png",
    rightSrc:"../image/triangle@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(){
      // 如果不是最新的  往左是下一期 越来越新
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
      
    },
    onRight(){
      // 如果不是第一期 那么是可以往右查看上一期的
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
