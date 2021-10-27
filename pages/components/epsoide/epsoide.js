// pages/components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      // 不要再observer中修改自己属性的值
      // 这是数据监听的
      // 当值发生变化了 就立马val变成新的值
      // 再去双向绑定函数
      observer(newValue,oldValue){
        let val = newValue<10?'0'+newValue : newValue 
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
      '十二月'
    ],
    _index:'',
    year:'',
    month:''
  },
  // 当节点载入的时候 调用这个方法
  attached(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
