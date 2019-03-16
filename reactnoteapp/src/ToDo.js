import React, {Component} from 'react';
import './ToDo.css';
import ToDoItem from './components/ToDoItem';
import Logo from './assets/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import App from './modal';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            list: [],
            todo: ''
        };
    };

  componentDidMount(){
    if(!localStorage.getItem('list')){
      this.fetchData();
    }else{
      console.log("using data from local storage")
    }
    
  }

  fetchData(){
    this.setState({list: this.state.list})
  }

  componentWillMount(){
      localStorage.getItem('list') && this.setState({list: JSON.parse(localStorage.getItem('list')),
      todo:""
    })
  }

  // this is where the data goes
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('list' , JSON.stringify(nextState.list));
  }


    createNewToDoItem = () => {
      this.setState(({ list, todo }) => ({
        list: [
            ...list,
          {
            todo
          }
        ],
        todo: ''
      }));
    };


    handleKeyPress = e => {
        if (e.target.value !== '') {
          if (e.key === 'Enter') {
            this.createNewToDoItem();
          }
        }
    };

    handleInput = e => {
      this.setState({
        todo: e.target.value
      });
    };


    // this is now being emitted back to the parent from the child component
    deleteItem = indexToDelete => {
      this.setState(({ list }) => ({
        list: list.filter((toDo, index) => index !== indexToDelete)
      }));
    };
    render() {
        return (
            <div className="ToDo">
            <div className="container">
            <div className="navbar">
                <img className="Logo" src={Logo} navbar-brand alt="React logo"/>
                {/* <p className="logo" navbar-text>Notes App</p> */}
                <App/>
                <button className="navbar-btn btn btn-primary right" onClick={this.createNewToDoItem} >Create Note</button>
            </div>
            </div>
                    <div>
                       <input type="text" value={this.state.todo} onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
                       {/* <button className="ToDo-Add" onClick={this.createNewToDoItem}>+</button> */}
                    </div>


                <div className="ToDo-Container">

                    <div className="ToDo-Content">

                        {this.state.list.map((item, key) => {
                                return <ToDoItem
                                                key={key}
                                                className="delete-btn"
                                                item={item.todo}
                                                deleteItem={this.deleteItem.bind(this, key)}
                                                />
                          }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDo;
