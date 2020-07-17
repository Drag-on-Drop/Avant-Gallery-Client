// import React, { Component } from 'react'
// import { indexArtistArtwork } from '../../api/artwork'
// import messages from '../AutoDismissAlert/messages'
// import axios from 'axios'
//
// import { CardColumns, Card } from 'react-bootstrap'
//
// class IndexArtistArtwork extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       artist: null
//     }
//     console.log(props, 'what is props')
//   }
//
//   componentDidMount () {
//     const id = this.props.match.params.id
//     axios.get(`https://ancient-garden-56671.herokuapp.com/artists/${id}`)
//       .then(response => {
//         console.log(response, 'what is response')
//         this.setState({
//           artist: response.data.artist
//         })
//       })
//       .catch(error => {
//         this.setState({
//           artworks: null
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
//   //   indexArtistArtwork()
//   //     .then(response => {
//   //       console.log(response, 'what is response')
//   //       this.setState({
//   //         artworks: response.data.artworks
//   //       })
//   //     })
//   //     .catch(error => {
//   //       this.setState({
//   //         artworks: null
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
//     console.log('render art', this.state.artworks)
//     if (!this.state.artworks) {
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
//           {this.state.artworks.filter(art => art.owner._id === this.props.user).map((art) => (
//             <Card key={art._id}>
//               <Card.Img variant="top" src={art.imageUrl} />
//               <Card.Body>
//                 <Card.Title>{art.name}</Card.Title>
//                 <Card.Text>{art.owner.name}</Card.Text>
//               </Card.Body>
//               <Card.Footer>
//                 <small className="text-muted">Posted at {art.createdAt}</small>
//               </Card.Footer>
//             </Card>
//           ))}
//         </CardColumns>
//       </div>
//     )
//   }
// }
//
// // {this.state.artworks.filter(art => {art.owner._id === this.props.user})
//
// export default IndexArtistArtwork
