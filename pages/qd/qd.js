var Bmob = require('../../utils/bmob.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qd:false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var user=new Bmob.User();
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (res) {
        that.setData({
          days: res.attributes.qd,
        })

      },
      error: function (object, error) {
        // 查询失败
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  dayClick: function (e) {
    console.log(e.detail)
  },
  qd:function(){
   wx.showToast({
     title: '签到成功',
   })
    var days=this.data.days;
    this.setData({
      days:days+1,
      qd:true
    });
    var user = new Bmob.User();
    var u = Bmob.Object.extend("_User");
    var query = new Bmob.Query(u);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get(user.id, {
      success: function (result) {
        // 自动绑定之前的账号

        result.set('qd', days+1);
        result.save();
      }
    })
  }
})