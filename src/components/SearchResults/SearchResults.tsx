import React, { useContext } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { FormContext } from "../context/context";

const SearchResults = () => {
    const { data, isLoading } = useContext(FormContext);

    return (
        <Box mt={4}>
            <Typography variant="h3" color={data.error ? "error" : "primary"}>
                {data.message ? data.message : data.error}
                {isLoading && <CircularProgress />}
            </Typography>
        </Box>
    );
};

export default SearchResults;
