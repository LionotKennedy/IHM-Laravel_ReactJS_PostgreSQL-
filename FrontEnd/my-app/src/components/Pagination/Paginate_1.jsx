import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const Paginate_1 = (propos) => {

    // ************* PAGINATE ***************//
    
    // const [currentPage, setCurrentPage] = useState(0);
    // const itemsPerPage = 7; //
    // const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);
    
    // ************* ENDING ***************//+

    const { contrats } = propos;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 2;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(contrats.slice(itemOffset, endOffset));
        setPageCount(Math.ciel(contrats.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, contrats]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % contrats.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Paginate_1
