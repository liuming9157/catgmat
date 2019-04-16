var app=getApp();

Page({


  data: {
    choseQuestionBank:''
  },

  onLoad: function () {
    var that=this;
    var choseQuestionBank = app.globalData.choseQuestionBank; 
    that.setData({
      choseQuestionBank: choseQuestionBank
    });
    console.log(that.data.choseQuestionBank),
    wx.setNavigationBarTitle({
      title: that.data.choseQuestionBank,
    })
  },


  onShow: function () {
  
  },

  action: function () {
    var that=this;
    var choseQuestionBank = that.data.choseQuestionBank;
    wx.redirectTo({
      url: '../singleChoiceDetail/singleChoiceDetail?choseQuestionBank=' + choseQuestionBank
    });
  }





})