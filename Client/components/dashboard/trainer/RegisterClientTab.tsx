import React from 'react'
import styles from "../../../styles/dashboard/RegisterClientTab.module.scss"

interface Props {

}

const RegisterClientTab: React.FC<Props> = ({ }) => {
    return (
        <>
            <div className={styles.register_container}>
                <div className={styles.register_container_header}>
                    <span>Client Details</span>
                </div>
                <form>
                    <div className={styles.form_content}>
                        <div>
                            <span>Avatar</span>
                            <input />
                        </div>
                        <div>
                            <span>First Name</span>
                            <input />
                        </div>
                        <div>
                            <span>Last Name</span>
                            <input />
                        </div>
                        <div>
                            <span>Email</span>
                            <input />
                        </div>
                        <div>
                            <span>Birthday</span>
                            <input />
                        </div>
                        <div>
                            <span>Goal</span>
                            <input />
                        </div>

                    </div>

                </form>
            </div>
        </>
    )
}

export default RegisterClientTab