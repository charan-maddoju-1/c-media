import "./index.css"


const NotFound=()=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="not-found-container">
            <img 
                src={`${PF}icons/notFound.png`}
                alt="not-found"
                className="not-found-img"
            />
        </div>
    )
}

export default NotFound;