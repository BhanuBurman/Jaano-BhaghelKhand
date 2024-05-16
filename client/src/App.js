import React from 'react'
import NavBar from './Components/NavBar/NavBar';
import Header from './container/Header/Header';
import Translator from './container/Translator/Translator';
import Footer from './container/Footer/Footer';
import Visiting from './container/Visting/Visting';
const App = () => {
  return (
    <div >
      <NavBar />
      <Header />
      <Translator />
      <Visiting />
      <Footer />
    </div>
  )
}

export default App
