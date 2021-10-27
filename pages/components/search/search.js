// pages/components/search/search.js
import {
  KeywordModel
} from '../../../models/keyword'
import {
  BookModel
} from '../../../models/book'
import {
  paginationBev
} from '../behaviors/pagination'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  // 分页的事件
  behaviors: [
    paginationBev
  ],
  // 这里是数据监听 监听这个loadMore函数 
  // 可以监听一个数据 
  // 也可以监听一个函数内部的数据变化
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    value: '',
    loadingCenter: false
  },

  attached() {
    // 获取搜索历史 从缓存中
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
    // 获取热搜关键词 从服务器中
    const hotWords = keywordModel.getHot()
    hotWords.then(res => {
      console.log(res.hot)
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 上拉到底部的加载事件
    loadMore() {
      //  拒绝空值得搜索和加入缓存
      if (!this.data.value) {
        return
      }
      // 拒绝重复加载导致书籍元素重复显示
      if (this.isLocked()) {
        return
      }
      // 通过判断 来使服务器在加载完成后 不会再被前端请求
      if (this.hasMore()) {
        this.locked()
        console.log(this.data.loading)
        setTimeout(() => {
          bookModel.search(this.getCurrentStart(), this.data.value).then(res => {
              this.setMoreData(res.books)
              this.unLocked()
            }, res => {
              this.unLocked()
            })
        }, 3000)
        // bookModel.search(this.getCurrentStart(), this.data.value).then(res => {
        //   this.setMoreData(res.books)
        //   this.unLocked()
        // }, res => {
        //   this.unLocked()
        // })
      }
    },
    // 点击取消的事件
    onCancel(event) {
      this.triggerEvent('cancel', {})
      this.setData({
        value: ''
      })
      this.initialize()
    },
    // 点击图片的X的事件
    onDelete(event) {
      this._closeResult()
      this.initialize()
    },
    // 回车确认搜索事件
    onConfirm(event) {
      // 显示搜索结果的页面
      this._showResult()
      // 加载动画
      this._showLoadingCenter()
      // 初始化数据 
      // 进行赋值 展示数据
      const q = event.detail.value || event.detail.text
      this.setData({
        value: q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    // 显示结果
    _showResult() {
      this.setData({
        searching: true
      })
    },
    // 关闭结果
    _closeResult() {
      this.setData({
        searching: false,
        value: ''
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
  }
})