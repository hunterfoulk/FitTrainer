import React, { useState, useEffect } from 'react'
import styles from "../../../styles/dashboard/RegisterClientTab.module.scss"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/material.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Image from 'next/image'
import axios from "axios";

interface Trainer {
    TrainerId?: number
    GymId?: number
    FirstName: string
    LastName: string
    Email: string
    Avatar?: File
    Birthday: string
    Mobile: string
    Goal: string
}
interface Props {
    AccountInfo: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        button: {
            margin: theme.spacing(1),
            height: 40,
            fontsize: "15px"
        },
        input: {
            display: 'none',
        },
        overrides: {
            MuiButton: {
                color: "white"
            },
        }
    }),
);




const RegisterClientTab: React.FC<Props> = ({ AccountInfo }) => {
    const classes = useStyles();
    const [form, setForm] = useState<Trainer>({
        Email: '',
        FirstName: '',
        LastName: '',
        Birthday: '',
        Mobile: '',
        Goal: '',
    })
    const [avatar, setAvatar] = useState(null)


    async function CreateClient(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("firstName", form.FirstName);
        formData.append("lastName", form.LastName);
        formData.append("email", form.Email);
        formData.append("mobile", form.Mobile);
        formData.append("birthday", form.Birthday);
        formData.append("goal", form.Goal);
        formData.append("trainerId", AccountInfo.TrainerId);
        formData.append("gymId", AccountInfo.GymId);

        let headers = {
            "Content-Type": "multipart/form-data",
        };

        const res = await axios.post(
            "http://localhost:9000/createNewClient",
            formData,
            {
                headers: headers,
                withCredentials: true,
            }
        )

        console.log("reponse", res)
        let data = res.data
        console.log("reponse data ", data)

        // console.log("data", data)
        // switch (status) {
        //     case 503:
        //         console.log('Database Error.')
        //         break;

        //     case 200:

        //         console.log("client created", data)
        //         break;
        //     default:
        //         break;
        // }
    }


    useEffect(() => {
        console.log("AVATAR", form.Avatar)
    }, [form.Avatar])
    return (
        <>
            <div className={styles.register_container}>
                <div className={styles.register_container_header}>
                    <span>Client Details</span>

                </div>
                <form onSubmit={(e) => CreateClient(e)}>

                    <div className={styles.form_content}>



                        <div className={styles.avatar_container}>
                            <span>Avatar</span>

                            <div className={styles.avatar}>
                                <img alt="Vercel logo" src="/images/defaultavatar.png" className="avatar" />
                            </div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"

                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                            <label htmlFor="contained-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>

                        <div className={styles.inputs_container}>

                            <div>

                                {/* <TextField id="standard-basic" label="First Name" /> */}
                                <span>First Name</span>
                                <TextField id="standard-basic" value={form.FirstName}
                                    onChange={(e) => {
                                        setForm({ ...form, FirstName: e.target.value })
                                    }} />


                            </div>

                            <div >

                                {/* <TextField id="standard-basic" label="Last Name" /> */}
                                <span>Last Name</span>

                                <TextField id="standard-basic" value={form.LastName}
                                    onChange={(e) => {
                                        setForm({ ...form, LastName: e.target.value })
                                    }} />

                            </div>

                            <div>
                                {/* <span>Email</span> */}
                                {/* <TextField id="standard-basic" label="Email" /> */}
                                <span>Email</span>
                                <TextField id="standard-basic" value={form.Email}
                                    onChange={(e) => {
                                        setForm({ ...form, Email: e.target.value })
                                    }} />
                            </div>

                            <div>
                                {/* <span>Birthday</span> */}
                                <span>Mobile</span>

                                <TextField id="standard-basic" value={form.Mobile}
                                    onChange={(e) => {
                                        setForm({ ...form, Mobile: e.target.value })
                                    }} />

                            </div>
                            <div>

                                <span>Date Of Birth</span>

                                <TextField
                                    id="date"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={form.Birthday}
                                    onChange={(e) => {
                                        setForm({ ...form, Birthday: e.target.value })
                                    }}
                                />

                            </div>
                            <div>
                                <span>Goal Workouts</span>

                                <TextField
                                    id="standard-number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={form.Goal}
                                    onChange={(e) => {
                                        setForm({ ...form, Goal: e.target.value })
                                    }}
                                />

                            </div>
                            <div style={{ alignItems: "center" }}>

                                <button onClick={(e: any) => CreateClient(e)}>

                                    Save
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterClientTab