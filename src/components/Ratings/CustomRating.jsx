function CustomRating({ className }) {
  return (
    <div className={`${className ? className : ''} rating`}>
      <span className="rating__star rating__star-active"></span>
      <span className="rating__star rating__star-active"></span>
      <span className="rating__star rating__star-active"></span>
      <span className="rating__star rating__star-active"></span>
      <span className="rating__star"></span>
    </div>
  );
}

export default CustomRating;
