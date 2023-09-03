import ReactStars from "react-rating-stars-component";
 
const ratingChanged = (newRating) => {
  console.log(newRating);
};

function Rating({edit=true, className}) {
    console.log(className)
    return ( 
        <ReactStars
        edit={edit}
        count={5}
        onChange={ratingChanged}
        size={21}
        color="#9b9b9b"
        activeColor="#ffa700"
        value={4}
        classNames={className || ""}
      />
     );
}

export default Rating;