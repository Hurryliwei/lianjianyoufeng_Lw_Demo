import {
    HTTP
} from '../utils/http.js'
// 这里的方法 都是用的回调函数的方法 不是promise的方法
class ClassicModel extends HTTP {
    // 获取最新一期的方法
    getLatest(callBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                callBack(res)
                this._setLatestIndex(res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })
    }
    // 获取并且存入缓存的方法
    getClassic(index, check, callBack) {
        // 缓存中寻找 or API 写入到缓存中
        // key 确定Key
        // key只有是 classic-index+1 或者 classic-index-1
        let key = check == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        // value就是获取set的res
        // 一开始的时候 肯定get不到任何classic缓存
        let classic = wx.getStorageSync(key)
        if (!classic) {
            // 所以都是要从服务器里拿

            this.request({
                url: 'classic/' + index + '/' + check,
                success: (res) => {
                    // 并且设置到缓存里
                    // 缓存有一个特点就是不会重复存放
                    wx.setStorageSync(this._getKey(res.index), res)
                    callBack(res)
                }
            })
            // 如果本身缓存里有
            // 那么就把拿到的classic内容 
            // 作为回调的内容返回给这个前端写好的闭包回调函数
            // (res)=>{} 这个(res)=> 就是一个callback回调函数  classic就是res
            // 前端打印的res就是classic
        } else {
            callBack(classic)
        }
    }
    // 获取我喜欢的期刊
    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }
    // 通过ID获取
    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }
    // 设置最新的一期期刊
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    // 获取最新一期期刊的index
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
    // 判断是否是第一期
    isFirst(index) {
        return index == 1 ? true : false
    }
    // 判断是否是最后一期
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    // 获取key
    _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}
export {
    ClassicModel
}