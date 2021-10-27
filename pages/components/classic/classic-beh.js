let classicBeh = Behavior({
    properties: {
        img:String,
        content:String,
        hidden:Boolean
    },
})
export{
    classicBeh
}
// 定义了一个行为
// 就是所有的组件都要使用的属性
// 把三个组件相同的东西 包裹在一个行为中
// 用一个行为来代替每个组件中属性的编写