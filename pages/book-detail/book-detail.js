// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book'
import {
  LikeModel
} from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: '',
    likeStatus: false,
    likeCounts: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里叫做请求数据
    // 当数据量过大时，就需要做一个正在加载的动画和提示
    wx.showLoading({
      title: '正在请求数据',
      mask: true,
    });
    // 通过事件传递函数 获取到前一个页面传来的书籍id
    const bid = options.bid
    // 通过id获取书籍的详情 书籍的评论 以及书籍的点赞状态
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    // 使用Promise的all函数，将所有返回的接口挨个请求 
    // 并且将返回的数据 设置到页面上去渲染数据
    // all中传递的是若干个个promise对象 组成的对象数组
    // 所以数据也是一一对应的 
    // 每一个promise对象的返回值就是数组加上它的序号 例如res[index]
    Promise.all([detail,comments,likeStatus]).then(res=>{
      this.setData({
        book: res[0],
        comments:res[1].comments,
        likeStatus: res[2].like_status,
        likeCounts: res[2].fav_nums
      })
      // 这里叫做结束加载
      wx.hideLoading();
    })
    // detail.then(res => {
    //   this.setData({
    //     book: res
    //   })
    //   console.log(this.data.book)
    // })

    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    //   console.log(this.data.comments)
    // })

    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCounts: res.fav_nums
    //   })
    //   console.log(this.data.likeCounts)
    //   console.log(this.data.likeStatus)
    // })
  },
// 点赞事件
// 先通过事件传递函数 判断传递过来的behavior是什么
// 是取消就将cancel传入接口
// 是喜欢就奖like传入接口
// 这个接口是需要一个行为参数的 服务器会以它作为判断的标准
  onLike(event) {
    const check = event.detail.behavior
    likeModel.like(check, this.data.book.id, 400)
  },
// 点击输入短评
// 控制真正的短评输入框 弹出显示
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  // 点击取消。
  // 控制弹出框隐藏
  onCancel() {
    this.setData({
      posting: false
    })
  },
  // 这个是发送短评的事件
  // 不管是输入框里输入的值 还是点击了标签 都是要将值传递给服务器的
  onPost(event) {
    const comment = event.detail.text || event.detail.value
    // 这个判断是 防止用户将空值的评论传入数据库
    if(!comment){
      return
    }
    // 这里是做一个判断 强行控制用户输入的短评不可以超过12个字
    // 超过既无法提交 并且给出用户提示
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    // 这里是当通过前面的判断之后，就可以调用发表短评的接口
    // 传入书籍的id和评论的内容
    bookModel.postComment(this.data.book.id, comment).then(res => {
      // 提示用户评论成功 +1
        wx.showToast({
          title: '+1',
          icon: 'none'
        })
        // 将显示队列中的第一个替换成现在的内容 数量改为1
        this.data.comments.unshift({
          content:comment,
          nums: 1
        })
        // 关闭评论的输入框和显示框
        // 双向绑定评论数组
        // 使得短评模块的评论也变成最新的
        this.setData({
          comments: this.data.comments,
          posting:false
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