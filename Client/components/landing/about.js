import React from 'react'
import styles from "../../styles/Main.module.scss"
import { MdPlayArrow } from 'react-icons/md';
import Image from 'next/image'


export default function About() {
    return (
        <div className={styles.about_container}>

            <div className={styles.about_header_container}>
                <span>The Worlds Leading Fitness Training And Gym Software <span style={{ color: "#e0021b" }}>Around The World.</span></span>
            </div>

            <div className={styles.about_cards_container}>
                <div className={styles.about_card}>
                    <div className={styles.about_card_image_container}>

                        <Image alt="running-icon" src="/images/runningiconblue.png" width={50} height={50} quality={100} className="avatar" />
                    </div>
                    <div className={styles.about_card_text_container}>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is a great asset for your daily life. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                    </div>
                </div>
                <div className={styles.about_card}>
                    <div className={styles.about_card_image_container}>

                        <Image alt="stretching-icon" src="/images/stretchingicon.png" width={50} height={50} quality={100} className="avatar" />

                    </div>
                    <div className={styles.about_card_text_container}>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is a great asset for your daily life.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                    </div>
                </div>
                <div className={styles.about_card}>
                    <div className={styles.about_card_image_container}>
                        <Image alt="wegiths-icon" src="/images/dumbbellgreen.png" width={60} height={60} quality={100} className="avatar" />

                    </div>
                    <div className={styles.about_card_text_container}>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is a great asset for your daily life. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
