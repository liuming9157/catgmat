var Bmob = require('utils/bmob.js');
Bmob.initialize("f743ad8c6d4ff715c7c6d964eec9fbcc", "86fe59d9d7eb4b309b2e4060c3ec2928");
 
App({
  onLaunch: function () {
    var that = this;
    var user = new Bmob.User(); //开始注册用户
    wx.login({
      success: function (res) {
        console.log(res)
        //用code换取openid
        user.loginWithWeapp(res.code).then(function (user) {
          var openid = user.get("authData").weapp.openid;
          wx.setStorageSync('openid', openid);
        }, function (err) {
          console.log(err, 'errr');
        });

      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      },
      timeout: function (res) {
        console.log(res)
      }
    });

  },
  //获取用户信息并存入globaData
  getUserInfo: function (cb) {
    var that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: { 
    userInfo: null,
    singleChoiceAnswerNow:[],
    choseQuestionBank:'',
    score:0,
    array:'',

  }
})