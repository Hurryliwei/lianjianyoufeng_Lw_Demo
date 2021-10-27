import {
    HTTP
} from '../utils/http-p.js'


class BookModel extends HTTP {
    // 获取书籍的热门列表
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
// 获取书籍的点赞数量
    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }
// 获取书籍的详细信息
    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }
// 获取书籍的点赞状态
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }
// 获取短评
    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }
// 添加评论
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
// 搜索的方法
    search(start, q){
        return this.request({
            url: 'book/search?summary=1&&count=10',
            data: {
                start: start,
                q: q
            }
        })
    }
}
export {
    BookModel
}