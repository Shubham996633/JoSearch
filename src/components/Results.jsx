import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'
import { UseResultContext } from '../contexts/ResultContextProvider'
import { Loading } from './Loading'

export const Results = () => {
    function checker() {
        console.log(loaction.pathname)

        if (loaction.pathname === '') {
            console.log('hat bein')

        }
        else if (loaction.pathname === '/images') {
            console.log(loaction.pathname)
            getResults(`image-search1.p.rapidapi.com/images/search?q=${searchTerm}&count=40`);


        } else if (loaction.pathname === '/videos') {
            console.log('Video Hackes')
            getResults(`video-search1.p.rapidapi.com/videos/search?q=${searchTerm}&count=24`);

        } else {

            console.log(loaction.pathname)
            // getResults(`image-search1.p.rapidapi.com/images/search?q=${searchTerm}&count=40`);
            getResults(`news-search1.p.rapidapi.com/news/search?q=${searchTerm}&count=24`);

        }
    }



    const { results, isLoading, getResults, searchTerm } = UseResultContext()
    const loaction = useLocation()

    useEffect(() => {
        if (searchTerm !== '') {
            if (loaction.pathname === '/search') {

                console.log(loaction.pathname)
                getResults(`web-search1.p.rapidapi.com/search?q=${searchTerm}&count=39`);
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
                    {results?.webPages?.value?.map(({ url, name, displayUrl, snippet }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={url} target="_blank" rel="noreferrer " >
                                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                                    {name}

                                </p>

                            </a>
                            <p className='text-sm text-green-900 dark:text-green-100'>
                                {displayUrl.length > 69 ? displayUrl.substring(0, 30) : displayUrl}
                            </p>

                            <p className='text-sm mt-3'>{snippet.length > 69 ? snippet.substring(0, 123) + '...' : snippet}</p>


                        </div>
                    ))}

                </div>
            )

        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {console.log('yo')}
                    {console.log('images')}

                    {results?.value?.map(({ contentUrl, thumbnailUrl, name }, index) => (
                        <a href={contentUrl} target="_blank" key={index} className="sm:p-3 p-5" rel="noreferrer ">
                            <img src={thumbnailUrl} alt={name} />
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{name}</p>
                        </a>
                    ))}
                </div>
            );




        case '/videos':
            return (
                <div className="flex flex-wrap ">
                    {results?.value?.map(({ hostPageUrl, name, creator, videoId }) => (
                        <div key={videoId} className="p-2">
                            <ReactPlayer url={hostPageUrl} controls width="355px" height="200px" />
                            <a href={hostPageUrl} target="_blank" rel="noreferrer " className="hover:underline ">

                                <p className="text-lg dark:text-blue-300 text-blue-700">{name.length > 30 ? name.substring(0, 45) + '...' : name}</p>
                                <p className="text-lg dark:text-blue-300 text-blue-700 font-medium	">By {creator?.name}</p>
                            </a>

                        </div>
                    ))}
                </div>
            );

        case '/news':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                    {console.log('news')}

                    {results?.value?.map(({ url, description, name }, index) => (

                        <div key={index} className="md:w-2/5 w-full ">

                            <a href={url} target="_blank" rel="noreferrer " className="hover:underline ">
                                <p className="text-lg dark:text-blue-300 text-blue-700">{name}</p>
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
