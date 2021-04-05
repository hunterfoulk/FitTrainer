import styles from "../styles/Main.module.scss"
import Image from 'next/image'
import Navbar from "../components/landing/navbar/navbar"
import DashboardNav from "../components/landing/navbar/dashboardnav"
import Header from "../components/landing/header"
import About from "../components/landing/about"
import react, { useEffect, useState } from "react"


export default function Home() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const local = localStorage.getItem('_ftTrainerAuth');
    console.log("LOCAL", local)
    if (local) {
      setAuth(true)
    }
  }, [])


  return (
    <div className={styles.main}>
      {auth ? <DashboardNav /> : <Navbar />}
      <div className={styles.main_header}>


        <Header />


      </div>
      <div className={styles.about_section}>
        <About />
      </div>
    </div>
  )
}
