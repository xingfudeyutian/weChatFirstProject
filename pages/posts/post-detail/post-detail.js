// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/post-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isPlayingMusic : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.data.currentPostId = postId;
    this.setData({
      postData: postData
    });
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        });
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
    this.setData({
      isPlayingMusic: true
    })
  }

    this.setAudioMonitor();
  },

  setAudioMonitor: function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;

    });
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // this.showModal(postsCollected, postCollected);
    this.showToast(postsCollected, postCollected);
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected? '收藏改文章':'取消收藏改文章',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },


  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  },

  onShareTap: function (event) {
    var itemList =[
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到空间'
    ]
  wx.showActionSheet({
    itemList: itemList,
    itemColor:'#405f80',
    success:function(res){
      //res.cancel
      //res.tapIndex
      wx.showModal({
        title: '用户'+itemList[rex.tapIndex],
        content: '',
      })
    }
  })
  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      })
    }else
    {
      wx.playBackgroundAudio({
        dataUrl: postData.music.dataUrl,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl,
      })
      this.setData({
        isPlayingMusic : true
      })

    }
  }
})