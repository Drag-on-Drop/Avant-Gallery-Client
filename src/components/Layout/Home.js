import React from 'react'
import MainCarousel from './MainCarousel'

const Home = (props) => (
  <div>
    <br/>
    <MainCarousel msgAlert={props.msgAlert} />
  </div>
)

export default Home
