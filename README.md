## 你真弄懂了react+redux的计时器例子么(未使用react-redux)
如果你弄懂了，那你应该在大脑中具备一条数据流。

1.鼠标点击+,触发click事件。告诉`Action`做**ADD**操作。

2.一旦进行`Action`的时候，会触发`reducer`处理函数。这个函数做具体的`state`操作。然后返回一个新的`state`

3.通过`store.subscribe`监听`state`的变化，因为一旦state变化会自动触发`tore.subscribe`
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
