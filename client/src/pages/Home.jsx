import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Header from '../components/Header.jsx'
import BlogList from '../components/BlogList.jsx'
import NewsLetter from '../components/NewsLetter.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <>
        <Navbar />
        <Header />
        <BlogList />
        <NewsLetter />
        <Footer />
    </>
  )
}

export default Home