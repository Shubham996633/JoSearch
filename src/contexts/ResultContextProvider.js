import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://bing-'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // 15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5
    // f0b1953657msh2679e8ad56f83a4p16212bjsn769263f527f
    const getResults = async (type) => {
        setIsLoading(true)
        console.log(type)
        if (type.search('image-search1.p.rapidapi.com') > -1) {
            console.log('hacked')
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": "15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5",
                        "X-RapidAPI-Host": 'bing-image-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            console.log(data)
            setResults(data)
            setIsLoading(false)
        } else if (type.search('news-search1.p.rapidapi.com') > -1) {
            console.log('hacked')
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": "15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5",
                        "X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            console.log(data)
            setResults(data)
            setIsLoading(false)
        }

        else if (type.search('video-search1.p.rapidapi.com') > -1) {
            console.log('hacked')
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": "15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5",
                        "X-RapidAPI-Host": 'bing-video-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            console.log(data)
            setResults(data)
            setIsLoading(false)
        }
        else {

            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": "15eef971dfmsha3593e18a102949p178aebjsn2f51369adcd5",
                        "X-RapidAPI-Host": 'bing-web-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            console.log(data)
            setResults(data)
            setIsLoading(false)
        }

        // const data = await response.json()
        // console.log(data)
        // setResults(data)
        // setIsLoading(false)

    }




    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}


export const UseResultContext = () => useContext(ResultContext)