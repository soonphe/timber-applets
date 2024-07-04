import { getRankingBooks, getRecommendedBooksByUserId } from '../../apis/book'
import { getRecommendedBooklistsByUserId } from '../../apis/booklist'
import { getAdvertList } from '../../apis/advert'
import { showTip } from '../../utils/tip'
import { getUID } from '../../utils/permission'
import { isISBN } from '../../utils/validator'

var app = getApp()
var searchBar // 保存home-search-bar组件的引用

Page({
  data: {
    pageStatus: 'loading', // done, error
    search: {
      focus: false,
      history: []
    },
    ranking: [],
    recommendBooks: {},
    recommendBooklists: {},
    statistics: {
      book_num: 0,
      page_num: 0
    },
    advertList: [],
    typeId: 0,
    // banner
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "../../images/banner_city.png",
          },
          {
            "pic_url": "../../images/banner_subway.png",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_904608692a4d8415d0de39a0a5897e80.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_0f5e43035a8b8d27a4b6f315d222fd9b.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_4ba3d814639ab27570f174467133619f.png&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_91f29509f14ea243958285aaf5d5b640.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_5c752db8097555831469356f5f389078.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          }
        ]
      },
      {
        "banner": [
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_3237b46c5de819816125d88e9d06b7bf.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_c02bce3048058edb194dc3efb230d06b.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_45b3c9ed56aef44994176b50ae5d8a69.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          },
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_95583f54ee857e8fa5f4cf1b9f791a74.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          }
          ,
          {
            "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_95583f54ee857e8fa5f4cf1b9f791a74.jpg&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
          }
        ]
      }
    ],
    hotgoods: [
      {
        "name": "90分轻薄羽绒服",
        "summary": "防钻绒工艺,保暖更锁温,备好深秋暖意",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_9d57f6e89d1f560b7bce31e0b85a7285.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_48ebe9e693ade1766877e0f8adf425f7.png&w=420&h=240&crop=a_90_0_240_240"
      },
      {
        "name": "红米Note 3",
        "summary": "金属机身,指纹解锁,4000mAh大电池",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_d65477ca8db6626da323554e132d7de9.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_c2cf209c66a22818c7f5c269f6bbff12.jpeg&w=420&h=240&crop=a_90_0_240_240",
        "url": "http://home.mi.com/shop/detail?gid=95"
      },
      {
        "name": "小米手机5",
        "summary": "骁龙820处理器,4轴防抖相机",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_34699befd5c2de3a028eb987fea574e9.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_8dec2f08e5dd9d08b440f77a36e39e16.png&w=420&h=240&crop=a_90_0_240_240"
      },
      {
        "name": "小米Max",
         "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_35a026ff12d476496f91d121911af0ce.jpg&crop=a_90_0_240_240",
        "summary": "6.44寸大屏黄金尺寸,买赠智能显示保护套",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_86f01fa8cea034deb1dce44c0385baab.png&w=420&h=240&crop=a_0_120_1080_480&t=png"
      },
      {
        "name": "最生活毛巾",
        "summary": "精选阿瓦提长绒棉,瑞典抗菌科技,3条/包",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_26beb8c609406d060c57b7cdc9d2627f.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_1e29af11fa83139dd305d61cb83c94ac.jpeg&w=420&h=240&crop=a_90_0_240_240"
      },
      {
        "name": "小米空气净化器 2",
        "summary": "全新空气增压系统,净化性能高达 310m³/h",
        "pic_url": "http://static.home.mi.com/app/shop/img?id=shop_0b23f4b364ee73bc86b280cc7397638c.jpg&w=420&h=240&crop=a_90_0_240_240"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // getStorage的返回值可能是 undefined, 而下面要用
    // search.history.filter 方法，因此默认为空数组
    let tmp = wx.getStorageSync('history')
    this.setData({'search.history': tmp || []})
    this._loadPage()
    //初始化用户数据
    // app.getUserInfo(function (userInfo) {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    //   that.update()
    // })
  },

  onReloadPage: function () {
    this._loadPage()
  },

  onReady: function () {
    searchBar = this.selectComponent('#searchBar')
  },

  onPullDownRefresh: function () {
    this._fetchData().then(() => {
      wx.stopPullDownRefresh()
    }).catch(() => {
      wx.stopPullDownRefresh()
    })
  },

  onFocus: function () {
    this.setData({ 'search.focus': true })
  },

  onCancel: function () {
    this.setData({ 'search.focus': false })
  },

  onClickHistoryItem: function (e) {
    showTip('HISTORY').then(() => {
      let value = e.currentTarget.dataset.value
      searchBar.setInputValue(value)
      this._search(searchBar.getSelectedOption(), value)
    })
  },

  onClickTrendingItem: function (e) {
    this._search('书名', e.currentTarget.dataset.title)
  },

  onSearch: function (e) {
    this._search(e.detail.type, e.detail.value)
  },

  onClearHistory: function () {
    wx.showModal({
      title: '清除搜索记录',
      content: '确定清除所有搜索历史？这项操作将无法撤销',
      success: res => {
        if (res.confirm) {
          wx.removeStorage({ key: 'history' })
          this.setData({ 'search.history': [] })
        }
      }
    })
  },

  /**
   * 加载页面
   */
  _loadPage: function () {
    this.setData({pageStatus: 'loading'})
    return this._fetchData().then(() => {
      this.setData({pageStatus: 'done'})
    }).catch(() => {
      this.setData({pageStatus: 'error'})
    })
  },

  /**
   * 搜索图书：设置参数并跳转至图书搜索页
   * @param {String} type   搜索类型
   * @param {String} value  关键字值
   */
  _search: function (type, value) {
    // 去除前后空白符
    value = value.trim()

    // 保存搜索记录
    this._saveHistory(type, value)

    // 页面跳转
    switch (type) {
      case '书名':
      case '作者':
      case '标签':
        wx.navigateTo({
          url: `/pages/list/book?type=search&search_type=${type}&keyword=${encodeURIComponent(value)}`
        })
        break
      case 'ISBN':
        if (isISBN(value)) {
          wx.navigateTo({url: `../book-detail/book-detail?isbn=${value}`})
        } else {
          wx.showModal({content: '请输入正确的13位ISBN', showCancel: false})
        }
        break
      default:
        throw new Error('wrong type: 不支持的搜索类型！')
    }
  },

  /**
   * 获取数据
   */
  _fetchData: function () {
    this.data.typeId = 14
    let { typeId } = this.data
    let params = { typeId }
    return Promise.all([
      // getRecommendedBooksByUserId(getUID()),
      // getRankingBooks(),
      // getRecommendedBooklistsByUserId(getUID()),
      // app.getUserInfo(),
      getAdvertList({
        ...params
        // wechat_user_id: getUID()
      })
    ]).then(res => {
      console.log('获取的广告列表条数：'+res[0].data.length)
      this.setData({
        // 'recommendBooks': res[0].data.map(i => i.book),
        // 'ranking': res[1].data.books,
        // 'recommendBooklists': res[2].data,
        // 'statistics': res[3].reading_statistics
        'advertList': res[0].data
      })
    })
  },

  /**
   * 保存搜索记录，最多保存6个
   * 最新搜索的放在最前面
   */
  _saveHistory: function (type, value) {
    let history = this.data.search.history.filter(v => v !== value)
    history.unshift(value)
    if (history.length > 6) {
      history = history.slice(0, 6)
    }
    this.setData({ 'search.history': history })
    wx.setStorage({
      key: 'history',
      data: history
    })
  }
})
