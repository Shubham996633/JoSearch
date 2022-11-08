import React from 'react'

const Footer = () => {
    const date = new Date()
    let year = date.getFullYear()

    return (
        <div className='text-center p-10 mt-10 border-t dark:boder-gray-700 border-gray-200'>{year} JoGoogle </div>
    )
}

export default Footer