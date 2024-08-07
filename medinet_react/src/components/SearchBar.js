import React from "react";
import { useParams  } from 'react-router-dom'
import { useState, useEffect} from "react";

const SearchBar = ({ data, setSearchResults, details }) => {
    const [query, setQuery] = useState("");
    const { url } = useParams();

    console.log("data:", data)


    useEffect(() => {

        console.log("searchTem2;", query)

        if (data.length > 0){

            const filteredResults = data.filter((item) =>
            (item.username && item.username.toLowerCase().includes(query.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
            (item.speciality && item.speciality.toLowerCase().includes(query.toLowerCase())) ||
            (item.services && typeof item.services == 'string' &&
            item.services.toLowerCase().includes(query.toLowerCase())) ||
            (Array.isArray(item.services) && item.services.some(service => 
            typeof service.name == 'string' && service.name.toLowerCase().includes(query.toLowerCase())) )
            /*((item.speciality.toLowerCase().includes(query.toLowerCase()))*/)
            setSearchResults(filteredResults)

            console.log("filteredResults in sb:", filteredResults)
            console.log("url:", url)

        }
       
        },[query]);

        console.log("query:", query)



    return (
        <div className=" ms-auto align-items-center" style={{marginTop: '20px'}}>
            <input
                style={{width: '80%'}}
                type="text"
                placeholder={details}
                onChange={(e) => setQuery(e.target.value)}
                />
        </div>
    );
};

export default SearchBar;