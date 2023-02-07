import React, {useEffect, useState} from 'react'
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase';
import Video from './Video';
import './Posts.css'
import Like from './Like';
import Like2 from './Like2'
import AddComment from './AddComment';
import Comments from './Comments';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
/*
    Like / Dislike working flow: 

    Like Button Clicked =>
    DB Update Called    =>
    onSnapshot() help we updated our post state data =>
    like useEffect run again =>
    and finally, updated like state.
*/


function Posts({userData}) {

    const [posts, setPosts] = useState(null);

    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(()=>{
        let parr = []
            const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc) => {
                let data = {...doc.data(), postId: doc.id}
                parr.push(data)
            })
            setPosts(parr);
        })
        return unsub
    }, [])
  return (
    <div>
        {
        posts == null || userData==null ? <CircularProgress/> :
        <div className='video-container'>
            {
                posts.map((post,index)=>(
                    <React.Fragment key={index}>
                        <div className= "videos">
                            <Video src={post.pUrl} />
                            <div className='fa' style={{display:'flex'}}>
                                <Avatar src={userData.profileUrl} />
                                <h4>{userData.fullName}</h4>
                            </div>
                                <Like userData={userData} postData={post}/>
                                <ChatBubbleIcon className="chat-styling" onClick={()=>handleClickOpen(post.pId)}/>
                           
                            <Dialog
                                open={open == post.pId}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth={true}
                                maxWidth='md'
                            >

                            <div className='modal-container' >
                                <div className='video-modal'>
                                        {/* <Video src={post.pUrl} className="modal-video" /> */}
                                        <video  autoplay={true} muted="muted" controls>
                                            <source src={post.pUrl}/>
                                        </video>
                                </div>
                                <div className='comment-modal'>
                                        <Card className='card1' style={{padding:'1rem'}}>
                                            <Comments postData={post}/>
                                        </Card>


                                        <Card variant="outlined" className='card2'>
                                            <Typography> {post.likes.length==0 ? '' : `Liked by ${post.likes.length} users`} </Typography>
                                            <div style={{display:'flex'}}>
                                                <Like2 postData={post} userData={userData} />
                                                <AddComment userData={userData} postData={post}/>
                                            </div>
                                        </Card>
                                </div>    
                            </div>
                               
                            </Dialog>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
        }
    </div>
  )
}

export default Posts
