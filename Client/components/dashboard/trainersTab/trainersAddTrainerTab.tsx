import React, { useState } from 'react'
import styles from "../../../styles/dashboard/TrainerSignup.module.scss";
import DatePickers from "../trainersTab/datePicker"
// import DefaultAvatar from "../../../public/images/defaultavatar.png";
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
interface Props {
    notify: any
    AccountInfo: any
}

interface Trainer {
    TrainerId?: number
    Email: string
    FirstName: string
    LastName: string
    Password: string
    Birthday: number
    avatar?: string
    GymId: number

}



const AddTrainerTab: React.FC<Props> = ({ notify, AccountInfo }) => {
    const [newTrainer, setNewTrainer] = useState<Trainer>({ Email: "", FirstName: "", LastName: "", Password: "", Birthday: 25, GymId: AccountInfo.GymId })


    const CreateNewTrainer = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()


        // if (newTrainer.Email === "") {
        //     window.alert("yooo")
        // }


        const res = await fetch('http://localhost:9000/trainerSignup', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: newTrainer.Email,
                Password: newTrainer.Password,
                FirstName: newTrainer.FirstName,
                LastName: newTrainer.LastName,
                Birthday: newTrainer.Birthday,
                GymId: AccountInfo.GymId
            }),
        })


        if (res.status === 200) {

            notify()
        } else {
            window.alert("error")
        }

    }

    console.log(newTrainer.Birthday)



    return (
        <>


            <div className={styles.add_trainer_container}>

                <div className={styles.add_trainer_header}>
                    <h1>Register New Trainer</h1>
                </div>

                <form onSubmit={(e) => CreateNewTrainer(e)}>
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

                            <input value={newTrainer.Email}
                                onChange={(e) => {
                                    setNewTrainer({ ...newTrainer, Email: e.target.value })
                                }} />
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div>
                            <span>First Name</span>

                            <input value={newTrainer.FirstName}
                                onChange={(e) => {
                                    setNewTrainer({ ...newTrainer, FirstName: e.target.value })
                                }} />
                        </div>

                    </div>

                    <div className={styles.container}>
                        <div>
                            <span>Last Name</span>

                            <input value={newTrainer.LastName}
                                onChange={(e) => {
                                    setNewTrainer({ ...newTrainer, LastName: e.target.value })
                                }} />
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <span>Password</span>

                            <input value={newTrainer.Password}
                                onChange={(e) => {
                                    setNewTrainer({ ...newTrainer, Password: e.target.value })
                                }} />
                        </div>

                    </div>
                    <div className={styles.container}>
                        <div>
                            <span>Birthday</span>
                            <div>
                                <DatePickers setNewTrainer={setNewTrainer} newTrainer={newTrainer} />
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