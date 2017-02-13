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