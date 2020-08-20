import React, { useState } from 'react';
import {
  makeStyles,
  Fab,
} from '@material-ui/core';
import {
  useHistory
} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  fab: {
    background: 'linear-gradient(310deg, #EC4BC8 15%, #4535FF 80%)',
    color: 'white',
    transform: 'scale(1.4)',
    position: 'fixed',
    bottom: theme.spacing(8),
    right: theme.spacing(8),
  },
}));

const AddButton = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/addnew')
  }

  return (
    <div >
      <Fab className={classes.fab} size='large' >
        <AddIcon onClick={handleClick} />
      </Fab>
    </div >
  );
}

export default AddButton;