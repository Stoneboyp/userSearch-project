import React, { createContext, useState, } from "react"

export const FormContext = createContext<FormContextType>({
    data: {},
    setData: function (): {} {
        throw new Error("Function not implemented.")
    },
    isLoading: false,
    setIsLoading: () => { }
})

export const FormContextProvider = ({ children }: any) => {
    const [data, setData] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    return (
        <FormContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
            {children}
        </FormContext.Provider>
    )
}

type FormContextType = {
    data: Record<string, string>
    setData: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}