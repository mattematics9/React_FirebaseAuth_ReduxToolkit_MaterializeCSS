import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserFromStore } from '../../../../redux/slices/userSlice'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../config/firebaseConfig'
import EditPicture from './EditPicture'
import M from 'materialize-css/dist/js/materialize.min.js'

const Picture = () => {

    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [modalInstance, setModalInstance] = useState(null);

    const user = useSelector(getUserFromStore);
    const photoURL = user && user.photoURL? user.photoURL: null;

    useEffect(() => {
        if(photoURL){
            setUrl(photoURL);
        }else{
            try{
                (async () => {
                    const imageRef = ref(storage, 'images/profilePics/default.jpeg');
                    const URL = await getDownloadURL(imageRef);
                    setUrl(URL);
                    setError('');
                })()
            }catch(error){
                setError(error.message);
            }
        }
    }, [photoURL])

    useEffect(() => {
        var elems = document.getElementById('edit-picture-modal');
        var instance = M.Modal.init(elems, {
            onCloseEnd: () => {
                let form = document.getElementById('edit-picture-form');
                form.reset();
            }
        });
        setModalInstance(instance);
    }, [])


    return (
        <>
            <div id='profile-picture' style={{marginTop: '100px', position: 'relative', width: '100%'}}>
                <img src={url} alt="Profile Pic" className="responsive-img circle" style={{border: '1px solid black'}}/>
                <button data-target="edit-picture-modal" className='btn modal-trigger btn-floating purple darken-1' style={{position: 'absolute', top: '0px', left: '0px'}}><i className='material-icons'>photo_camera</i></button>
                <p className='red-text'>{error}</p>
            </div>
            <EditPicture modalInstance={modalInstance}/>
        </>

    )
}

export default Picture