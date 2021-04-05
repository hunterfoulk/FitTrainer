import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: "50%",
            backgroundColor: "red"
        },
        textField: {

            width: 300,
        },
    }),
);

export default function DatePickers() {
    const classes = useStyles();

    return (

        <TextField
            id="date"
            type="date"
            defaultValue="2015-05-24"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />

    );
}