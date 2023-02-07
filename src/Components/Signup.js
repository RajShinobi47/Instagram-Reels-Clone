import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Signup.css'
import insta from '../Assets/Instagram.JPG'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function Signup() {

    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '5vh',
            marginTop: '2%',  
        }
    })


    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const {signup} = useContext(AuthContext);

  // This function is for handling activities after the Sign Up Button is been clicked.
  const handleClick = async() =>{
    // If our file is null, i.e. user haven't uploaded his profile image first, then give error
    // that upload the profile image first for 2 seconds and then return.
    if(file==null){
      setError('Please upload profile image frist');
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
    }
    try{
      setError('');
      setLoading(true)
      // signup is coming from useContext give above.
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      console.log(uid);

      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on('state_changed', fn1, fn2, fn3);
      function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      }
      function fn2(error){
        setError(error);
        setTimeout(() => {
          setError('')
        }, 2000)
        setLoading(false);
        return;
      }
      function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
          console.log(url);
          database.users.doc(uid).set({
            email:email,
            userId: uid,
            fullName: name,
            profileUrl: url,
            createdAt: database.getTimeStamp()
          })
        })
        setLoading(false);
        history(`/`);
      }
    }catch(err){
      setError(err);
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  return (
    <div className='signupWrapper'>
        <div className='signupCard'>
              <Card variant="outlined">
                <div className='insta-logo'>
                    <img src={insta} />
                </div>
                  <CardContent>
                      <Typography className={classes.text1} variant="subtitle1">
                          Sign Up to see photos and videos from your friends
                      </Typography>
                      {error!='' && <Alert severity="error">{error}</Alert>}
                      {/*  fullWidth property help us to set our TextField into full width, and margin as dense will give dark contrast of outline. */}
                      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)} />
                     <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)}  />
                     <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)}  />
                      <Button size="small" variant="outlined" fullWidth={true} color="secondary" margin="dense" startIcon={<CloudUploadIcon/>} component="label">
                        Upload Profile Image
                        <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
                      </Button>
                  </CardContent>
                  <CardActions>
                      <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>Sign Up</Button>
                  </CardActions>
                  <CardContent>
                      <Typography className={classes.text1} variant="subtitle1">
                          By signing up, you agree to our Terms, Data Policy and Cookies Policy .
                      </Typography>
                  </CardContent>
              </Card>
              <Card variant="outlined" className={classes.card2}>
                  <Typography className={classes.text1} variant="subtitle1">
                      Having an account? <Link style={{textDecoration:'none'}} to="/login">Log In</Link>
                  </Typography>
              </Card>
        </div>
    </div>
    
  );
}