import ReactImageMagnify from "react-image-magnify";

function ProductImageMagnify({ currentProduct }) {
  const style = {
    zIndex: "1",
    backgroundColor: "#fff",
  };

  return (
    <div className="product__img">
      <ReactImageMagnify
        className="product__magnify"
        enlargedImageContainerStyle={style}
        {...{
          smallImage: {
            alt: currentProduct.title,
            isFluidWidth: true,
            src: currentProduct.imgUrl,
          },
          largeImage: {
            alt: currentProduct.title,
            src: currentProduct.imgUrl,
            width: 700,
            height: 700,
          },
          enlargedImagePosition: "over",
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
          // isHintEnabled: true
        }}
      />
    </div>
  );
}

export default ProductImageMagnify;
