import { RotatingLines } from "react-loader-spinner";

function TransparentLoader () {
  return (
    <div className="loader _transparent">
      <RotatingLines
        strokeColor="#60c403"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
}

export default TransparentLoader ;
