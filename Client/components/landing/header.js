import React from 'react'
import styles from "../../styles/Header.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { MdPlayArrow } from 'react-icons/md';

export default function Header() {



    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_text_container}>
                        <div className={styles.header_brand_container}>
                            <h1>FitTrainer</h1>
                        </div>
                        <div className={styles.header_quote_container}>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is a great asset for your daily life. </p>
                        </div>
                        <div className={styles.header_button_container}>
                            <Link href='/signup' >

                                <button>Try For Free</button>

                            </Link>
                            <span><MdPlayArrow /></span>
                        </div>
                    </div>
                    <div className={styles.header_image_container}>
                        <Image alt="Vercel logo" src="/images/headersvg.png" width={1330} height={810} quality={100} />
                    </div>
                </div>
            </div>
        </>

    )
}
