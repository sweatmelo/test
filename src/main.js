import Vue from 'vue'
import App from './App'
//import WXrequest  from '@/utils/wx-request'
//Vue.prototype.$httpWX = WXrequest;
Vue.config.productionTip = false
App.mpType = 'app'
wx.authorize({
	scope: "scope.userLocation",
	success: function() {},
	fail: function() {
		wx.showToast({
			title: '您未授权定位，功能将无法使用',
			duration: 1000,
			icon: 'none'
		});
	}
})
wx.authorize({
	scope: "scope.record",
	success: function() {},
	fail: function() {
		wx.showToast({ 
			title: '您未授权录音，功能将无法使用',
			duration: 1000,
			icon: 'none'
		});
	}
})
const app = new Vue(App)
app.$mount()
