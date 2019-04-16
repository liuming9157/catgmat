var Bmob = require('../../utils/bmob.js');
var app=getApp();

Page({
  data: {
    choseQuestionBank: "点击选择题型",
    index: 0,
    loading: false,
    currentUserId: '',

  },

  onLoad: function() {
    var user=new Bmob.User();
    var openid=wx.getStorageSync('openid');
    //获取用户信息，可以删除
    var nickname=user.get('nickName');
    if(!nickname){
      wx.getUserInfo({
        success: function (result) {

          var userInfo = result.userInfo;
          var nickName = userInfo.nickName;
          var userPic = userInfo.avatarUrl;
          var u = Bmob.Object.extend("_User");
          var query = new Bmob.Query(u);
          // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
          query.get(user.id, {
            success: function (result) {
              // 自动绑定之前的账号

              result.set('nickName', nickName);
              result.set("userPic", userPic);
              result.set("openid", openid);
              result.save();

            }
          });

        }
      });
    }
    
  },

  onShow: function() {
   var that=this;
    //获取题型设置
    var System = Bmob.Object.extend("system");
    var query = new Bmob.Query(System);
    query.get("Kr4u6668", {
      success: function(res) {
        that.setData({
          array: res.attributes.question_type,
          ad: res.attributes.ad,
          wechat: res.attributes.wechat,
          qq: res.attributes.qq,
          tel: res.attributes.tel,
          qqgroup: res.attributes.qqgroup
        })
        //将题库题型存入globalData中
        app.globalData.array = res.attributes.question_type
      },
    });
    
  },

  bindPickerChange: function(e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value,
      choseQuestionBank: that.data.array[e.detail.value]
    })
  },

  chose: function() {
    var that=this;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function(result) {
  
          var choseQuestionBank = that.data.choseQuestionBank;
          if (choseQuestionBank != "点击选择题型") {
            getApp().globalData.choseQuestionBank = choseQuestionBank;
            getApp().globalData.score = 0;
            wx.navigateTo({
              url: '/pages/singleChoiceExplain/singleChoiceExplain'
            });
          } else if (choseQuestionBank == "点击选择题型") {
            wx.showToast({
              title: '请选择题库',
              image: '../../images/warn.png',
              duration: 2000
            })
          }
        
 
        
        that.setData({
          loading: false
        })
      },
      error: function(object, error) {}
    });
  },


  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '猫叔GMAT',
      path: '/pages/choiceMain/choiceMain',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

})