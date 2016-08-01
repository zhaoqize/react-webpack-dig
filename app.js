import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';



//actions
const PLUS = 'PLUS';
const REDUCE = 'REDUCE';

function plus(){
  return {
    type : PLUS
  }
}
 
function reduce(){
  return {
    type : REDUCE
  }
}
 
//给state设置初始值
var initState = 0 ;


//reducers 使用...较多
function addOrCutCounter(state = initState, action){
  
  switch (action.type){
    case PLUS:
      return ++ state;
    case REDUCE:
      return -- state;
    default:
      return state
  }
}



//root combineReducers用来合并多个reducer
var todoApp = combineReducers({
    count:addOrCutCounter
});
var store = createStore(todoApp);

//app
//单一数据流 store.dispatch(plus()) => reducers => store.getState()  
var Counter = React.createClass({
 getInitialState() {
     return {
         index:store.getState()  
     };
 },
 add:function(){
    store.dispatch(plus());
    this.setState({
      index:store.getState()  
    })
 },
 cut:function(){
  store.dispatch(reduce());
    this.setState({
      index:store.getState()  
    })
 },
  render:function(){
    return (
      <div>
        <p > {this.state.index.count} </p>
        <button onClick={ this.add }> + </button>
        <button onClick={ this.cut }> - </button>
      </div>
    )
  }
})

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
)

