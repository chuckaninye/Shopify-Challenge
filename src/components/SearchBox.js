import React from 'react'

const SearchBox = (props) => {
    return (
        <div className="column"> 
            <input value={props.value} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Search..." />
        </div>
    )
}

export default SearchBox