import React, { useState } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, storage } from '../../../../config/firebaseConfig';
import { userProfileUpdated } from '../../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'firebase/auth';

const EditPicture = ({modalInstance}) => {

    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(image){
                const imageRef = ref(storage, `images/profilePics/${auth.currentUser.uid}`);
                await uploadBytes(imageRef, image);
                const photoURL = await getDownloadURL(imageRef);
                await updateProfile(auth.currentUser, { photoURL });
                dispatch(userProfileUpdated({ photoURL }));
                modalInstance.close();
            }else{
                setError('You must first choose an image before you submit.');
                setTimeout(() => {
                    setError('');
                }, 10000)
            }
        }catch(error){
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 10000)
        }

    }

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleRemoveCurrentPicture = async () => {
        try{
            await updateProfile(auth.currentUser, { photoURL: '' });
            const imageRef = ref(storage, `images/profilePics/${auth.currentUser.uid}`);
            deleteObject(imageRef);
            dispatch(userProfileUpdated({ photoURL: null }));
            modalInstance.close();
        }catch(error){
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 10000)
        }
    }

    return (

        <div id='edit-picture-modal' className='modal'>
            <div>
                <div className='container' style={{marginTop: '80px', position: 'relative'}}>
                    <form id='edit-picture-form' action="#">
                        <div className="file-field input-field">
                            <div className="btn orange-text grey lighten-4">
                                <span>File</span>
                                <input type="file" accept="image/*" onChange={handleChange}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload a new picture"/>
                            </div>
                        </div>
                        <div style={{marginTop: '30px', marginBottom: '50px'}}>
                            <button onClick={handleSubmit} className='btn-large'>SUBMIT PHOTO</button>
                            <p className='red-text'>{error}</p>
                        </div>
                    </form>
                </div>
                <button onClick={handleRemoveCurrentPicture} className='btn-small grey lighten-3 black-text' style={{position: 'absolute', top: '10px', right: '10px'}}>REMOVE CURRENT PICTURE</button>
            </div>
        </div>
    )
}

export default EditPicture