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

store.subscribe(function(){
	//如何触发更新
	
})

 class Counter extends Component {
    constructor() {
        super();

        this.state = {
        	count :0
        }

        
        this.add = function() {
        	store.dispatch(add_todo('增加+'))
        }

        this.reduce = function(){
        	store.dispatch(subtraction_todo('递减-'))
        }


     }

    componentDidMount() {
    	
    }

    componentDidUpdate(prevProps, prevState) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    render() {

        return ( 
        	<div>
        		<UICouter count={this.state.count} />
        	</div>
        )
    }
}

ReactDOM.render(<Counter />,document.getElementById('content'))


