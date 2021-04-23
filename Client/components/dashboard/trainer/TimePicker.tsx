import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 250,
        },
    }),
);

export default function DateAndTimePickers() {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date(2021, 3, 8, 14));

    console.log("YOOO", selectedDate)
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Start Date & Time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                value={selectedDate}
                onChange={(e: any) => handleDateChange(e.target.value)}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}