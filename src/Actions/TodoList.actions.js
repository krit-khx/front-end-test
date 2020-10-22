import { TodoListServices } from "../Services/index";

function GetTodoListAction(params) {
  return (dispatch) => {
    TodoListServices.GetTodoList(params).then((res) => {
      if (res.succces) {
        let calData = calProcess(res.data)
        dispatch({
          type: "TODOLIST_SUCCESS",
          data: { data: res.data, barPercent: calData.barProcessPercent , completeTask : calData.completeTask  },
        });
      } else {
        dispatch({
          type: "TODOLIST_FAILED",
          data: [],
        });
      }
    });
  };
}
function calProcess(todoList) {
  let avgProcrssBar = todoList.length
  var res = todoList.filter(val => {
    return val.completed
  })
  let cal = res.length * 100
  let data = { barProcessPercent: cal / avgProcrssBar, completeTask: res.length }
  return data
}

  export const TodoListActions = {
    GetTodoListAction
  }