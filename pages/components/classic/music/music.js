// pages/components/classic/music/music.js
import {classicBeh} from '../classic-beh'
let mMgr = wx.getBackgroundAudioManager()
// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)
Component({
  /**
   * 组件的属性列表
   */
   behaviors:[classicBeh],
   properties: {
      src:String,
      title:String
   },

  /**
   * 组件的初始数据
   */
  data: {
    playing:Boolean,
    pauseSrc:"../../image/player@pause.png",
    playSrc:"../../image/player@play.png"
  },
  attached(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    onPlay(event){
      let mMgr = wx.getBackgroundAudioManager()
      if(!this.data.playing){
        this.setData({
          playing:true,
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return 
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },

    _monitorSwitch(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
