import React from 'react'
import styles from "../../../styles/dashboard/ClientCard.module.scss"
import Image from 'next/image'

interface Props {
    client: any
}

const ClientCard: React.FC<Props> = ({ client }) => {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.image_container}>

                    {/* <Image alt="Vercel logo" src={client.Avatar} width={1330} height={810} quality={100} /> */}
                    <img src={client.Avatar} />
                </div>

                <div className={styles.content_container}>
                    <span>{client.FirstName} {client.LastName}</span>

                </div>

                <div className={styles.button_container}>

                </div>
            </div>
        </>
    )
}

export default ClientCard