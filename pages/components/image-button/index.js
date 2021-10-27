// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  // AppKey: rF98U2h079wAe7JE
  options: {
    multipleSlots: true 
  },
  properties: {
    openType: {
      type: String
    },
    canClick:{
      type:Boolean,
      value:false
    }
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
    // 官方文档中提到的 最适合用来获取用户信息的方法
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          console.log(res)
          const detail = res.userInfo
          this.triggerEvent('userInfo', detail, {})
        },
        fail:res=>{
          
        }
      })
    },
  }
})
