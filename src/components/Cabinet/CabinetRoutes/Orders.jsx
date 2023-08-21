import PaginatedItems from "../../CardsList/productPage";

function Orders() {
    return ( 
        <div>
            <ul>
                <PaginatedItems itemsPerPage={32 } pagination={true} />
            </ul>
        </div>
     );
}

export default Orders;