
const Stories = ({ imageUrl,title,author,summary }) => {
  const styles = {
    background: `url(${imageUrl})`,
    backgroundSize: `cover`,
    backgroundPosition: "center center",
    backgroundRepeat: `no-repeat`,
    backgroundClip: `padding-box`,
  };

 

   return (
       <div key="i" className="card-container" style={styles}>
        <div className="description">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <p>{summary} </p>
          <div className="meta-info">
             <p className="meta-author">{author}</p>
          </div>
        </div>
      </div>
   );
};

export default Stories;
