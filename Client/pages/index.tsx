import styles from "../styles/Main.module.scss"
import Image from 'next/image'
import Navbar from "../components/landing/navbar/navbar"
import DashboardNav from "../components/landing/navbar/dashboardnav"
import Header from "../components/landing/header"
import About from "../components/landing/about"
import Features from "../components/landing/features"
import Cards from "../components/landing/cards"
import GetStarted from "../components/landing/getStarterd"
import Footer from "../components/landing/footer"
import react, { useEffect, useState } from "react"
import ProgramsFeature from "../components/landing/programsFeature"

export default function Home() {




  return (
    <div className="bg-[#0a0a0a] w-full flex flex-col items-center pb-2 px-4 ">
      <Navbar />



      <Header />


      <Features />

      <ProgramsFeature />

      <Cards />

      <GetStarted />

      <Footer />

    </div>
  )
}

