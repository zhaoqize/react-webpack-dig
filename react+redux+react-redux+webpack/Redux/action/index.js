const ADD = 'ADD';
const SUBTRACTION = 'SUBTRACTION';

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