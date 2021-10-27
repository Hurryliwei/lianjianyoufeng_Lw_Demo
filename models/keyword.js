
import {
    HTTP
} from '../utils/http-p.js'
// 这个tag中使用的关键词的方法
class KeywordModel extends HTTP{
    // 这里是定义KEY 和 
    // tag存入缓存中 缓存数据的长度 最大为10
    key = 'q'
    maxLength = 10
    // 获取搜索历史
    getHistory(){
        // 在缓存中找到key为Q的缓存值
        const words = wx.getStorageSync(this.key)
        if(!words){
            return []
        }
        return words
    }
// 获取热搜 这里需要从服务器来拉取
    getHot(){
        return this.request({
            url: 'book/hot_keyword'
        })
    }
// 这里是添加历史搜索的方法
// 通过调用这个方法 将输入框的红的值先进行判断
// 如果存在就不存
// 如果isHas为false 那么!false就是真的 就是可以存入的 那么久将值存入
// 在存入之前需要判断 如果缓存长度大于10 就不存 不大于10 就可以将新值存入 将旧值删除
    addToHistory(keyword){
        let words = this.getHistory()
        const isHas = words.includes(keyword)
        if(!isHas){
            const length = words.length
            // 缓存长度大于10
            if(length>= this.maxLength){
                // 将其从数组中踢出
                words.pop()
            }
            // 将新的值存入数组中
            words.unshift(keyword)
            // 将新的数组 设置到缓存中 这样下次找到的words一定就是新的
            wx.setStorageSync(this.key, words)
        }
    }

}

export{
    KeywordModel
}