import React, { useState, useEffect } from 'react'
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"
import { TiPencil } from 'react-icons/ti';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
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


const Profile = ({ AccountInfo }) => {
    const [profile, setProfile] = useState({
        TrainerId: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Mobile: "",
        Avatar: null

    })
    const [pic, setPic] = useState<any>();
    const [avatar, setPicFile] = useState<any>(null);
    const classes = useStyles();




    useEffect(() => {

        setProfile({
            TrainerId: AccountInfo.TrainerId,
            FirstName: AccountInfo.FirstName,
            LastName: AccountInfo.LastName,
            Email: AccountInfo.Email,
            Mobile: AccountInfo.Mobile || null,
            Avatar: AccountInfo.Avatar || null
        })
        setPic(AccountInfo.Avatar)
        // setPicFile(AccountInfo.Avatar)
    }, [])


    const editProfile = async () => {

        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("firstname", profile.FirstName);
        formData.append("lastname", profile.LastName);
        formData.append("email", profile.Email);
        formData.append("mobile", profile.Mobile);
        formData.append("id", profile.TrainerId);


        let headers = {
            "Content-Type": "multipart/form-data",
        };

        const res = await axios.post(
            "http://localhost:9000/editProfile",
            formData,
            {
                headers: headers,
                withCredentials: true,
            }
        )

        console.log("reponse", res)
        let data = res.data.data.AccountInfo
        console.log("DATA", res.data.data.AccountInfo)
        setProfile(res.data.data.AccountInfo)

    }

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


    return (
        <>
            <Layout AccountInfo={profile} role="Trainer">

                <div className=" w-full flex flex-col items-center p-2">
                    <div className="w-auto mt-20 rounded-md " style={{ boxShadow: "0 2px 6px rgb(0 0 0 / 15%)" }}>
                        <h1 className="text-3xl w-auto p-2 rounded-t-lg bg-[#000] text-white">Edit Profile</h1>
                        <div className="flex mt-10 justify-center mb-4">
                            <div className="p-2 ">
                                <label htmlFor="avatar">
                                    <div className="relative w-[110px] h-[110px] cursor-pointer ">
                                        <img src={pic ? pic : "/images/default1.jpg"} className="w-full h-full rounded-full shadow-lg" />
                                        <div className="absolute bg-[#ee2b45] w-[20px] h-[20px] bottom-0 right-[1px] flex justify-center items-center rounded-full">
                                            <TiPencil className="text-white" />
                                        </div>
                                    </div>
                                    <input onChange={handleEditProfilePic} type="file" id="avatar" className="hidden">

                                    </input>
                                </label>

                            </div>
                            <div className="flex flex-col py-5 px-4 w-auto">
                                <span className="text-3xl">{AccountInfo.FirstName} {AccountInfo.LastName}</span>
                                <span className="text-lg text-grey-300">Trainer</span>
                            </div>
                        </div>
                        <div className="flex p-2 flex-wrap justify-around min-h-[200px]">
                            <div className="w-[50%] flex justify-center items-center mb-2 flex-col">
                                <label className="mb-2">First Name</label>

                                <input type="text" className="w-[95%] h-[40px] bg-[#f3f3f3] text-lg rounded-md py-3 px-2 focus:outline-none focus:ring focus:border-blue-300 " onChange={(e) => {
                                    setProfile({ ...profile, FirstName: e.target.value })
                                }} value={profile.FirstName} placeholder={profile.FirstName} />

                            </div>
                            <div className="w-[50%] flex justify-center items-center mb-2 flex-col">
                                <label className="mb-2">Last Name</label>
                                <input onChange={(e) => {
                                    setProfile({ ...profile, LastName: e.target.value })
                                }} type="text" className="w-[95%] h-[40px] bg-[#f3f3f3] text-lg rounded-md py-3 px-2 focus:outline-none focus:ring focus:border-blue-300 " value={profile.LastName} placeholder={profile.LastName} />

                            </div>
                            <div className="w-[50%] flex justify-center items-center mb-2 flex-col">
                                <label className="mb-2">Email</label>

                                <input onChange={(e) => {
                                    setProfile({ ...profile, Email: e.target.value })
                                }} type="text" className="w-[95%] h-[40px] bg-[#f3f3f3] text-lg rounded-md py-3 px-2 focus:outline-none focus:ring focus:border-blue-300 " value={profile.Email} placeholder={profile.Email} />

                            </div>
                            <div className="w-[50%] flex justify-center items-center mb-2 flex-col ">
                                <label className="mb-2">Mobile</label>

                                <input onChange={(e) => {
                                    setProfile({ ...profile, Mobile: e.target.value })
                                }} type="text" className="w-[95%] h-[40px] bg-[#f3f3f3] text-lg rounded-md py-3 px-2 focus:outline-none focus:ring focus:border-blue-300 " value={profile.Mobile} placeholder={profile.Mobile ? profile.Mobile : "none"} />
                            </div>
                        </div>
                        <div className="flex justify-center mt-2 py-2">
                            <Button
                                onClick={() => editProfile()}
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}

                            >
                                Save
                            </Button>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )



}

export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie


    console.log("HEADERS", context.req?.headers)

    const response = await fetch('http://localhost:9000/accountInfo', {
        headers: {
            cookie: cookie!
        },

    });
    console.log("STATUS", response.status)
    if (response.status === 404) {

        return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }
    } else {
        const res = await response.json()
        console.log("profile response", res.data)


        return {
            props: {
                AccountInfo: res.data.AccountInfo,

            },
        }
    }
})


export default Profile