import React from 'react'


const PasswordRow = ({ closeAllEdits, setEditPassword }) => {

    const handleEditPassword = () => {
        closeAllEdits();
        setEditPassword(true);
    }

    return (
        <div className='row'>
            <div className='col l1 m1 s1'>
                <i className="material-icons prefix" style={{marginTop: '15px'}}>password</i>     
            </div>
            <div className='col l3 m3 s3'>
                <p>Password:</p>
            </div>
            <div className='col l6 m6 s6'>
                <p>****************</p>
            </div>
            <div className='col l2 m2 s2'>
                <span className="right"><button onClick={handleEditPassword} className="btn grey lighten-3"><i className="material-icons black-text">edit</i></button></span>
            </div>
        </div>
    )
}

export default PasswordRow