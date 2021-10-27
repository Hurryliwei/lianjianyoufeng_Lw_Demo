// pages/classic-detail/index.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classic = new ClassicModel()
let likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid: Number,
    type: Number
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
    onLoad(options) {
      // this.setData({
      //   cid:options.cid,
      //   type:options.type
      // })
    }
  }
})