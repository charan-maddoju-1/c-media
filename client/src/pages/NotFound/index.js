import "./index.css"

const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const NotFound=()=>(
    <div className="not-found-container">
        <img 
            src={`${PF}icons/notFound.png`}
            alt="not-found"
            className="not-found-img"
        />
    </div>
)

export default NotFound;