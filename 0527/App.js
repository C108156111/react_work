import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ButtonGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green,orange } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles({
  root: {
    background:'liner-gradient(45deg,#333,#999)',
    border:0,
    borderRadius:15,
    color:'white',
    padding:'5px,30px',
    marginBottom:10,
  }, 
});

const outerTheme = createMuiTheme({
  palette:{
    primary:{
    main: green[400],
    },
    secondary: {
    main: orange[400],
    },
}
  });


function ButtonStyled(){
  const classes = useStyles();
  return(
    <Button className={classes.root}>
      ?
    </Button>
  )
}


function CheckboxEx(){
  const [checked, setChecked] = React.useState(true);
  return(
    <div>
      <FormControlLabel 
      control={<Checkbox checked={checked} 
      onChange={(e)=>setChecked(e.target.checked)}
      inputProps={{'aria-label':'secondary checkbox'}}
       />}
      label="測試"
    />
    </div>
  )
}


function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      
      <ThemeProvider theme={outerTheme}>
      <div className="App">
        
        <header className="App-header">
        <AppBar color="primary">
        <Toolbar>
          <IconButton>
            <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
          </IconButton>
          
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
         
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

       
        <Typography variant="h3" gutterBottom>
        ?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        根本來不及
        </Typography>
       
        
        <ButtonStyled />
        
        
        <TextField label="Standard" variant="outlined" type="date" placeholder="1911/01/01"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        />
          
          
          <CheckboxEx />
          
          
          <ButtonGroup>
          <Button startIcon={<SaveIcon />} size="medium" onClick={() => { alert('clicked') }} variant="contained" color="primary">
            太快了
          </Button>
          <Button
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >餓餓餓餓餓餓餓餓</Button>
        </ButtonGroup>
          <img src={logo} className="App-logo" alt="logo" />
          
        </header>
      </div>
      </ThemeProvider>
    );
  }

export default App;
