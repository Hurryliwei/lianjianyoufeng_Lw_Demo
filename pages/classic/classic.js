// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classic = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  // 接口获取到所有的数据在classicData里面
  // latest 是否是最新的一期，是的话 左边下一期的按钮禁用
  // first 是否是第一期，是的话  右边上一期的按钮禁用
  // likeCount 点赞的数量
  // likeStatus  点赞的状态
  data: {
    classicData: '',
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取最新的一期，显示在页面上
  // 并且设置点赞状态 和 点赞的数量
  onLoad: function (options) {
    classic.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  // 点赞事件
  // 定义一个behavior事件
  // 通过判断是cancel还是like来给服务器传递数据
  onLike(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  // 下一期事件
  // 穿下一期的 接口 所需要的参数 next
  onNext(event) {
    this._updateClassic('next')
  },
  // 上一期事件
  // 给接口传入 传入上一期必须要的参数 previous
  onPrevious(event) {
    this._updateClassic('previous')
  },
  // 这里是事件的统一处理函数
  // 先定义index通过这个方式 在缓存中找
  // 如果有就不去接口获取参数 没有这个的话 再去接口中获取
  // 然后这里需要给找到的数据 赋值于对应的 
  // 点赞数量 和 点赞的状态
  _updateClassic(check) {
    let index = this.data.classicData.index
    // 这里的index是对应的数组中数据顺序
    // index+1 就是第几期
    // 在setData中通过res.index来判断是第几期
    // 如果res.index
    classic.getClassic(index, check, (res) => {
      // res.index 是期数
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },
  // 获取点赞的状态 传入id和分类
  // 返回的参数 状态为1 是喜欢
  // 状态为0 是不喜欢
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})