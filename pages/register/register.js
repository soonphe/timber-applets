import { sendCode, checkCode } from '../../apis/user'
import { login } from '../../utils/permission'
import { isPhone, isVrcode } from '../../utils/validator'
import Promise from '../../utils/es6-promise'

var toptip // 保存toptip组件的引用
var toast // 保存toast组件的引用
var sendBtn // 保存send-code组件的引用
var needReturn // 从登录对话框跳转过来时，需要在登录完成后返回上一页

Page({
  data: {
    countries: ['中国(86)'],
    countryIndex: 0,
    phone: '',
    vrcode: ''
  },

  onLoad: function (options) {
    // wx.showModal({
    //   title: '说明',
    //   content: "本项目是一个开源项目，数据均为随机生成，仅供演示使用。",
    //   showCancel: false
    // })
    needReturn = options.need_return
  },

  onReady: function () {
    toptip = this.selectComponent('#toptip')
    toast = this.selectComponent('#toast')
    sendBtn = this.selectComponent('#send-btn')
  },

  onCountryChange: function (e) {
    this.setData({countryIndex: e.detail.value})
  },

  onInput: function (e) {
    var params = {}
    params[e.currentTarget.dataset.label] = e.detail.value
    this.setData(params)
  },

  onSend: function () {
    if (!isPhone(this.data.phone)) {
      return toptip.show('手机号格式不正确')
    }
    sendBtn.prepare()
    sendCode(this.data.phone).then(() => {
      toast.show('验证码将以短信的形式发送至您的手机')
      sendBtn.start()
    }).catch(() => sendBtn.stop())
  },

  onSubmit: function () {
    let { phone, vrcode } = this.data
    // 跳过格式校验
    // if (!isPhone(phone)) {
    //   toptip.show('手机号格式不正确')
    //   return
    // }
    // if (!isVrcode(vrcode)) {
    //   toptip.show('请输入6位数字验证码')
    //   return
    // }
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    // 跳过api校验
    wx.redirectTo({ url: './children/result' })
    // checkCode(phone, vrcode).then(res => {
    //   if (!login(res.data.token, res.data.user)) {
    //     return Promise.reject(new Error('设置登录态失败'))
    //   }

    //   // 201：创建了新的用户 200：登录成功
    //   if (res.statusCode === 201) {
    //     wx.redirectTo({ url: './children/result' })
    //   } else if (needReturn) {
    //     wx.navigateBack()
    //   } else {
    //     wx.switchTab({ url: '/pages/home/home' })
    //   }
    // }).finally(() => {
    //   wx.hideToast()
    // })
    // 调用微信获取登录凭证
    wx.login({
      success: function (res) {
        console.log('微信授权成功'+'code值:'+res.code)
        wx.getUserInfo({
          success: function (res) {
            console.log('微信授权成功'+'code值:'+res.code+',nickName:'+res.userInfo.nickName)
            // that.globalData.userInfo = res.userInfo;
            // typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    });
  }
})
