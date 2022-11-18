function Error(props) {
    if(props.error) {
        return <div>{props.error}</div>; 
    }
    else {
        return "";
    }
}

export default Error;