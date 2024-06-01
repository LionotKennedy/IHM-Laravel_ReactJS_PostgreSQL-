
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const pageSize = 1;

export default function PaginationCard() {
    const [pagination, setPagination] = useState([]);
    const [paginations, setPaginations] = useState({
        count: 0,
        from: 0,
        to: pageSize,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get(`/api/display-contrat`, {
            params: {
                from: paginations.from,
                to: paginations.to,
            },
        }).then((response) => {
            if (response.data.status === 200) {
                setPagination(response.data.contrats);
                // console.log(response.data.contrats);
                setPaginations({
                    ...paginations,
                    count: response.count,
                });
            }
        });
        console.log(paginations);
    };
    const handlePageChange = (event, page) => {
        // const from = (value - 1) * pageSize;
        // const to = value * pageSize;
        // setPaginations({ ...paginations, from, to });

        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPaginations({ ...paginations, from, to });
    }

    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{ margin: "20px px" }}>
                <Pagination
                    count={Math.ceil(paginations.count / pageSize)}
                    // page={paginations.from / pageSize + 1}
                    // onChange={(event, value) => {
                    //     fetchData();
                    // }}
                    onChange={handlePageChange}
                    
                />
            </Box>

            {/* Affichage des données paginées */}
            {pagination.map((data, index) => (
                <div key={index}>
                </div>
            ))}
            {/* Afficher les données ici */}
        </>
    );
}
