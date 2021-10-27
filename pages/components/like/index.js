// pages/components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'../image/like.png',
    noSrc:'../image/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event){
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      // 激活
      // 激活触发这个behavior事件，然后将like或者cancel传到下一个事件的地方
      // 判断这个传来的值 然后进行api获取参数
      let behavior = this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
