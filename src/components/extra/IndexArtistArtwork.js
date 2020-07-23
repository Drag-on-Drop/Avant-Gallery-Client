// import React, { Component } from 'react'
// import { indexUserImage } from '../../api/image'
// import messages from '../AutoDismissAlert/messages'
// import axios from 'axios'
//
// import { CardColumns, Card } from 'react-bootstrap'
//
// class IndexUserImage extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       user: null
//     }
//     console.log(props, 'what is props')
//   }
//
//   componentDidMount () {
//     const id = this.props.match.params.id
//     axios.get(`https://ancient-garden-56671.herokuapp.com/users/${id}`)
//       .then(response => {
//         console.log(response, 'what is response')
//         this.setState({
//           user: response.data.user
//         })
//       })
//       .catch(error => {
//         this.setState({
//           images: null
//         })
//         this.props.msgAlert({
//           heading: 'Could not reach server: ' + error.message,
//           message: messages.indexArtFailure,
//           variant: 'danger'
//         })
//       })
//   }
//
//   // componentDidMount () {
//   //   indexUserImage()
//   //     .then(response => {
//   //       console.log(response, 'what is response')
//   //       this.setState({
//   //         images: response.data.images
//   //       })
//   //     })
//   //     .catch(error => {
//   //       this.setState({
//   //         images: null
//   //       })
//   //       this.props.msgAlert({
//   //         heading: 'Could not reach server: ' + error.message,
//   //         message: messages.indexArtFailure,
//   //         variant: 'danger'
//   //       })
//   //     })
//   // }
//
//   render () {
//     console.log('render image', this.state.images)
//     if (!this.state.images) {
//       return (
//         <div className="index-not-found">
//           <p>Could not connect to server, please try again.</p>
//         </div>
//       )
//     }
//
//     return (
//       <div>
//         <CardColumns>
//           {this.state.images.filter(image => image.owner._id === this.props.user).map((image) => (
//             <Card key={image._id}>
//               <Card.Img variant="top" src={image.imageUrl} />
//               <Card.Body>
//                 <Card.Title>{image.name}</Card.Title>
//                 <Card.Text>{image.owner.name}</Card.Text>
//               </Card.Body>
//               <Card.Footer>
//                 <small className="text-muted">Posted at {image.createdAt}</small>
//               </Card.Footer>
//             </Card>
//           ))}
//         </CardColumns>
//       </div>
//     )
//   }
// }
//
// // {this.state.images.filter(image => {image.owner._id === this.props.user})
//
// export default IndexUserImage
