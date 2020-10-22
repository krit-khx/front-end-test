const intitialState = {
  todoList: [],
  barPercent: 0,
  inputAdd: '',
  completeTask: 0,
  masterData: []
};

export function TodoListReducers(state = intitialState, action) {
  switch (action.type) {
    case "TODOLIST_SUCCESS":
      return {
        ...state,
        barPercent: action.data.barPercent,
        completeTask: action.data.completeTask,
        todoList: action.data.data,
        masterData: action.data.data,
      };
    case "TODOLIST_FAILED":
      return {
        ...state,
        todoList: [],
      };
    case "CHECKING_LIST":
      return {
        ...state,
        barPercent: action.data.barPercent,
        completeTask: action.data.completeTask,
        todoList: action.data.todoList,
        masterData: action.data.todoList,
      };
    case "EDIT_TITLE":
      return {
        ...state,
        todoList: action.data.todoList,
      };
    case "ADD_LIST":
      return {
        ...state,
        todoList: action.data.todoList,
        barPercent: action.data.barPercent,
        completeTask: action.data.completeTask,
        masterData: action.data.todoList,
      };
    case "DELETE_LIST":
      return {
        ...state,
        barPercent: action.data.barPercent,
        completeTask: action.data.completeTask,
        todoList: action.data.todoList,
        masterData: action.data.todoList,
      };
    case "SORT_LIST":
      return {
        ...state,
        todoList: action.data.todoList,
      };
    default:
      return state;
  }
}
