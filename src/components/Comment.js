import React from "react";
import "./Comment.css";
import { getAuth } from "firebase/auth";

function Comment ({commentData}) {

const auth=getAuth();

    const data= commentData;
    const date= new Date (data.time);
    const formattedMinutes = ("0" + date.getMinutes()).slice(-2); // ensures that minutes are always two digits
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${formattedMinutes}`;



    return(
        <div className="main-box" >
            <div className="head">
              <span className="username">{data.user}</span> 
              <span className="date">{formattedDate}</span>
            </div>
            <div className="text" dangerouslySetInnerHTML={{ __html: data.comment }}/>
        </div>
    );

}

export default Comment;