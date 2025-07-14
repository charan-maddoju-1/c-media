import "./message.css"
import {format} from "timeago.js"

export default function Message(props) {
  const {own,message}=props;

  return (
    <div className={own==="yes" ? "message own": "message"}>
        <div className="messageTop">
            <img src="http://localhost:3000/assets/profile-pics/profile1.png" alt="" className="messageImage" />
            <p className="messageText">{message.text.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
            </p>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}
