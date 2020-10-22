import axios from 'axios'
import _ from 'lodash'

const api_Url = "http://localhost:3001/todos"


function GetTodoList(params) {
    let req_header = {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem('meAuth')
    }
    let temp = axios.get(api_Url, { headers: req_header })
        .then(res => {
            if (_.isEmpty(res,'data') === false) {
                return {
                    data: res.data,
                    succces: true
                }
            } else {
                return {
                    errMsg: 'Something went wrong',
                    data: [],
                    statusCode: 404
                }
            }
        })
    return temp;
}

export const TodoListServices = {
    GetTodoList
}