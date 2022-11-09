import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'
import { UseResultContext } from '../contexts/ResultContextProvider'
import { Loading } from './Loading'

export const Results = () => {
    function checker() {
        console.log(loaction.pathname)

        if (loaction.pathname === '/news') {
            console.log(loaction.pathname)
            getResults(`search/NewsSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=39&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`);

        }
        else {

            console.log(loaction.pathname)
            getResults(`Search/ImageSearchAPI?q=${searchTerm}&pageSize=40`);
        }
    }



    const { results, isLoading, getResults, searchTerm } = UseResultContext()
    const loaction = useLocation()

    useEffect(() => {
        if (searchTerm !== '') {
            if (loaction.pathname === '/search') {

                console.log(loaction.pathname)
                getResults(`Search/WebSearchAPI?q=${searchTerm}&pageSize=40`);
            } else {
                console.log('checking')

                checker()
            }




        }
    }, [searchTerm, loaction.pathname]);


    if (isLoading) return <Loading />

    switch (loaction.pathname) {
        case '/search':
            return (
                <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>

                    {console.log('search')}
                    {results?.value?.map(({ url, title, description }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={url} target="_blank">
                                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                                    {title}

                                </p>

                            </a>
                            <p className='text-sm text-green-900 dark:text-green-100'>
                                {url.length > 69 ? url.substring(0, 30) : url}
                            </p>

                            <p className='text-sm mt-3'>{description.length > 69 ? description.substring(0, 123) + '...' : description}</p>


                        </div>
                    ))}

                </div>
            )

        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {console.log('images')}

                    {results?.value?.map(({ url, thumbnail, title }, index) => (
                        <a href={url} target="_blank" key={index} className="sm:p-3 p-5">
                            <img src={thumbnail} alt={title} />
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                        </a>
                    ))}
                </div>
            );

        case '/news':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                    {console.log('news')}

                    {results?.value?.map(({ id, url, description, title }) => (

                        <div key={id} className="md:w-2/5 w-full ">

                            <a href={url} target="_blank" rel="noreferrer " className="hover:underline ">
                                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                            </a>
                            <div className="flex gap-4">
                                {description.length > 69 ? description.substring(0, 123) + '...' : description}
                            </div>
                        </div>
                    ))}
                </div>
            );




        default:
            return 'ERROR!'
    }
}
