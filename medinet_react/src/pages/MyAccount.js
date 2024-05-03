import React from "react";
import { Link } from 'react-router-dom';
import '../styles/my_account.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyAccount = () => {

    return (
        <div >
            <div style={{width: '50%'}} >
                <h2><b>My profile</b></h2>
            </div>
            <ul className="text-align-left"  >
                <li><Link to={'/my-doctors'}><p><b>My Doctors</b></p></Link></li>
                <li><Link to={'/update-details'} ><p><b>Update my profile</b></p></Link></li>
                <li><Link to={'/notifications'} ><p><b>Notifications</b></p></Link></li>
                <li><Link to={'/bookings'} ><b>Bookings</b></Link></li>
                
            </ul>
        </div>
    )
};

export default MyAccount;