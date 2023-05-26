import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser, addUser } from "../Store/ActionCreators/UserActionCreators"

export default function Signup() {
    var [data, setdata] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
    var users = useSelector((state) => state.UserStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            var d = users.find((item) => item.username === data.username)
            if (d)
                alert("already taken")
            else {
                var item = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    addressline1: "",
                    addressline2: "",
                    addressline3: "",
                    pin: "",
                    city: "",
                    state: "",
                    pic: "",
                    role: "User",
                }
                dispatch(addUser(item))
                navigate("/login")
            }
        }
        else
            alert("Password and Confirm Password Doesnt Matched !!!")
    }
    useEffect(() => {
        dispatch(getUser())
    }, [])
    return (
        <>
            <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('assets/images/bg_6.jpg')" }}>
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center">
                            <div className="container-fluid w-100">
                                <div className='m-auto w-100' >
                                    <h5 className='text-center bg-secondary p-2 text-light'> Signup Section</h5>
                                    <form className='' onSubmit={postData} >
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type='text' name="name" id='name' onChange={getData} placeholder='Enter Full Name: ' className='form-control' />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type='text' name="username" id='username' onChange={getData} placeholder='Enter Usernamae: ' className='form-control' />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type='email' name="email" id='email' onChange={getData} placeholder='Enter Full Email Address: ' className='form-control' />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type='text' name="phone" id='Phone' onChange={getData} placeholder='Enter Phone Number: ' className='form-control' />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6 col-12">
                                                <input type='password' name="password" id='password' onChange={getData} placeholder='Enter Password: ' className='form-control' />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <input type='password' name="cpassword" id='cpassword' onChange={getData} placeholder='Enter Confirm  Password: ' className='form-control' />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <button className='btn btn-secondary w-100 btn-lg' type='submit'>SignUp</button>
                                        </div>
                                    </form>
                                    <Link className='text-dark' to="/login">Already User?Login to Your Account</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
