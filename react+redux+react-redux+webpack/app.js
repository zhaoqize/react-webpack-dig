import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {add_todo,subtraction_todo} from './Redux/action/index.js'
import {countReducer} from './Redux/reducer/index.js'

const store = createStore(countReducer)

//UI层
class UICouter extends Component{
	render(){

		const {count,add,reduce} = this.props;

		return(
			<div>
				<p>{count}</p>
				<button onClick={add}> + </button>
				<button onClick={reduce}> - </button>
			</div>
		)
		
	}
}

//Redux state 到 component props的映射
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

//Redux actions 到 component props的映射
function mapDispatchToProps(dispatch) {
  return {
    add: () => dispatch(add_todo('增加+')),
    reduce:() => dispatch(subtraction_todo('递减-'))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)



