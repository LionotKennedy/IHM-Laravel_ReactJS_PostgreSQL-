import React from 'react'
import { Box, Pagination } from "@mui/material";
const Paginate = (setPage,page=1) => {
    const handleChange = () =>{
        console.log(page);
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <>
            <div>
                <div>
                    <Pagination
                        onChange={(e) => handleChange(e.target.textContent) }
                     style={{
                        display: "flex",
                        justifyContent: "center"
                    }} variant="outlined" count={1}  />
                </div>
            </div>
        </>
    )
}

export default Paginate
