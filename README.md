## 你真弄懂了react+redux的计时器例子么(未使用react-redux)
如果你弄懂了，那你应该在大脑中具备一条数据流。

1.鼠标点击+,触发click事件。告诉`Action`做**ADD**操作。

2.一旦进行`Action`的时候，会触发`reducer`处理函数。这个函数做具体的`state`操作。然后返回一个新的`state`

3.通过`store.subscribe`监听`state`的变化，因为一旦state变化会自动触发`store.subscribe`
## 操作步骤

1.写Action
```js
//定义action类型
const ADD = 'ADD';
const SUBTRACTION = 'SUBTRACTION';

//定义action生成函数
function add_todo(text){
	return {
		type:ADD,
		text:text
	}
}

function subtraction_todo(text){
	return {
		type:SUBTRACTION,
		text:text
	}
}

export {add_todo,subtraction_todo}
```

2.写Reducer(纯函数)
```js
//设置默认值为0
const countReducer = (state = { count: 0 },action) =>{
	switch (action.type){
		case 'ADD':
			return {count:state.count + 1};
		case 'SUBTRACTION':
			return {count:state.count - 1};
		default:
			return state;
	}
}

export {countReducer}
```

3.createStore绑定reducer返回一个顶层的store
```js
import {createStore} from 'redux'

//将reducer传入createStore
const store = createStore(countReducer)
```

4.触发subscribe？
```js
store.subscribe(function(){

})
```

## 具体实现
### createStore的实现
```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```
## react+react-redux+redux

使用react-redux来链接两者就方便快捷很多了。相当于粘合剂，将react跟redux无缝链接。

我们只需要定义两个映射state与操作,react-redux会自定触发render
```js
//Redux state 到 component props的映射
function mapStateToProps(state) {
  return {
    count: state.count
  }
}

//Redux actions 到 component props的映射
function mapDispatchToProps(dispatch) {
  return {
    add: () => dispatch(add_todo('增加+')),
    reduce:() => dispatch(subtraction_todo('递减-'))
  }
}
```

然后用connect将两者链接起来
```js
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(UICouter)
```

最后在用Provider在顶层将我们的组件包裹,并传入store即可。
```js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
```
