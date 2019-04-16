var Bmob = require('../../utils/bmob.js');
var app = getApp();
var that;
Page({
  data: {
 
  },

 
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
    that = this;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    
    
    
    var System = Bmob.Object.extend("system");
    var query = new Bmob.Query(System);
    query.get("Kr4u6668", {
      success: function (res) {
        that.setData({
          tel: res.attributes.tel,
          qqgroup:res.attributes.qqgroup
        })
      },
    });
  },
  
  onShow: function () {
  
  },
bindgetuserinfo:function(e){
  this.setData({
    userInfo:e.detail.userInfo
  })
},

  testHistory:function(){
    var currentUserId = that.data.currentUserId;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        
        
        
          wx.navigateTo({
            url: '../testHistory/testHistory'
          })
        
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },

  qd:function(){
wx.navigateTo({
  url: '../qd/qd',
})
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '猫叔GMAT',
      path: '/pages/choiceMain/choiceMain',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  phonecall:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.tel,
    })
  }
 
})