import ActionMotorcycle from 'material-ui/svg-icons/action/motorcycle';
import React from 'react'
import { MdClose } from 'react-icons/md';
import styles from "../../../styles/dashboard/ProgramsTab.module.scss"

interface Props {
    state: any
    exerciseList: any
    addToList: any
    term: any
}

const List: React.FC<Props> = ({ exerciseList, addToList, term }) => {
    return (
        <>
            {exerciseList.filter(exercise => exercise.Name.toLowerCase().includes(term.toLowerCase())).map((item, i) => (
                <div className={styles.list_item} key={i} onClick={() => addToList(item)}>
                    <span>{item.Name}</span>
                </div>
            ))}

        </>
    )
}

export default List