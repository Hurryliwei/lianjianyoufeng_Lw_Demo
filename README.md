### 旧岛小样微信小程序开发 

- ### 自定义组件的追加class

  - 对于自定义的组件，可以追加class，需要在属性中设置一个新的属性externalClasses:['要追加class的名字']；
  - 然后再将其写入wxml文件中，class="XXXX 追加的名字"
  - 这时，调用组件的页面需要在class中传入这个值，并且将这个class对应的样式写到调用页面的wcss中即可！
  - 

  #### 自定义组件的solt插槽

  solt插槽可以灵活的使用，要点如下：

  - 在组件的属性中要添加multipleSlots
  - 在组件的wxml文件中要添加 slot 并且给name一个值
  - 主页面调用要写solt="之前name给的值"

  具体如下代码：

  ```
      <!--组件js文件-->
    externalClasses:[
      'tag-class'
    ],
    options:{
      multipleSlots: true
    },
      <!--组件wxml文件-->
  <view class="text-container tag-class" bind:tap="onTap">
      <text >{{text}}</text>
      <!-- <text >{{num}}</text> -->
      <slot name="after"></slot>
  </view>
      <!--主页面的wxml文件-->
  <v-tag  tag-class="{{tool.highlight(index)}}">
      <text slot="after" class="num">{{'+'+item.nums}}</text>
  </v-tag>
  ```

  ### 组件中WX:IF和hidden的区别

  - 如果需要频繁的切换就需要使用hidden，来提高性能
  - 如果只是存在加载与不加载两种情况其中的一种，那么久使用wx:if
  - 这样不仅是为了性能考虑也是为了提高用户的体验

  #### wx:if和hidden 两者的缺点

  - wx:if 隐藏，不占用空间，兼容性很好
  - hidden： 隐藏，占用空间，但是hidden不支持动态绑定，例如音乐组件，虽然显示了音乐组件但是给其赋值新的src 不可以，永远都是underfined，这就是弊端。 -wx:if 遇到true显示，hidden是遇到false显示 -wx:if 在隐藏时时不会渲染的，但是hidden是渲染了但是不显示，两者有性能的区别。

  示例代码：

  ```
      <v-movie img="{{classicData.image}}" content="{{classicData.content}}" hidden="{{classicData.type!=100}}"></v-movie>
      <v-music img="{{classicData.image}}" content="{{classicData.content}}" src="{{classicData.url}}" title="{{classicData.title}}" wx:if="{{classicData.type==200}}"></v-music>
      <v-essay img="{{classicData.image}}" content="{{classicData.content}}" hidden="{{classicData.type!=300}}"></v-essay>
  ```

  ## 一些学习心得

  1. 首先,要分清楚什么时候用this.data.xxx=ture or false,什么时候用this.setData({})。前者是进行状态改变使用的语法，而后者是进行双向绑定必须的语法，后者需要在接口或者数据改变的时候进行使用，而前者是改变某些状态时候用的方法。
  2. 其次，在小程序的页面中，有最基本的生命周期事件，onshow()初次加载事件，onPullDownRefresh()下拉事件，onReachBottom()页面触底事件，onShareAppMessage()点击分享按钮触发的事件等。其他的方法和事件都是独立编写的 不用编写到其中。
  3. 在小程序的组件中，是由数据和属性以及方法构成的，json中写入用到的组件，组件中可以包括组件，页面中可以包括组件，但是组件中也存在observe数据监听事件，这里是当数据发生变化就立马做出反应的监听函数，可以在小程序的组件中灵活使用。
  4. 在写小程序或者通俗的说，写js代码的时候，要保持良好得习惯，写的代码要可读性很高，尽管是三行代码，也要分清楚这个是什么代码，是逻辑方法还是属性监听方法，或者是应该写到接口中还是写到页面中，又或者是写到主页面还是写到组件中，保持良好得编码习惯尽管是三行代码也要封装成一个函数，保持良好得可读性，这样不仅是自己好维护，复用自己的代码，使得别人也可以一眼看懂你的代码，提高可读性和复用性！
  5. 在写小程序时，要有极强的组件封装意识，有时候，当你写完一个页面你才发现，其实这个页面是可以写成组件的，要记住组件可以当做一个页面来使用，一个页面可能是很多组件组成的，但是当你写成页面再想去复用这个页面当做组件时，就难度比较大了，所以要设计好，尽量使用组件化来开发，代码编写一次可以复用很多次；如果，出现写成页面但是需要复用，那么就只能将页面再一模一样改写一个组件出来，这时候就要注意方法的修改和简化了，没用的方法或者不同的方法可以不要舍弃掉。
  6. 在写小程序或者任何mvvm模型的程序的时候，要有模块化开发的思想，工具类是一个很强大的东西，将api封装到module中，单独编写；将全局都可能用到的js方法，比如过滤器，比如http请求，都可以封装成单独的js文件，导出，这样全局任何一个js都可以引入并且使用其中的方法。
  7. 在小程序中，类的思想是很重要的，不仅是es6中，很多很多mvvm模型中编写类都是很好用的，一个类，包含很多方法，引入类，并且实例化一个类的方法，此时这个实例化的对象就可以调用类中的方法，进行请求等等一系列的操作，这是面向对象编程的核心思想，就是实例化对象，并且调用方法。