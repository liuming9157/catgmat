var Bmob = require('../../utils/bmob.js');

Page({


  data: {
    choseQuestionBank: '',
    currentUserId: null,
    questionList: [],
    nowQuestion: [],
    nowQuestionNumber: '',
    choseCharacter: '',
    score: 0,
    blank: "blank",
    loading: false,
    userChose: '',
    nodes: []
  },


  onLoad: function() {
    var that = this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank;

    that.setData({
      choseQuestionBank: choseQuestionBank
    });
    wx.setNavigationBarTitle({
      title: that.data.choseQuestionBank,
    })
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var choseQuestionBank = that.data.choseQuestionBank;
    var loadQuestionBank;
    var questionList = new Array();
    var System = Bmob.Object.extend("system");
    var query = new Bmob.Query(System);
    query.get("Kr4u6668", {
      success: function(res) {
        that.setData({
          array: res.attributes.question_type
        })
        var array = res.attributes.question_type

        if (choseQuestionBank == array[0]) {
          loadQuestionBank = "QB1";
        } else if (choseQuestionBank == array[1]) {
          loadQuestionBank = "QB2";
        } else if (choseQuestionBank == array[2]) {
          loadQuestionBank = "QB3";
        } else if (choseQuestionBank == array[3]) {
          loadQuestionBank = "QB4";
        }


        var QuestionBank = Bmob.Object.extend(loadQuestionBank);
        var querySingleQuestionBank = new Bmob.Query(QuestionBank);
        querySingleQuestionBank.find({
          success: function(results) {
            console.log("共查询到 " + results.length + " 条记录");
            for (var i = 0; i < results.length; i++) {
              questionList.push(results[i])
              questionList[i].attributes.userChose = "空";

            }
            var newSingleQuestionList = that.getRandomSingleChoice(questionList, 20);
            console.log(newSingleQuestionList[0])

            that.setData({
              questionList: newSingleQuestionList,
              nowQuestion: newSingleQuestionList[0],
              nowQuestionNumber: 0,

              nodes1: [{
                name: 'div',
                attrs: {
                  class: 'questionTitle'
                },
                children: [{
                    name: 'span',
                    children: [{
                      type: 'text',
                      text: newSingleQuestionList[0].attributes.title[0] + ' '
                    }],
                  },
                  {
                    name: 'span',
                    attrs: {
                      style: 'text-decoration:underline'
                    },
                    children: [{
                      type: 'text',
                      text: newSingleQuestionList[0].attributes.title[1] + ' '
                    }],
                  },
                  {
                    name: 'span',

                    children: [{
                      type: 'text',
                      text: newSingleQuestionList[0].attributes.title[2]
                    }]
                  },
                ]

              }],
              nodes2: [{
                name: 'div',
                attrs: {
                  class: 'questionTitle'
                },
                children: [{
                    name: 'div',
                    children: [{
                      type: 'text',
                      text: newSingleQuestionList[0].attributes.title[0] + ' '
                    }],
                  },
                  {
                    name: 'div',

                    children: [{
                      type: 'text',
                      text: newSingleQuestionList[0].attributes.title[1] + ' '
                    }],
                  },

                ]

              }]
            });
          },
          error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
      },
    });


  },

  //随机获取题目
  getRandomSingleChoice: function(arr, count) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  onShow: function() {

  },

  choseA: function() {
    var that = this;
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer;
    questionList[nowQuestionNumber].attributes.userChose = "A";
    that.setData({
      questionList: questionList
    })






  },


  choseB: function() {
    var that = this;
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer;
    questionList[nowQuestionNumber].attributes.userChose = "B";
    that.setData({
      questionList: questionList
    })





  },

  choseC: function() {
    var that = this;
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer;
    questionList[nowQuestionNumber].attributes.userChose = "C";
    that.setData({
      questionList: questionList
    })





  },

  choseD: function() {
    var that = this;
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer;
    questionList[nowQuestionNumber].attributes.userChose = "D";
    that.setData({
      questionList: questionList
    })






  },
  choseE: function() {
    var that = this;
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer;
    questionList[nowQuestionNumber].attributes.userChose = "E";
    that.setData({
      questionList: questionList
    })






  },

  frontQuestion: function() {
    var that = this;
    var questionList = that.data.questionList;
    var frontQuestionNumber = that.data.nowQuestionNumber - 1;
    that.setData({
      nowQuestion: questionList[frontQuestionNumber],
      nowQuestionNumber: frontQuestionNumber,
      nodes1: [{
        name: 'div',
        attrs: {
          class: 'questionTitle'
        },
        children: [{
            name: 'span',
            children: [{
              type: 'text',
              text: questionList[frontQuestionNumber].attributes.title[0] + ' '
            }],
          },
          {
            name: 'span',
            attrs: {
              style: 'text-decoration:underline'
            },
            children: [{
              type: 'text',
              text: questionList[frontQuestionNumber].attributes.title[1] + ' '
            }],
          },
          {
            name: 'span',

            children: [{
              type: 'text',
              text: questionList[frontQuestionNumber].attributes.title[2]
            }]
          },
        ]

      }],
      nodes2: [{
        name: 'div',
        attrs: {
          class: 'questionTitle'
        },
        children: [{
            name: 'div',
            children: [{
              type: 'text',
              text: questionList[frontQuestionNumber].attributes.title[0] + ' '
            }],
          },
          {
            name: 'div',

            children: [{
              type: 'text',
              text: questionList[frontQuestionNumber].attributes.title[1] + ' '
            }],
          },

        ]

      }]
    })
    console.log(that.data.questionList)
  },

  afterQuestion: function() {
    var that = this;
    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    var afterQuestionNumber = nowQuestionNumber + 1;

    if (questionList[nowQuestionNumber].attributes.userChose == null) {
      questionList[nowQuestionNumber].attributes.answerResult = "blank";
      questionList[nowQuestionNumber].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList,
        nodes1: [{
          name: 'div',
          attrs: {
            class: 'questionTitle'
          },
          children: [{
              name: 'span',
              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[0] + ' '
              }],
            },
            {
              name: 'span',
              attrs: {
                style: 'text-decoration:underline'
              },
              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[1] + ' '
              }],
            },
            {
              name: 'span',

              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[2]
              }]
            },
          ]

        }],
        nodes2: [{
          name: 'div',
          attrs: {
            class: 'questionTitle'
          },
          children: [{
              name: 'div',
              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[0] + ' '
              }],
            },
            {
              name: 'div',

              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[1] + ' '
              }],
            },

          ]

        }]
      })
    } else if (questionList[nowQuestionNumber].attributes.userChose != null) {
      if (questionList[nowQuestionNumber].attributes.userChose == questionList[nowQuestionNumber].attributes.answer) {
        questionList[nowQuestionNumber].attributes.answerResult = 'correct';
        getApp().globalData.score++
      } else {
        questionList[nowQuestionNumber].attributes.answerResult = 'error'
      }
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList,
        nodes1: [{
          name: 'div',
          attrs: {
            class: 'questionTitle'
          },
          children: [{
              name: 'span',
              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[0] + ' '
              }],
            },
            {
              name: 'span',
              attrs: {
                style: 'text-decoration:underline'
              },
              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[1] + ' '
              }],
            },
            {
              name: 'span',

              children: [{
                type: 'text',
                text: questionList[afterQuestionNumber].attributes.title[2]
              }]
            },
          ],
          nodes2: [{
            name: 'div',
            attrs: {
              class: 'questionTitle'
            },
            children: [{
                name: 'div',
                children: [{
                  type: 'text',
                  text: questionList[afterQuestionNumber].attributes.title[0] + ' '
                }],
              },
              {
                name: 'div',

                children: [{
                  type: 'text',
                  text: questionList[afterQuestionNumber].attributes.title[1] + ' '
                }],
              },

            ]

          }]

        }]
      })
    }
    console.log(that.data.questionList),
      getApp().globalData.singleChoiceAnswerNow = that.data.questionList;
  },





  answerCard: function() {
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
      getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },

  overSingleChoice(questionNumber) {
    var that = this;
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList;
    if (questionNumber == 19) {
      wx.redirectTo({
        url: '../result/result'
      });
    }
  },
  over: function() {
    var that = this;
    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    var afterQuestionNumber = nowQuestionNumber + 1;

    if (questionList[nowQuestionNumber].attributes.userChose == null) {
      questionList[nowQuestionNumber].attributes.answerResult = "blank";
      questionList[nowQuestionNumber].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList,

      })
    } else if (questionList[nowQuestionNumber].attributes.userChose != null) {
      if (questionList[nowQuestionNumber].attributes.userChose == questionList[nowQuestionNumber].attributes.answer) {
        questionList[nowQuestionNumber].attributes.answerResult = 'correct';
        getApp().globalData.score++
      } else {
        questionList[nowQuestionNumber].attributes.answerResult = 'error'
      }
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList,
        
        

        
      })
    }
    console.log(that.data.questionList),
      getApp().globalData.singleChoiceAnswerNow = that.data.questionList;
    wx.redirectTo({
      url: '../result/result'
    });

  }

})