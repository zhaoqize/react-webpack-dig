# redux-webpack-kit

### import {createStore,combineReducers} from 'redux'

combineReducers用来合并多个reducer

### 单一数据流

store.dispatch(plus()) => reducers => store.getState()  

### subscribe

- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数可以注销监听器。
