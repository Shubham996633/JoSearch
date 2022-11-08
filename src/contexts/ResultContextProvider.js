import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(`${baseUrl}${type}`,

            {
                method: 'GET',
                headers: {
                    "X-RapidAPI-Key": "15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5",
                    "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                }
            })

        const data = await response.json()
        console.log(data)
        setResults(data)
        setIsLoading(false)

    }




    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}


export const UseResultContext = () => useContext(ResultContext)