import { Grid } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader">
      <Grid
        height="50"
        width="50"
        color="#60c403"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
