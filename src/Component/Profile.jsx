import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from "../Store/ActionCreators/UserActionCreators"
import { deleteWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"

import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators"

import BuyerProfile from './BuyerProfile'

export default function Profile() {
    var users = useSelector((state) => state.UserStateData)
    var [user, setuser] = useState({})
    var wishlists = useSelector((state) => state.WishlistStateData)
    var [wishlist, setwishlist] = useState([])
    var checkouts = useSelector((state) => state.CheckoutStateData)
    var [orders, setorders] = useState([])

    var dispatch = useDispatch()
    function deleteItem(id) {
        dispatch(deleteWishlist({ id: id }))
        getAPIData()
    }
    function getAPIData() {
        dispatch(getUser())
        dispatch(getWishlist())
        dispatch(getCheckout())
        var data = users.find((item) => item.id === Number(localStorage.getItem("userid")))
        if (data)
            setuser(data)

        data = wishlists.filter((item) => item.userid === localStorage.getItem("userid"))
        if (data)
            setwishlist(data)
        data = checkouts.filter((item) => item.userid === localStorage.getItem("userid"))
        if (data)
            setorders(data)
    }
    useEffect(() => {
        getAPIData()
    }, [users.length, wishlists.length, checkouts.length])
    return (
        <div className='ftco-section ftco-cart container-fluid'>
            <div className="row">
                <div className="col-md-6">
                    {
                        user.pic ?
                            <img src={`/assets/productimages/${user.pic}`} height="500px" width="100%" alt="" /> :
                            <img src={`/assets/images/noimage.jpg`} height="500px" width="100%" alt="" />
                    }
                </div>
                <div className="col-md-6">
                    <BuyerProfile user={user} />
                </div>
            </div>
            <h5 className='text-center  mt-3 border btn-dark  '>Wishlist Section</h5>
            <div className="table-responsive">
                <table className="mytable">
                    <thead className="thead-primary">
                        <tr className="text-center">
                            <th>Product</th>
                            <th>Color</th>
                            <th>Storage</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlist && wishlist.map((item, index) => {
                                return <tr key={index} className="text-center">
                                    <td className="image-prod"><img src={`assets/productimages/${item.pic}`} height="65px" width="80px" className='rounded float-left' alt="" />{item.name}</td>
                                    <td className="product-color">{item.color}</td>
                                    <td className="product-storage" width="20%" >{item.storage}</td>
                                    <td className="price">&#8377;{item.price}</td>

                                    <td><Link to={`/singleproductpage/${item.productid}`} onClick={() => deleteItem(item.id)} className='' style={{ background: "none", width: "30px" }}><i className="icon ion-ios-cart"></i></Link ></td>

                                    <td><button onClick={() => deleteItem(item.id)} className='' style={{ background: "none", width: "30px" }}><i className="icon ion-ios-trash"></i></button></td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <h5 className='text-center  mt-3 border btn-dark  '>Order History Section</h5>
            {
                orders.map((item, index) => {
                    return <div className="row" key={index}>
                        <div className="col-lg-3">
                            <table className='mytable'>
                                <tbody>
                                    <tr>
                                        <th>Order Id</th>
                                        <td>{item.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Id</th>
                                        <td>{item.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{item.paymentmode}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{item.orderstatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{item.paymentstatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Amount</th>
                                        <td>&#8377;{item.totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{item.shippingAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Final Amount</th>
                                        <td>&#8377;{item.finalAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{item.time}</td>
                                    </tr>
                                    <hr />
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-9">
                            <div className="table-responsive">
                                <table className="mytable">
                                    <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>Product</th>
                                            <th>Color</th>                                          
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.products.map((item, index) => {
                                                return <tr key={index} className="text-center">
                                                    <td className="image-prod"><img src={`assets/productimages/${item.pic}`} height="65px" width="70px" className='rounded float-left' alt="" />{item.name}</td>
                                                    <td className="product-color" width="10%" >{item.color}</td>
                                                    <td className="price">&#8377;{item.price}</td>
                                                    <td className="price">{item.qty}</td>
                                                    <td className="price">&#8377;{item.total}</td>
                                                </tr>

                                            })
                                        }
                                        <hr />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>


    )
}