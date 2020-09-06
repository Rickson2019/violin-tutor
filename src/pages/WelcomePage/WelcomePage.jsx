import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link,Redirect } from 'react-router-dom';

import PitchPractice from '../PitchPractice/PitchPractice'


// import {
//     BrowserRouter as Router,
//     Route,
//     Link
//   } from "react-router-dom";



  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function WelcomePage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
           <Tab label=" Perfect Pitch" {...a11yProps(0)} />
            <Tab label="Understand Symbols" {...a11yProps(1)} />
            <Tab label="Sight Reading Practice" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <PitchPractice /> */} 
          {value === 0 && <Redirect to='/pitch-practice/note-name-configuration'/>}
        </TabPanel>

        <TabPanel value={value} index={1}>
         {value === 1 && <Redirect to='/music-symbols-practice'/>}
        </TabPanel>

        <TabPanel value={value} index={2}>
        {value === 2 && <Redirect to='/sight-reading-practice'/>}
        </TabPanel>
      </div>
    );
  }