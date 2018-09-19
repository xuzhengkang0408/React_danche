//引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore,applyMiddleware,compose} from 'redux'
//引入thunk中间件
import thunk from 'redux-thunk'
// 引入所有的reducer
import reducer from "../reducer"
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer);

export default store