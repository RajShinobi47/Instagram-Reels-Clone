import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import insta from '../Assets/Instagram.JPG'
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import Avatar from '@mui/material/Avatar'

const useStyles = makeStyles({
    appb:{
        background:'white'
    }
})

export default function Navbar({userData}) {
    const navigate = useNavigate();
    const {logout} = React.useContext(AuthContext);
    const classes = useStyles();

    const handleProfile = () => {
        navigate(`/profile/${userData.uid}`);
    }

    const handleBannerClick = () => {
        navigate('/');
    }

    const handleExplore = () => {
        let win = window.open('login', 'blank');
        win.focus();
    }

    const handleLogout = async() => {
        await logout();
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{background:'white'}}>
                <Toolbar sx={{md:'flex',alignItems:'center'}}>
                     
                        <div>
                            <img src={insta} onClick={handleBannerClick} />
                        </div>
   

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        
                    </Typography>
                    
                    <HomeIcon onClick={handleBannerClick} cursor='pointer' sx={{color:'black', marginRight:'3rem'}} />
                    <ExploreIcon onClick={handleExplore} cursor='pointer' sx={{ color: 'black', marginRight:'2rem' }} />
                    <Button color="inherit" sx={{ color: 'black' }} onClick={handleProfile}><Avatar sx={{height:'3rem', width:'3rem'}} src={userData.profileUrl} /><p> &nbsp; Profile</p></Button>
                    <Button color="inherit" sx={{ color: 'black' }}  onClick={handleLogout}><ExitToAppIcon /><p> &nbsp; Logout</p></Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
