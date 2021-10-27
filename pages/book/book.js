// pages/book/book.js
import {
  BookModel
} from '../../models/book'
import {
  random
} from '../../utils/common'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纯粹callback 剥夺了return的权利
    // promise 代码风格 多个异步等待合并 不需要层层传递callback
    // async await ES2017 小程序不支持
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载热门书籍列表
    const hotList = bookModel.getHotList()
    hotList.then(
      res => {
        this.setData({
          books: res
        })
      })
  },
  // 触发事件 点击出现搜索页面
  onSearching() {
    this.setData({
      searching: true
    })
  },
  // 取消搜索页面
  onCancel() {
    this.setData({
      searching: false
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
    this.setData({
      more: random(16)
    })
    // console.log(this.data.more) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})