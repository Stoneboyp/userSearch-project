import React, { useContext, useState } from "react"
import { Button, Container, CircularProgress } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { FormContext } from "../context/context";

const SearchForm = () => {
    const { setData, setIsLoading } = useContext(FormContext)
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        number: Yup.string().matches(/\d{2}-\d{2}-\d{2}/, "Invalid number format"),
    });

    const handleSubmit = (values: any) => {
        setData(({}))
        setIsLoading(true)
        axios
            .get("/validation", { params: values })
            .then((response: { data: any; }) => {
                setData(response.data)
                setIsLoading(false)
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    const textFieldStyles = {
        borderRadius: "15px",
        marginRight: "10px",
        height: "35px",
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
            <Formik
                initialValues={{ email: "", number: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        style={textFieldStyles}
                    />
                    <ErrorMessage name="email" component="div" />

                    <Field
                        type="text"
                        name="number"
                        placeholder="Number"
                        style={textFieldStyles}
                        as={InputMask}
                        mask="99-99-99"
                    />
                    <ErrorMessage name="number" component="div" />

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>

                </Form>
            </Formik>


        </Container>
    );
};

export default SearchForm;
