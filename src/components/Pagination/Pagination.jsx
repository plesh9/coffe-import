import ReactPaginate from "react-paginate";
import "./_pagination.scss"

function Pagination({pageCount, handlePageClick}) {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      pageRange={4}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName={'navigation'}
      pageLinkClassName={'navigation__link'}
      previousLinkClassName={"navigation__link navigation__link-previous"}
      nextLinkClassName={"navigation__link navigation__link-next"}
      activeLinkClassName={'navigation__link navigation__link-active '}
      disabledLinkClassName={'navigation__link navigation__link-disabled'}
      breakLinkClassName={'navigation__link navigation__link-break'}
    />
  );
}

export default Pagination;
