import React, { createContext, useContext, useState } from 'react'
import api_key from '../components/api'

const ResultContext = createContext()
const baseUrl = 'https://bing-'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const getResults = async (type) => {
        setIsLoading(true)
        if (type.search('image-search1.p.rapidapi.com') > -1) {
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": api_key,
                        "X-RapidAPI-Host": 'bing-image-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            setResults(data)
            setIsLoading(false)
        } else if (type.search('news-search1.p.rapidapi.com') > -1) {
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": api_key,
                        "X-RapidAPI-Host": 'bing-news-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            setResults(data)
            setIsLoading(false)
        }

        else if (type.search('video-search1.p.rapidapi.com') > -1) {
            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": api_key,
                        "X-RapidAPI-Host": 'bing-video-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            setResults(data)
            setIsLoading(false)
        }
        else {


            const response = await fetch(`${baseUrl}${type}`,

                {
                    method: 'GET',
                    headers: {
                        "X-RapidAPI-Key": api_key,
                        "X-RapidAPI-Host": 'bing-web-search1.p.rapidapi.com'
                    }
                })

            const data = await response.json()
            setResults(data)
            setIsLoading(false)
        }



    }




    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}


export const UseResultContext = () => useContext(ResultContext)