import React, { useEffect, useRef, useState } from 'react';

import classes from './Notification.module.css';

export interface NotificationProps{
    message:string;
    color:string;
}

const Notification = (props:NotificationProps) =>{
    const dynamicClass = classes.notification + ' ' + classes[props.color];
    
    return (
        <div  className={dynamicClass}>
            <p className={classes.message}>{props.message}</p>
        </div>
    )
}

export default Notification;