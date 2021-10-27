import {
    HTTP
} from "../utils/http";
class LikeModel extends HTTP {
    // 这是点赞事件
    // 传入的是行为 以及 id和分类
    // id和分类是必须要传入的参数
    // 它告诉了我们点赞id号 和 类型
    like(behavior, artID, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            }
        })
    }
    // 这个接口是用来获取喜欢的状态的
    // 这里是传入三个参数 
    // 对象的ID和对象的分类 以及成功的回调函数
    // get方法是有回调函数的 
    // 而post的方法 改变状态即可 可有可无成功的回调函数
    getClassicLikeStatus(artID, category, callBack) {
        this.request({
            url: 'classic/' + category + '/' + artID + '/favor',
            success: callBack
        })
    }
}
export {
    LikeModel
}