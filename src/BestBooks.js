import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
import BookModal from './components/BookModal';
import axios from 'axios'
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      booksArr: [],
      userEmail: '',
      show:false
    }
  }





//lab12
  componentDidMount = async () => {
    const { user } = this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`
    })


    let url =`${process.env.REACT_APP_PORT}/book?ownerName=${this.state.userEmail}`
    let responseData = await axios.get(url);

    await this.setState({
      booksArr: responseData.data,
     
    })
    
  }
//lab13

//show function
showModal=()=>{
  this.setState({
    show:true
  
})
}
//handelclose
handleClose=()=>{
  this.setState({
    show:false
  })
}

//add function

  //localhoust:3006/books?name=book1&description=about1&status=readed&userEmail=emkhareez19@gmail.com
  addbook= async(event)=>{
    event.preventDefault()
    let name=event.target.name.value;
    let description=event.target.description.value;
    let status=event.target.status.value;
    let img=event.target.img.value;
    let Email=this.state.userEmail
    
    const objBook={
       name:event.target.name.value,
       description:event.target.description.value,
       status:event.target.status.value,
       img:event.target.img.value,
       Email:this.state.userEmail}
    
    let BookData=await axios.post(`${process.env.REACT_APP_PORT}/books`,objBook)
this.setState({
  booksArr:BookData.data
})
  }
//localhost:3006/deleteBook/1?email=emkhareez19@gmail.com
  //delete fun
  deleteFun= async(index)=>{
    console.log(index)
    let paramObj={
      Email:this.state.userEmail
    }
    let deleteResult=await axios.delete(`${process.env.REACT_APP_PORT}/deleteBook/${index}`,{params:paramObj})
//when dealing from backend

    // index: req.params >> parms:req.query

    // let bookData = await axios.delete(`${process.env.REACT_APP_PORT}/deleteBook`,{params:paramObj})
    // // index: req.query >> ownerName:req.query

    this.setState({
      booksArr:deleteResult.data
    })
  }



  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <button onClick={this.showModal}>ADDBook</button>
<BookModal
show={this.state.show}
addbook={this.addbook}
handleClose={this.handleClose}
showModal={this.showModal}
/>
        <div className="bookcont">
          {
            
            this.state.booksArr.map((book,idx) => {


              return (
                <div key={idx}>
                <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' }} >

                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <img src={book.img} alt={book.name} style={{width:70,height:60}} />
                    <button style={{marginLeft:"20px"}} onClick={()=>this.deleteFun(idx)}>delete</button>

                    <Card.Text>
                      {book.description}
                    </Card.Text>
                    <Card.Text>
                      {book.status}
                    </Card.Text>
                  </Card.Body>
                </Card>
                </div>
              )

            })

          }
        </div>


      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);