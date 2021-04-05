import React from 'react'
import styles from "../../styles/dashboard/SubscriptionsTab.module.scss";

interface Props {

}

const SubscriptionsTab: React.FC<Props> = ({ }) => {
    return (
        <>
            <div className={styles.subscriptions_tab_main}>
                <h1>Subscriptions Tab</h1>
            </div>
        </>
    )
}

export default SubscriptionsTab