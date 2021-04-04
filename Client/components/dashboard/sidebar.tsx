import React from 'react';
import styles from "../../styles/dashboard/Sidebar.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { MdPersonOutline } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { FaReply } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa';


interface Props {

}


const MyButton = React.forwardRef(({ onClick, href }: any, ref: any) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image alt="Vercel logo" src="/images/weightslogoorange.png" width={25} height={28} quality={100} />
            <span>FitTrainer</span>
        </a>
    )
})


const Sidebar: React.FC<Props> = ({ }) => {
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>

                    <Link href="/" passHref>
                        <MyButton />
                    </Link>


                </div>
                <div className={styles.sidebar_tabs_container}>
                    <div className={styles.sidebar_tab}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <FiCalendar />
                            </div>

                            <div>
                                <span>Schedule</span>

                            </div>
                        </div>

                    </div>
                    <div className={styles.sidebar_tab}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <MdPersonOutline />
                            </div>
                            <div>

                                <span>Clients</span>
                            </div>
                        </div>

                    </div>
                    <div className={styles.sidebar_tab}>
                        <div className={styles.sidebar_tab_content}>
                            <div >
                                <FiPaperclip />

                            </div>
                            <div>
                                <span>Programs</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidebar_tab}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <FaReply />
                            </div>
                            <div>

                                <span>Recents</span>
                            </div>
                        </div>

                    </div>
                    <div className={styles.sidebar_tab}>
                        <div className={styles.sidebar_tab_content}>
                            <div>
                                <FaRegCreditCard />

                            </div>
                            <div>

                                <span>Subscription</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar