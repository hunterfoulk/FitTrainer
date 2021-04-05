import React from 'react'
import styles from "../../../styles/dashboard/TrainerSignup.module.scss";
import DatePickers from "../trainersTab/datePicker"
// import DefaultAvatar from "../../../public/images/defaultavatar.png";
import Image from 'next/image'

interface Props {

}

const AddTrainerTab: React.FC<Props> = ({ }) => {
    return (
        <>


            <div className={styles.add_trainer_container}>
                <div className={styles.add_trainer_header}>
                    <h1>Register New Trainer</h1>
                </div>

                <form>
                    <div className={styles.container}>
                        <div>
                            <span>Avatar</span>

                            <div className={styles.profile_pic}>
                                <Image src="/images/defaultavatar.png" width={1330} height={810} quality={100} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div>
                            <span>Email</span>

                            <input />
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div>
                            <span>First Name</span>

                            <input />
                        </div>

                    </div>

                    <div className={styles.container}>
                        <div>
                            <span>Last Name</span>

                            <input />
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <span>Password</span>

                            <input />
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <span>Birthday</span>
                            <div>
                                <DatePickers />
                            </div>

                            {/* <input /> */}
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <button>Register Trainer</button>


                        </div>
                    </div>


                </form>
            </div>


        </>
    )
}

export default AddTrainerTab