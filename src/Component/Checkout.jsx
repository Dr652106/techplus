import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from "../Store/ActionCreators/UserActionCreators"
import { getCart ,deleteCart} from "../Store/ActionCreators/CartActionCreators"
import { addCheckout } from "../Store/ActionCreators/CheckoutActionCreators"

import BuyerProfile from './BuyerProfile'
export default function Checkout() {
    var [mode, setMode] = useState("COD")
    var users = useSelector((state) => state.UserStateData)
    var [user, setuser] = useState({})
    var dispatch = useDispatch()
    var [cart, setcart] = useState([])
    var [total, settotal] = useState(0)
    var [shipping, setshipping] = useState(0)
    var [final, setfinal] = useState(0)
    var carts = useSelector((state) => state.CartStateData)
    var navigate = useNavigate()
    function placeOrder() {
        var item = {
            userid: localStorage.getItem("userid"),
            paymentmode: mode,
            orderstatus: "Order Palced",
            paymentstatus: "Pending",
            time: new Date(),
            totalAmount: total,
            shippingAmount:shipping,
            finalAmount:final,
            products:cart
        }
        dispatch(addCheckout(item))
        for(let item of cart){
        dispatch(deleteCart({id:item.id}))
        }
        navigate("/confirmation")
    }
    function getData(e) {
        setMode(e.target.value)
    }
    function getAPIData() {
        dispatch(getUser())
        var data = users.find((item) => item.id === Number(localStorage.getItem("userid")))
        if (data)
            setuser(data)

        dispatch(getCart())
        data = carts.filter((item) => item.userid === localStorage.getItem("userid"))
        if (data) {
            setcart(data)
            var total = 0
            var shipping = 0
            var final = 0
            for (let item of data) {
                total = total + item.total
            }
            if (total > 0 && total <= 1000)
                shipping = 150
            final = total + shipping
            settotal(total)
            setshipping(shipping)
            setfinal(final)
        }


    }
    useEffect(() => {
        getAPIData()
    }, [users.length, carts.length])
    return (
        <>
            {/* <div class="hero-wrap hero-bread" style={{ backgroundImage: "url('assets/images/bg_6.jpg')" }}>
                <div class="container">
                    <div class="row no-gutters slider-text align-items-center justify-content-center">
                        <div class="col-md-9 ftco-animate text-center">
                            <p class="breadcrumbs"><span class="mr-2"><Link to="/">Home</Link></span> <span>Checkout</span></p>
                            <h1 class="mb-0 bread">Checkouts</h1>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="ftco-section w-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ftco-animate mb-3">
                            <BuyerProfile user={user} />
                        </div>
                        <div className="col-md-6 ftco-animate">
                            <h5 className='text-center bg-secondary text-light'>Cart Details</h5>
                            <div className="table-responsive">
                                <table className="mytable">
                                    <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>Product</th>
                                            <th>Color</th>
                                            <th>Storage</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => {
                                                return <tr key={index} className="text-center">
                                                    <td className="image-prod"><img src={`assets/productimages/${item.pic}`} height="75px" width="100px" className='rounded float-left' alt="" />{item.name}</td>
                                                    <td className="product-name">{item.color}</td>
                                                    <td className="product-name">{item.storage}</td>
                                                    <td className="price">&#8377;{item.price}</td>
                                                    <td className="qty">{item.qty}</td>
                                                    <td className="total">&#8377;{item.total}</td>

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className=" d-flex">
                                <div className="cart-detail cart-total bg-light p-3 p-md-4">
                                    <h3 className="billing-heading mb-4">Cart Total</h3>
                                    <p className="d-flex">
                                        <span>Subtotal</span>
                                        <span>&#8377;{total}</span>
                                    </p>
                                    <p className="d-flex">
                                        <span>Shipping</span>
                                        <span>&#8377;{shipping}</span>
                                    </p>
                                    <hr />
                                    <p className="d-flex total-price">
                                        <span>Final Amount</span>
                                        <span>&#8377;{final}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="cart-detail bg-light p-3 p-md-4 mt-2">
                                    <h3 className="billing-heading mb-4">Payment Method</h3>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <div className="radio">
                                                <label><input type="radio" onChange={getData} name="mode" className="mr-2" value="Net Banking" /> Net Banking / Card/UPI</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <div className="radio">
                                                <label><input type="radio" onChange={getData} name="mode" className="mr-2" value="COD" checked /> Cash On Delivery</label>
                                            </div>
                                        </div>
                                    </div>
                                    <p><button to="#" className="btn btn-primary w-100" onClick={placeOrder}>Place an order</button></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
