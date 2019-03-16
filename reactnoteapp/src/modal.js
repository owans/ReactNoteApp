import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
// import ToDo from './ToDo';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      list: [],
    note:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  createNewToDoItem = () => {
    this.setState(({ list, note}) => ({
      list: [
          ...list,
        {
          note
        }
      ],
      note: ''
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



  render() {
    return (
      <div>
        <button className="navbar-btn btn btn-primary" onClick={this.openModal}>Click to add title</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Welcome to Your notes app</h2>
        
          <form>
            <input placeholder="add title"/>
            
            <button onClick={this.createNewToDoItem}>Add title</button>
            <button onClick={this.closeModal}>close</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;