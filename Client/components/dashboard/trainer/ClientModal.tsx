import React, { useRef } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import useClickOutside from "../../hooks/useClickOutside"
import { MdClose } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'


const ClientModal = ({ isModalToggled, setModalToggled, clientDetails, state, dispatch }) => {
    const ref = useRef<any>();
    useClickOutside(ref, () => setModalToggled(false));

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }


    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {isModalToggled && (
                    <motion.div className="backdrop fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000]"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"

                    >
                        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="absolute w-full w-[500px] top-[15%] max-w-[95%] py-2 m-auto left-0 right-0 flex flex-col shadow-lg bg-white z-[1001] rounded-md px-2" >

                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className=" w-full flex justify-center items-center py-4 flex-col">
                                <div className="w-[80px] h-[80px] rounded-full shadow-lg mb-3">
                                    <span className=" absolute rounded-full p-2 right-[0px] top-[-5px] text-lg cursor-pointer hover:bg-[#f9f9f9]" onClick={() => setModalToggled(false)}><MdClose /></span>
                                    <span className=" absolute rounded-full p-2 right-[35px] text-red-500 top-[-5px] text-lg cursor-pointer hover:bg-[#f9f9f9]" onClick={() => {
                                        setModalToggled(false)
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#d33',
                                            cancelButtonColor: '#eeeeee',
                                            confirmButtonText: 'Yes, delete client!',

                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                dispatch({ type: "FILTER", id: clientDetails.ClientId });
                                                await fetch('http://localhost:9000/deleteClient', {
                                                    method: 'POST',
                                                    'credentials': 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({ ClientId: clientDetails.ClientId }),
                                                })

                                            }
                                        })
                                    }}><MdDelete /></span>
                                    <motion.img src={clientDetails.Avatar} className="w-[100%] h-[100%] rounded-full " />
                                </div>
                                <motion.span className="text-xl">
                                    {clientDetails.FirstName.charAt(0).toUpperCase() + clientDetails.FirstName.slice(1)} {clientDetails.LastName.charAt(0).toUpperCase() + clientDetails.LastName.slice(1)}
                                </motion.span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="w-full overflow-x-hidden px-5 justify-center flex">
                                <span className="text-lg mb-2">Goal</span>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="w-full overflow-x-hidden px-5 justify-center flex mb-3">


                                <motion.div className="progress-bar-striped max-w-[100%] ">
                                    <motion.div style={{ width: "33%" }}><b><p>33%</p></b></motion.div>
                                </motion.div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 1 }} exit={{ opacity: 0, y: 30 }} className="flex justify-around flex-wrap">
                                <div className="flex flex-col mb-2 flex-basis px-1">
                                    <span className="text-[#cf2121]">Email</span>
                                    <span className="text-[11px]">{clientDetails.Email}</span>
                                </div>
                                <div className="flex flex-col mb-2 flex-basis px-1">
                                    <span className="text-[#cf2121]">Contact</span>
                                    <span className="text-[11px]">{clientDetails.Mobile}</span>

                                </div>
                                <div className="flex flex-col mb-2 flex-basis px-1">
                                    <span className="text-[#cf2121]">Member Since</span>
                                    <span className="text-[11px]">{clientDetails.JoinDate.split('T')[0]}</span>

                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>

    )
}

export default ClientModal