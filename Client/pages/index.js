import styles from "../styles/Main.module.scss"
import Image from 'next/image'
import Navbar from "../components/landing/navbar/navbar"
import Header from "../components/landing/header"
import About from "../components/landing/about"



export default function Home() {
  return (
    <div className={styles.main}>

      <div className={styles.main_header}>
        <Navbar />

        <Header />


      </div>
      <div className={styles.about_section}>
        <About />
      </div>
    </div>
  )
}
