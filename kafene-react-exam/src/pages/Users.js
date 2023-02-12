import React from 'react';
import './Users.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {users_url} from '../Assets/APIEndpoints'

const userSearchUrl = users_url + "?fullName="
const Users = () => {
    const [users, setUsers] = useState([])
    const [resultUsers, setResultUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchTrigger, setSearchTrigger] = useState(false)
    useEffect(() =>{
        axios.get(users_url)
        .then(response =>{
            setUsers(response.data)
            setResultUsers(response.data)
        })
    },[])
    
    useEffect(() =>{
        axios.get(userSearchUrl + search)
        .then(response =>{
            setResultUsers(response.data)
        })
    },[searchTrigger])

    const handleKeyPress = (e) => {
        if(e.keyCode == '13'){
            if(search.length >= 2){
                searchTrigger ? setSearchTrigger(false) : setSearchTrigger(true)
            }
            else{
                alert('Please enter atlease 2 characters')
            }
        }
    }

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const handleReset =() =>{
        setResultUsers(users)
    }

    const handleSubmit = (e) => e.preventDefault()
    return ( 
        <>
            <main>
                <div className="Users-section" className="page-wrapper">
                    <h1>Users</h1>
                    <div className="users-wrapper" className="content-wrapper">
                        <form className="search-form" onSubmit = {handleSubmit}>
                            <input type="search" className="search" placeholder="Search by Name" onChange = {handleSearch} value={search} onKeyDown={handleKeyPress}/>
                            <input type="reset" className="reset" onClick={handleReset}/>
                        </form>
                        <div className="users-list">
                            <table className="users-table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Avatar</th>
                                        <th>Full Name</th>
                                        <th>DoB</th>
                                        <th>Gender</th>
                                        <th>Current Location</th>
                                    </tr>
                                    {resultUsers.map((item,idx )=> <TableRow key = {idx} users={item}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
     );
}
 
export default Users;

const TableRow = ({users}) => {
    const {currentCity, currentCountry, dob, fullName, gender, id, profilePic} = users
    const arr = dob.split("-")
    const dateStr = arr[0]+ " " + arr[1] + ", " + arr[2]
    return(
        <tr className="row">
            <td className="cell-secondary">{id}</td>
            <td className="cell-avatar"><img src={profilePic}/></td>
            <td className="cell-secondary">{fullName}</td>
            <td className="cell-primary">{dateStr}</td>
            <td className="cell-secondary">{gender}</td>
            <td className="cell-secondary">{`${currentCity} ,${currentCountry}`}</td>
        </tr>
    )
}