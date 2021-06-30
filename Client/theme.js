import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                "& $notchedOutline": {

                },
                "&$focused $notchedOutline": {
                    outline: "none",
                    border: "none"
                },
                outline: "none",

            },
            notchedOutline: {}
        },
        MuiButton: {
            outline: "none",
            "&$active": {

                border: `1px solid red`,

                outline: `1px solid red` // this outline makes our "border" thicker without moving the component

            },
            outlined: {
                outline: "none",

            },
            outlinedPrimary: {
                outline: "none"
            },
            outline: "none"
        }
    },
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;