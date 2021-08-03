import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaExchangeAlt } from 'react-icons/fa';

export default function SimpleMenu({ setTab, tab }) {
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (name) => {
        if (name) {
            console.log(name)
            setTab(name)
            setAnchorEl(null);
        } else {
            setAnchorEl(null);
        }
    };

    return (
        <div>
            <Button variant="contained"
                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <FaExchangeAlt className="mx-1" /> <span className="mx-1">{tab}</span>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose("")}
            >
                <MenuItem onClick={() => handleClose("All")}>All</MenuItem>
                <MenuItem onClick={() => handleClose("Today")}>Today</MenuItem>
                <MenuItem onClick={() => handleClose("This Week")}>This Week</MenuItem>
                <MenuItem onClick={() => handleClose("Completed")}>Completed</MenuItem>
            </Menu>
        </div>
    );
}