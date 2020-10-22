import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { TodoListActions } from "../../Actions/TodoList.actions";


class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { barPercent, completeTask } = this.props

        return (
            <>
                <div className="progressCard">
                    <div className="progressText"><font><b> {'Progress'}</b></font></div>
                    <div className='progressBarPosition'>
                        <div className='timeline'>
                            <div className='progress' style={{ width: `${barPercent}%` }} />
                        </div>
                    </div>
                    <div className="progressText2"><font size='2'>{completeTask} Completed</font></div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { todoList, barPercent, completeTask } = state.TodoListReducers;
    return {
        todoList, barPercent, completeTask
    };
}

export default connect(mapStateToProps)((Progress));
