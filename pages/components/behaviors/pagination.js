const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: 0,
        noneResult: false,
        loading:false
    },
    methods: {
        // 通过这个方法 ，将拿到的数据进行拼接，拼接后的将新的数据展示到页面上 
        setMoreData(dataArray) {
            const tempArray =
                this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        // 获取当前需要查询的起始点 应该等于的是新数组的长度 
        // 新数组长度为20 就是从第20条记录 开始找服务器剩下的10个数据
        getCurrentStart() {
            return this.data.dataArray.length
        },
        // 设置服务器的数据的总数 用来在下方进行判断
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },
        // 判断是否还有数据需要加载
        // 如果有就加载数据
        // 如果没有数据就停止
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },

        // 初始化数据的方法
        // 页面使用的数据 必须要用setData 
        initialize() {
            this.setData({
                dataArray: [],
                noneResult:false,
                loading:false,
                total: 0
            })
        },
        //是否有锁 
        isLocked() {
            return this.data.loading ? true : false
        },
        // 枷锁
        locked() {
            this.setData({
                loading: true
            })
        },
        // 解锁
        unLocked() {
            this.setData({
                loading: false
            })
        }
    }
})
export {
    paginationBev
}