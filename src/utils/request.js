// 引入axios
import Vue from 'vue'
import axios from 'axios';
// import { Message } from 'element-ui'

// axios配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://test-erp.hualumedia.com/api/v2/'


//http request 
axios.interceptors.request.use(
	config => {
		// let roleId = sessionStorage.getItem('roleId')
		// config.headers['Org-Id'] = 2
		// 配置公共请求头Authorization
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.error) {
			// if(response.data.error.code === 900009){
			// 	window.location = '/login'
			// 	sessionStorage.clear()
			// 	return Message.warning({
			// 		message: '登录超时：请重新登录',
			// 		type: 'warning'
			// 	})
			// }
		}
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
	// return response
}, err => {
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				console.log('错误请求')
				break;
			case 401:
				sessionStorage.clear();
				window.location = '/login'
				break;
			case 403:
				window.location = '/403'
				console.log('无权限访问')
				break;
			case 404:
				// window.location = '/404'
				console.log('请求错误,未找到该资源')
				break;
			case 405:
				console.log('请求方法未允许')
				break;
			case 408:
				console.log('请求超时')
				break;
			case 500:
				console.log(`服务器端出错`)
				break;
			case 501:
				console.log('网络未实现')
				break;
			case 502:
				console.log('网络错误')
				break;
			case 503:
				console.log('服务不可用')
				break;
			case 504:
				console.log('网络超时')
				break;
			case 505:
				console.log('http版本不支持该请求')
				break;

			default:
				console.log(`连接错误${err.response.status}`)
		}
	} else {
		console.log('连接到服务器失败')
	}
	return Promise.resolve(err.response)
})

export default {
	/**
	 * 封装get方法
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	get(url, headers = {}, params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
					headers,
					params: params.params
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	/**
	 * 封装post请求
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	typearr: {
		'json': 'application/json;charset=UTF-8',
		'form': 'application/x-www-form-urlencoded'
	},
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.post(  url,
					params
				)
				.then(response => {
					resolve(response.data);
				}, err => {
					reject(err)
				})
		})
	},
	/**
	 * 封装patch请求
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	patch(url, data = {}) {
		return new Promise((resolve, reject) => {
			axios.patch(url, data)
				.then(response => {
					resolve(response.data);
				}, err => {
					reject(err)
				})
		})
	},
	/**
	 * 封装put请求
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	put(url, data = {}) {
		return new Promise((resolve, reject) => {
			axios.put(url, data)
				.then(response => {
					resolve(response.data);
				}, err => {
					reject(err)
				})
		})
	},
	/**
	 * 删除数据的ajax-delete请求
	 * @author laixm
	 */
	delete(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.delete(url,
					params
				)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	/**
	 * 封装刷新token请求
	 * @param url
	 * @param data
	 * @returns {Promise}
	 */
	refreshToken() {
		axios.put('token', '',{
			headers: 'Bearer ' + sessionStorage.getItem('token')
		})
		.then(function(response){
				resolve(response)
		})
		.catch(function(err){
				reject(err)
		});
	}

}
