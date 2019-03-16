import React, {Component} from 'react';
import './ToDoItem.css';
import 'bootstrap/dist/css/bootstrap.css';

class ToDoItem extends Component {

    render() {
        return (
            <div className="ToDoItem">
                <p className="ToDoItem-Text">{this.props.item}</p>
                <button className="ToDoItem-Delete btn delete-btn fa fa-remove"
                     onClick={this.props.deleteItem}>-
                </button>
            </div>
        );
    }
}

export default ToDoItem;
