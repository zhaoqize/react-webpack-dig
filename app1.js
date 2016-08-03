import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import {createStore,combineReducers} from 'redux';



const ADD = 'ADD';
const DELETE = 'DELETE';
//action

function add(text){
	return {
		type:ADD,
		text
	}
}

function del(index){
	return {
		type:DELETE,
		index
	}
}


//reducer

function addList(state = [],action){
	switch (action.type){
		case ADD:
			return [...state,{
				type:ADD,
				text:action.text
			}]
		case DELETE:
			state.splice(action.index,1)
			return [...state]
		default:
			return state;
	}
}

function deleteList(state = [],action){
	switch (action.type){
		case DELETE:
			return [...state,{
				type:DELETE,
				index:action.index
			}]
		default:
			return state;
	}
}

var todoApp = combineReducers({
	addList:addList,
	deleteList:deleteList
})

var store = createStore(todoApp);

//app

var ListDo = React.createClass({
	getInitialState() {
	    return {
	        items : []
	    };
	},
	componentWillReceiveProps(nextProps) {
	    this.setState({
	    	items : nextProps.listNode.addList
	    })
	},
	del:function(index){
		return () =>{
			//记录删除 修改state
			store.dispatch(del(index))
			this.setState({
				items : store.getState().addList
			})
			console.log(store.getState())
		}
	},
	render:function () {
		return (
			<div>
				{
					this.state.items.map(function(item,index){
						return <p key={index} onClick={this.del(index)}>{ item.text }</p>
					}.bind(this))
				}
			</div>
		)
	}
})



var App = React.createClass({
	getInitialState() {
	    return {
	        items : store.getState()
	    };
	},
	add:function(){
		store.dispatch(add(ReactDOM.findDOMNode(this.refs.inpnode).value.trim()));
		this.setState({
			items : store.getState()
		})
		console.log(store.getState())
	},
	render:function () {
		
		return (
			<div>
				<input type="text" ref="inpnode"/>
				<button onClick={ this.add }> 添加 </button>
				<ListDo listNode={ this.state.items } />
			</div>
		)
	}
})

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('app')
)
