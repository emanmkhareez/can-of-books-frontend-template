import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export class BookModal extends Component {
    render() {
        return (
            <>





<Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Add Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <form onSubmit={this.props.addbook}>
                <input placeholder='Enter name book' type="text" name='name' />
                <input placeholder='Enter description  ' type="text" name='description' />
                <select name='status'>
                    <option></option>
                    <option value='readIt'>read it</option>
                    <option value='notRead'>not Read</option>
                </select>
                {/* <input placeholder='Enter status' type="text" name='status' /> */}
                <input type="text"  alt="Submit" width="30" height="30" placeholder="Enter img" name="img"></input>
                <input type="submit" value="Add book" />
            </form> 

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>





                
            </>
        )
    }
}

export default BookModal
