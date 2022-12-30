import React, { useEffect, useState } from 'react';
import EditEmailRow from './email/EditEmailRow';
import EmailRow from './email/EmailRow';
import EditNameRow from './name/EditNameRow'
import NameRow from './name/NameRow'
import PasswordRow from './password/PasswordRow';
import EditPasswordRow from './password/EditPasswordRow';
// import EditPhoneNumberRow from './phoneNumber/EditPhoneNumberRow';
// import PhoneNumberRow from './phoneNumber/PhoneNumberRow';

const Settings = () => {

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  // const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  useEffect(() => {
    if(editName){
      document.getElementById('edit-name-row').scrollIntoView();
    }
    if(editEmail){
      document.getElementById('edit-email-row').scrollIntoView();
    }
    if(editPassword){
      document.getElementById('edit-password-row').scrollIntoView();
    }
    // if(editPhoneNumber){
    //   document.getElementById('edit-phone-number-row').scrollIntoView();
    // }
  }, [editName, editEmail, editPassword])

  const closeAllEdits = () => {
    setEditEmail(false);
    setEditName(false);
    setEditPassword(false);
    // setEditPhoneNumber(false);
  }

  return (
    <div className='container' style={{paddingTop: '150px'}}>
        <h3 className='center'>SETTINGS</h3>
        <div style={{marginTop: '60px'}}>
            {editName?
              <EditNameRow closeAllEdits={closeAllEdits}/>:
              <NameRow setEditName={setEditName} closeAllEdits={closeAllEdits}/>
            }
            {editEmail? 
              <EditEmailRow closeAllEdits={closeAllEdits}/>:
              <EmailRow setEditEmail={setEditEmail} closeAllEdits={closeAllEdits}/>
            }
            {editPassword?
              <EditPasswordRow closeAllEdits={closeAllEdits}/>:
              <PasswordRow setEditPassword={setEditPassword} closeAllEdits={closeAllEdits}/>
            }
            {/* {editPhoneNumber?
              <EditPhoneNumberRow closeAllEdits={closeAllEdits}/>:
              <PhoneNumberRow setEditPhoneNumber={setEditPhoneNumber} closeAllEdits={closeAllEdits}/>
            } */}
        </div> 
    </div>
  )
}

export default Settings