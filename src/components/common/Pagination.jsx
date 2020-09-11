import React from 'react'
import _ from 'lodash'


const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange}) => {

    const pagesCount = Math.ceil( itemsCount / pageSize )

    const pages = _.range(1, pagesCount + 1 )
    return ( 
        <ul className="pagination justify-content-center">
        {
            pages.map(page => (
                
                <li key={page}
                className={ currentPage === page ? "page-item active": "page-item" }
                onClick={() => onPageChange(page)}
                >
                    <span className="page-link clickable">
                    {page}
                    </span>
                </li>
            ))           
        }
        </ul> 
     );
}
 
export default Pagination;