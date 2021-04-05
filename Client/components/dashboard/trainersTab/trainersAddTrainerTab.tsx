import React from 'react'
import styles from "../../../styles/dashboard/TrainerSignup.module.scss";

interface Props {

}

const AddTrainerTab: React.FC<Props> = ({ }) => {
    return (
        <>


            <div className={styles.add_trainer_container}>
                <div className={styles.add_trainer_header}>
                    <h1>Add New Trainer</h1>
                </div>

                <form>
                    <div className={styles.container}>
                        <div>
                            <span>Avatar</span>
                            <div className={styles.profile_pic}></div>
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
                            <span>Age</span>

                            <input />
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <button>Add Trainer</button>


                        </div>
                    </div>


                </form>
            </div>


        </>
    )
}

export default AddTrainerTab