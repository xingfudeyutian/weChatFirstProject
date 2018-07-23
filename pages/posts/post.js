// pages/posts/post.js
var postData = require('../../data/post-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "Sep 18 2016",
    title: "诶呀我滴妈呀",
    post_key: [

    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ postList: postData.postList });
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    console.log("postID:" + postId)
  wx.navigateTo({
    url: 'post-detail/post-detail?id=' + postId,
  })
  },


  onSwiperItemTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})