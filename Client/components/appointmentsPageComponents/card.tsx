import React from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Moment from 'react-moment';
import { FiClock } from 'react-icons/fi';
import { FaRegCalendar } from 'react-icons/fa';

const Card = ({ item, index, isToggled, setToggled, dispatch }) => {

    let itemyo = item.startDate.split('T')[0]
    console.log("itemyo", itemyo)


    return (
        <>
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.1, delay: index / 15 }} className="rounded-sm mb-6 mx-2 min-w-[330px] max-w-[400px] bg-white flex flex-col" style={{ boxShadow: "0 0 8px rgba(0,0,0,0.12)" }}>
                <div className={item.completed ? "px-4 py-3 w-full flex justify-between text-[#414141] border-t-[7px] border-[#149414] rounded-t-sm" : "px-4 py-3 w-full flex justify-between text-[#414141] border-t-[7px] border-gray-400 rounded-t-sm"}>
                    <span className="text-[16px] font-semibold">{item.title}</span>
                    <span className={item.completed ? "text-[#149414]" : "text-red-500"}>{item.completed ? "Completed" : "Not Completed"}</span>
                </div>
                <div className="px-4 py-3 w-full flex flex-row items-center text-[#414141]">
                    <FiClock className="mr-2" />
                    {/* <Moment format="dddd, MMMM Do YYYY">{item.startDate}</Moment> */}
                    <Moment date={item.startDate} format="hh:mm A" className="mr-1" /> - <Moment date={item.endDate} format="hh:mm A" className="ml-1" />
                </div>
                <div className="px-4 py-3 flex flex-row justify-between">

                    <div className="flex flex-row items-center py-1 text-[#414141]">
                        <FaRegCalendar className="mr-2" />
                        <Moment format="dddd, MMMM Do YYYY">{item.startDate}</Moment>
                    </div>
                    <div className="flex items-center justify-center text-[#649CEA] cursor-pointer hover:underline">
                        <span onClick={async () => {
                            dispatch({ type: "SET_APPOINTMENT", item: item });
                            setToggled(true)
                        }}>View More</span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Card