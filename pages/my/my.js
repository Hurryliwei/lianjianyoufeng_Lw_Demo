// pages/my/my.js
import {ClassicModel} from '../../models/classic'
import {BookModel} from '../../models/book'
const classic = new ClassicModel()
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClick: false,
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  // 获取我喜欢的书的数组
  getMyFavor() {
    classic.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  // 获取喜欢的书籍的数量
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        console.log(res.count)
        this.setData({
          bookCount: res.count
        })
      })
  },
  userAuthorized() {
    // 通过缓存中的状态判断 如果已经拿到了数据就禁止用户点击
    // 并且将拿到的用户的数据 保存 留作使用
    const status = wx.getStorageSync('status')
    const userInfo = wx.getStorageSync('userInfo')
    if(status==='true'){
      console.log('已经授权了')
      this.setData({
        userInfo:userInfo,
        authorized:true,
        canClick:true
      })
    }else{
      console.log('未授权')
      this.setData({
        canClick:false
      })
    }
  },
  onGetUserInfo(event) {
    // 如果已经通过正确的方法  拿到了数据就不需要在让其可以点击了
    if(event.detail != ''){
      console.log('aa')
      wx.setStorageSync(
        "status",
        'true'
      )
    } 
    // 这里是给双向绑定个人信息
    const userInfo = event.detail
    wx.setStorageSync(
      "userInfo",
      event.detail
    )
    // 获取完数据 手动调用 控制头像不可以点击
    this.userAuthorized()
  },
  // 跳转关于我们
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },
  // 跳转到学习
  onStudy(event){
      wx.navigateTo({
        url: '/pages/course/course',
      });
  },
  // 跳转到详情页面
  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url:`/pages/class-detail/class-detail?cid=${cid}&type=${type}`
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