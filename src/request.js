import axios from "axios"
import { Notification, MessageBox, Message } from 'element-ui'
import qs from "qs"

let token = ''
const request = axios.create({
    baseURL: process.env.BASE_API,  // api的base_url
    timeout: 10000  // 请求超时时间
});

request.interceptors.request.use(function(config){
	//在请求发送之前做一些事
	config.headers['Content-Type'] = 'application/json;charset=UTF-8'
	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.headers['Authorization'] = '' + token // 让每个请求携带token-- ['X-TokenAuthorization']为自定义key 请根据实际情况自行修改
    // config.method === 'POST' || 'PUT' || 'PATCH' ? config.data = qs.stringify({...config.data}) : config.params = {...config.params};
    return config;
},function(error){
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

request.interceptors.response.use(data => {
	if(data.data.status === 200) {
		return data.data
	} else {
		Message({
			showClose: true,
			message: data.data.message || '请求出错啦',
			type: 'error',
			duration: 5000
		  });
		return false
	}
}, error => {
	Message({
		showClose: true,
		message: error,
		type: 'error',
		duration: 5000
	  });
	// if(error.response){
	// 	let err = error.response.data.error;
	// 	if(err === 'invalid_token'){
	// 		store.dispatch("LogOut").then(() => {
	// 			router.replace({ path: "/login" });
	// 		});
	// 		return;
	// 	}else if(err === 'invalid_grant'){
	// 		Notification({
	// 			message: error.response.data.error_description,
	// 			type: 'error'
	// 		});
	// 		return;
	// 	}
    // }
    return Promise.reject(error);
})

export default request 