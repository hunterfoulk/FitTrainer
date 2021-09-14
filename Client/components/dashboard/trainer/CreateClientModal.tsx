import React, { useState, useRef } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import useClickOutside from "../../hooks/useClickOutside"
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import { MdClose } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
// import DefaultAvatar from "./../../../public/images/defaultavatar.png
import {
    Input, Text, Stack, InputGroup, InputLeftElement, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"
import { PhoneIcon } from "@chakra-ui/icons"
import { EmailIcon } from "@chakra-ui/icons"
import { StarIcon } from "@chakra-ui/icons"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from "axios"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            backgroundColor: "#ee2b45",
            '&:hover': {
                backgroundColor: "#dd253e",
                color: '#FFF'
            }
        },
    }),
);


const CreateClientModal = ({ isCreateModalToggled, setCreateModalToggled, AccountInfo, dispatch }) => {
    const ref = useRef<any>();
    useClickOutside(ref, () => setCreateModalToggled(false));
    const [pic, setPic] = useState<any>(null);
    const [avatar, setPicFile] = useState<any>(null);
    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    const classes = useStyles();
    const [form, setForm] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        Birthday: '',
        Mobile: '',
    })
    const [Goal, setValue] = React.useState(0)
    const handleChange = (goal) => setValue(goal)


    const handleEditProfilePic = async (e: any) => {
        let reader = new FileReader();
        const file = e.target.files[0];

        if (file) {
            console.log("new pic", file);

            console.log(reader);
            reader.onloadend = () => {
                setPic(reader.result);
                setPicFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const Clear = () => {
        setPic(null);
        setPicFile(null);
        setCreateModalToggled(false)
        setForm({
            Email: '',
            FirstName: '',
            LastName: '',
            Birthday: '',
            Mobile: '',

        })
        setValue(0)
    }


    async function CreateClient(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("firstName", form.FirstName);
        formData.append("lastName", form.LastName);
        formData.append("email", form.Email);
        formData.append("mobile", form.Mobile);
        formData.append("goal", Goal.toString());
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
        ) as any

        console.log("reponse", res)


        switch (res.status) {
            case 503:
                console.log('Database Error.')
                break;

            case 200:
                setForm({
                    Email: '',
                    FirstName: '',
                    LastName: '',
                    Birthday: '',
                    Mobile: ''

                })
                setValue(0)
                console.log("res data", res.data.data.newClient)
                dispatch({ type: "UPDATE", client: res.data.data.newClient });
                setCreateModalToggled(false)
                setPic(null)
                break;
            default:
                break;
        }
    }

    console.log("goal", Goal)
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {isCreateModalToggled && (
                    <motion.div className="backdrop fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000]"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"

                    >
                        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="absolute w-full w-[500px] top-[15%] max-w-[95%] m-auto left-0 right-0 flex flex-col shadow-lg z-[1003] rounded-md" >
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="relative w-full bg-black py-3 text-white flex justify-center items-center rounded-t-md">
                                <span className="text-lg">Create Client</span>
                                <span className=" absolute rounded-full p-2 right-[0px] top-[0px] text-lg cursor-pointer hover:bg-[#f9f9f9] " onClick={() => Clear()}><MdClose /></span>

                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="bg-[white] w-full flex justify-center items-center p-4 ">

                                <label htmlFor="select-avatar" className="relative cursor-pointer">
                                    <img className={pic ? `max-w-[55px] h-[55px] rounded-full shadow-md ` : `max-w-[55px] h-[55px]`} src={pic ? pic : "/images/defaultavatar.png"} alt="Pic" />
                                    <FaCamera className="absolute text-[black] text-[14px] z-[10] bottom-[0px] right-[0px] " />
                                </label>

                                <input
                                    id="select-avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditProfilePic}
                                    style={{ display: "none" }}
                                />
                            </motion.div>
                            <motion.div className="bg-[white] w-full flex flex-col px-2 justify-center items-center py-6">

                                <Stack spacing={3} className="w-full max-w-[80%] justify-center ">
                                    <Text >First Name</Text>
                                    <InputGroup size="sm">
                                        <InputLeftElement
                                            className="text-black-300"
                                            pointerEvents="none"
                                            children={<MdPerson color="gray.300" />}
                                        />
                                        <Input type="tel" placeholder="First Name" value={form.FirstName}
                                            onChange={(e) => {
                                                setForm({ ...form, FirstName: e.target.value })
                                            }} />
                                    </InputGroup>

                                    <Text >Last Name</Text>
                                    <InputGroup size="sm">
                                        <InputLeftElement
                                            className="text-black-300"
                                            pointerEvents="none"
                                            children={<MdPerson color="gray.300" />}
                                        />
                                        <Input type="tel" placeholder="Last Name" value={form.LastName}
                                            onChange={(e) => {
                                                setForm({ ...form, LastName: e.target.value })
                                            }} />
                                    </InputGroup>


                                    <Text>Email</Text>
                                    <InputGroup size="sm">
                                        <InputLeftElement
                                            className="text-black-300"
                                            pointerEvents="none"
                                            children={<EmailIcon />}
                                        />
                                        <Input type="tel" placeholder="Email" value={form.Email}
                                            onChange={(e) => {
                                                setForm({ ...form, Email: e.target.value })
                                            }} />
                                    </InputGroup>

                                    <Text>Mobile</Text>
                                    <InputGroup size="sm">
                                        <InputLeftElement
                                            className="text-black-300"
                                            pointerEvents="none"
                                            children={<PhoneIcon />}
                                        />
                                        <Input value={form.Mobile}
                                            onChange={(e) => {
                                                setForm({ ...form, Mobile: e.target.value })
                                            }} type="tel" placeholder="Mobile" />
                                    </InputGroup>


                                    <Text >Goal Workouts</Text>
                                    <NumberInput size="sm" mx={5} value={Goal} onChange={handleChange}
                                    >
                                        <NumberInputField
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        style={{ marginBottom: "8px" }}
                                        startIcon={<SaveIcon />}
                                        onClick={(e: any) => CreateClient(e)}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default CreateClientModal