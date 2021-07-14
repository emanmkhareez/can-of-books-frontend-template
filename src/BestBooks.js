import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
import BookModal from './components/BookModal';
import axios from 'axios'
import UpdateForm from './components/UpdateForm';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      booksArr: [],
      userEmail: '',
      show:false,
      index:0,
      showdata:false,
      name:'',
      description:'',
      status:'',
      img:''




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

  FormUpdate= async (index)=>{
    await this.setState({
      showdata:true,
      index:index,
      name:this.state.booksArr[index].name,
      description:this.state.booksArr[index].description,
      status:this.state.booksArr[index].status,
      img:this.state.booksArr[index].img
     



    })
    console.log("hhhhh",this.state.index)

}

// localhost:3006/updateBook/1?email=emkhareez19@gmail.com
//update fun
updateBook= async (event)=>{
  event.preventDefault();

  // let name=event.target.name2.value
  // let  description=event.target.description2.value
  // let  status=event.target.status2.value
  //   let img=event.target.img2.value
   
  let paramsData={
    name:event.target.name2.value,
    description:event.target.description2.value,
    status:event.target.status2.value,
    img:event.target.img2.value,
    email:this.state.userEmail

  }

let ResultUpdate=await axios.put(`${process.env.REACT_APP_PORT}/updateBook/${this.state.index}`,paramsData)

this.setState({
  booksArr:ResultUpdate.data
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

{this.state.showdata&&
        <UpdateForm
        name={this.state.name}
        description={this.state.description}
        status={this.state.status}
        img={this.state.img}
        updateData={this.updateBook}
        />
        }
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
                    <button style={{marginLeft:"20px"}} onClick={()=>this.FormUpdate(idx)}>Update</button>

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