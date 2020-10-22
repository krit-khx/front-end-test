import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { TodoListReducers } from './TodoList.reducers'

const reducer = combineReducers({
    form: formReducer,
    TodoListReducers
})

export default reducer;