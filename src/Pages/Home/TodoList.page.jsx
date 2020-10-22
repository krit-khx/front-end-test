import React from "react";
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import Progress from './Progress.page'
import { TodoListActions } from "../../Actions/TodoList.actions";
import actions from "redux-form/lib/actions";
import lodash from 'lodash'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            inputEdit: 'null',
            inputAdd: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeAdd = this.onChangeAdd.bind(this)
    }
    componentWillMount() {
        const { dispatch } = this.props
        dispatch(TodoListActions.GetTodoListAction())
    }

    onChange(event) {
        this.setState({ inputEdit: event.target.value ? event.target.value : ' (Empty title task)... ' });
    }

    onChangeAdd(event) {
        this.setState({ inputAdd: event.target.value });
    }

    renderTodoList = () => {
        const { todoList, barPercent } = this.props;
        const { id } = this.state;
        let todo = [];

        todoList.forEach((value, index) => {
            todo.push(
                <div key={value.id} className="cardtodo flex-container ">
                    <div>
                        <label className="container flex-item-left" >
                            {id !== value.id &&
                                <>
                                    <input defaultChecked={value.completed} type="checkbox" onClick={(e) => { this.handleCheckBox(value.id, value.completed) }} />
                                    <span className={"checkmark"} />
                                </>
                            }
                        </label>
                    </div>
                    <div key={barPercent} className={id !== value.id ? "texttodo flex-item-center" : "textTodoEdit flex-item-center"}>
                        {id !== value.id ?
                            <>
                                {value.completed === false ? <font>{value.title}</font> : <font><s>{value.title}</s></font>}
                            </>
                            :
                            <>
                                <input type="text" onChange={this.onChange} defaultValue={value.title} id="todo" name="todo" placeholder="Add your todo..." className="inputEdit" />
                                <button className='button' onClick={() => { this.handleActionEdit(value.id, 'save', value.title) }}> Save</button>
                            </>
                        }
                    </div>
                    {id !== value.id &&
                        <div className="dots flex-item-right">
                            <div className="dropdown">
                                <i className="fa fa-ellipsis-h" />
                                <div className="dropdown-content">
                                    <div>
                                        <a onClick={() => { this.handleActionEdit(value.id, 'openEdit') }} style={{ color: "black" }}>Edit</a>
                                    </div>
                                    <div>
                                        <a onClick={() => { this.handleActionDelete(value.id) }} style={{ color: "red" }}>Delete</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            );
        });
        return todo;
    }

    renderSelectBox = () => {
        let select = [];
        select.push(
            <div key={0} className="select">
                <div className="select-box">
                    <div className="select-box__current" tabIndex="1">
                        <div className="select-box__value">
                            <input
                                className="select-box__input"
                                type="radio"
                                id="0"
                                value="all"
                                name="replace"
                                onClick={this.handleSort}
                                defaultChecked
                            />
                            <p className="select-box__input-text">All</p>
                        </div>
                        <div className="select-box__value">
                            <input
                                className="select-box__input"
                                type="radio"
                                id="1"
                                value="done"
                                onClick={this.handleSort}
                                name="replace"
                            />
                            <p className="select-box__input-text">Done</p>
                        </div>
                        <div className="select-box__value">
                            <input
                                className="select-box__input"
                                type="radio"
                                id="2"
                                value="undone"
                                onClick={this.handleSort}
                                name="replace"
                            />
                            <p className="select-box__input-text">Undone</p>
                        </div>
                        <img
                            className="select-box__icon"
                            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                            alt="Arrow Icon"
                            aria-hidden="true"
                        />
                    </div>
                    <ul className="select-box__list">
                        <li>
                            <label
                                className="select-box__option"
                                htmlFor="0"
                                aria-hidden="true"
                            >
                                All
                  </label>
                        </li>
                        <li>
                            <label
                                className="select-box__option"
                                htmlFor="1"
                                aria-hidden="true"
                            >
                                Done
                  </label>
                        </li>
                        <li>
                            <label
                                className="select-box__option"
                                htmlFor="2"
                                aria-hidden="true"
                            >
                                Undone
                  </label>
                        </li>
                    </ul>
                </div>
            </div>
        );
        return select;
    }
    handleSort = (event) => {
        const { dispatch ,masterData} = this.props
        let tempList = lodash.clone(masterData)
        let newList = []
        if (event.target.value === 'done') {
            newList = tempList.filter(function (element) {
                return element.completed === true;
            })
        }
        else if(event.target.value === 'undone'){
            newList = tempList.filter(function (element) {
                return element.completed === false;
            })
        }
        else if(event.target.value === 'all'){
            newList =  this.props.masterData
        }

        dispatch({ type: 'SORT_LIST', data: { todoList: newList } })
    }

    handleActionEdit = (id, action, title) => {
        const { dispatch } = this.props
        let newData = this.props.todoList
        if (action === 'openEdit') {
            this.setState({
                openEdit: true,
                id: id,
                inputEdit: title
            })
        }
        else if (action === 'save') {
            newData.map(val => {
                if (val.id === id) {
                    val.title = this.state.inputEdit ? this.state.inputEdit : title
                    this.setState({
                        id: '',
                        inputEdit: ''
                    })
                }
            })
            dispatch({ type: 'EDIT_TITLE', data: { todoList: newData } })
        }
    }

    handleActionDelete = (id) => {
        const { dispatch } = this.props
        let tempData = this.props.todoList

        let newData = tempData.filter(function (element) {
            return element.id !== id;
        });

        let barProcessPercent = this.calProcess(newData)
        dispatch({ type: 'DELETE_LIST', data: { todoList: newData, barPercent: barProcessPercent.barProcessPercent, completeTask: barProcessPercent.completeTask } })

    }

    handleCheckBox = (id, checked) => {
        const { dispatch } = this.props
        let newData = this.props.todoList
        newData.map(val => {
            if (val.id === id) {
                val.completed = checked ? false : true
            }
        })
        let barProcessPercent = this.calProcess(newData)
        dispatch({ type: 'CHECKING_LIST', data: { todoList: newData, barPercent: barProcessPercent.barProcessPercent, completeTask: barProcessPercent.completeTask } })
    }

    calProcess = (todoList) => {
        let avgProcrssBar = todoList.length
        var res = todoList.filter(val => {
            return val.completed
        })
        let cal = res.length * 100
        let data = { barProcessPercent: cal / avgProcrssBar, completeTask: res.length }
        return data
    }

    handleKeyDown = (event) => {
        var timestampUniq = new Date().getUTCMilliseconds();
        if (event.key === 'Enter') {
            const { dispatch } = this.props
            let newData = [...this.props.todoList, {
                completed: false,
                id: timestampUniq,
                title: event.target.value ? event.target.value : ' (Empty title task)... '
            }]

            let barProcessPercent = this.calProcess(newData)
            this.setState({ inputAdd: '' })
            dispatch({ type: 'ADD_LIST', data: { todoList: newData, barPercent: barProcessPercent.barProcessPercent, completeTask: barProcessPercent.completeTask } })

        }

    }


    render() {
        return (
            <>
                <div className="card">
                    <div className="progressInContainer">
                        <Progress />
                    </div>
                    <div className="task">
                        <b>Tasks</b>
                    </div>
                    {this.renderSelectBox()}
                    {this.renderTodoList()}
                    <div className="divinput">
                        <input type="text" id="todoAdd" name="todoAdd" placeholder="Add your todo..." value={this.state.inputAdd} className="input" onKeyDown={this.handleKeyDown} onChange={this.onChangeAdd} />
                    </div>

                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { todoList, inputAdd, barPercent,masterData } = state.TodoListReducers;
    return {
        todoList,
        barPercent,
        inputAdd,
        masterData
    };
}

export default withRouter(connect(mapStateToProps)(
    reduxForm({
        form: "TodoList",
    })(TodoList)
));
