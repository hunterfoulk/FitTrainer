import React, { useState } from 'react'
import styles from "../../../styles/dashboard/TrainerScheduleTab.module.scss"
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaReply } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';



interface Props {
    trainers: any
    AccountInfo: any
}

const TrainerScheduleTab: React.FC<Props> = ({ trainers, AccountInfo }) => {
    const [value, onChange] = useState(new Date());
    const [open, setOpen] = useState(true);
    const [tab, setTab] = useState("Schedule")


    const toolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }


    // moment.locale('en-GB');
    const localizer = momentLocalizer(moment)

    console.log("VALUE:", value)
    return (
        <>
            <div className={styles.bottom_container_left}>
                <div className={styles.banner_container}>


                    <div style={open ? null : { display: "none" }} className={styles.banner} >
                        <div className={styles.text_container}>
                            <h2>Welcome back to your dashboard, {AccountInfo.FirstName}! </h2>
                            <span>Here, you can see all your clients and schedule for the day.</span>
                            <span>Click add to schedule a or sign up new client.</span>
                        </div>
                        <div className={styles.image_container}>
                            <img src="/images/welcomeback.svg" />

                        </div>
                        < MdClose className={styles.close} onClick={() => setOpen(false)} />
                    </div>
                    <div className={styles.banner_button_container}>
                        <div className={styles.date}>
                            <span>Schedule</span>
                        </div>
                        <div className={styles.buttons}>
                            {/* <div onClick={() => setTab("Schedule")} style={tab === "Schedule" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}>Schedule <FiClock className={styles.banner_button_plus} /> </div> */}
                            <div onClick={() => setTab("Add")} style={tab === "Add" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}> <FiUserPlus className={styles.banner_button_plus} /> Add Client </div>
                            {/* <div onClick={() => setTab("Messenger")} style={tab === "Messenger" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}> Messenger <FaTelegramPlane className={styles.banner_button_plus} /></div>
                            <div onClick={() => setTab("Recents")} style={tab === "Recents" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}> Recents <FaReply className={styles.banner_button_plus} /></div>  */}
                        </div>


                    </div>
                </div>

                <div className={styles.content_container}>
                    <div style={{ height: "100%", width: "100%" }}>
                        <Calendar
                            localizer={localizer}
                            events={[
                                {
                                    'title': 'My event',
                                    'allDay': false,
                                    'start': new Date(2021, 3, 8, 10, 0), // 10.00 AM
                                    'end': new Date(2021, 3, 8, 14, 0), // 2.00 PM 
                                },
                                {
                                    'title': 'Test',
                                    'allDay': false,
                                    'start': new Date(2021, 3, 8, 10, 0), // 10.00 AM
                                    'end': new Date(2021, 3, 8, 14, 0), // 2.00 PM 
                                },
                                {
                                    'title': 'My event',
                                    'allDay': false,
                                    'start': new Date(2021, 3, 9, 10, 0), // 10.00 AM
                                    'end': new Date(2021, 3, 9, 14, 0), // 2.00 PM 
                                },
                                {
                                    'title': 'My event',
                                    'allDay': false,
                                    'start': new Date(2021, 3, 10, 10, 0), // 10.00 AM
                                    'end': new Date(2021, 3, 10, 14, 0), // 2.00 PM 
                                }

                            ]}
                            startAccessor="start"
                            endAccessor="end"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottom_container_right}>
                <div className={styles.calendar_container}>

                </div>
                <div className={styles.calendar_content_container}>

                </div>

            </div>
        </>
    )
}

export default TrainerScheduleTab