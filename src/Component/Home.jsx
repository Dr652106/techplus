import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Newslatter from './Newslatter';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from "../Store/ActionCreators/ProductActionCreators"

export default function Home() {
  var product = useSelector((state) => state.ProductStateData)
  product.sort((x, y) => y.id - x.id)
  product = product.slice(0, 8)
  var dispatch = useDispatch()
  function getAPIData() {
    dispatch(getProduct())
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <>
      <section id="home-section" className="hero myslider ">

        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="assets/images/bg.1.jpg" height="600px" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="assets/images/bg.2.jpg" height="600px" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </section >

      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row no-gutters ftco-services">
            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
              <div className="media block-6 services p-2 py-md-2">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-bag"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Free Shipping</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
              <div className="media block-6 services p-2 py-md-2">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-customer-service"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Support Customer</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
              <div className="media block-6 services p-2 py-md-2">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-payment-security"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Secure Payments</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section bg-light p-1">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ftco-animate">
              <h2 className="mb-4">Latest Products</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {
              product.map((item, index) => {
                return <div key={index} className="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex">
                  <div className="product d-flex flex-column">
                    <Link target="_blank" to={`assets/productimages/${item.pic1}`} className="img-prod"><img className="img-fluid" src={`assets/productimages/${item.pic1}`} style={{ height: "250px", width: "100%" }} alt="" />
                      <span className="status">{item.discount}% Off</span>
                      <div className="overlay"></div>
                    </Link>
                    <div className="text py-3 pb-4 px-3">
                      <h3><a href={`/singleproductpage/${item.id}`}>{item.name}</a></h3>
                      <div className="pricing">
                        <p className="price"><span className="mr-2 price-dc">&#8377;{item.baseprice}</span><span className="price-sale">&#8377;{item.finalprice}</span></p>
                      </div>
                      <p className="bottom-area d-flex px-3">
                        <Link to={`/singleproductpage/${item.id}`} className="add-to-cart text-center py-2 mr-1"><span>Add to cart <i className="ion-ios-add ml-1"></i></span></Link>
                        {/* <a href="#" className="buy-now text-center py-2">Buy now<span><i className="ion-ios-cart ml-1"></i></span></a> */}
                      </p>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-choose ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="choose-wrap full-wrap img align-self-stretch d-flex align-item-center justify-content-end" style={{ backgroundImage: "url('assets/images/mob11.jpg')" }}>
                <div className="col-md-7 d-flex align-items-center">
                  <div className="text text-center text-white px-2">
                    <h2>Phone's Collection</h2>
                    <p>"Upgrade your tech game with our mobile sale Get your hands on the latest mobiles at discounted prices"</p>
                    <p><Link to="/shop/Phones" className="btn btn-black px-3 py-2">Shop now</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-choose ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-4">
              <div className="choose-wrap divider-one img p-5 d-flex align-items-end" style={{ backgroundImage: "url('assets/images/laptop4.jpg')" }}>
                <div className="text text-center text-white px-2">
                  <h2>Laptop's Latest Collection</h2>
                  <p>"Power up your work and play with our laptop discounts"</p>
                  <p><Link to="/shop/Laptops" className="btn btn-black px-3 py-2">Shop now</Link></p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row no-gutters choose-wrap divider-two align-items-stretch">
                <div className="col-md-12">
                  <div className="choose-wrap full-wrap img align-self-stretch d-flex align-item-center justify-content-end" style={{ backgroundImage: "url('assets/images/airbud9.jpg')" }}>
                    <div className="col-md-7 d-flex align-items-center">
                      <div className="text text-white px-5">
                        <h2>Earbuds's Collection</h2>
                        <p>"Earbuds that fit your style and budget"</p>
                        <p><Link to="/shop/Earbuds" className="btn btn-black px-3 py-2">Shop now</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <div className="choose-wrap wrap img align-self-stretch d-flex align-items-center" style={{ backgroundImage: "url('assets/images/watch6.jpg')" }}>
                        <div className="text text-center text-white px-5">
                          <h2>Extra 50% Off</h2>
                          <p> Well, Well, Well. Electronics Sale's Hear Grab 50% Off On Each Electronics</p>
                          <p><Link to="/shop/All" className="btn btn-black px-3 py-2">Shop now</Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="choose-wrap wrap img align-self-stretch d-flex align-items-center" style={{ backgroundImage: "url('assets/images/picture97.jpg')" }}>
                        <div className="text text-center text-white px-5">
                          <h2>HeadPhones</h2>
                          <p>"Wireless freedom, uninterrupted sound"</p>
                          <p><Link to="/shop/Headphones" className="btn btn-black px-3 py-2">Shop now</Link></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="ftco-section testimony-section p-3">
        <div className="container">
          <div className="services-flow row">
            <div className="services-2 p-4 d-flex ftco-animate col-lg-3 col-md-6 col-12">
              <div className="icon">
                <span className="flaticon-bag"></span>
              </div>
              <div className="text">
                <h3>Free Shipping</h3>
                <p className="mb-0">Separated they live in. A small river named Duden flows</p>
              </div>
            </div>
            <div className="services-2 p-4 d-flex ftco-animate col-lg-3 col-md-6 col-12">
              <div className="icon">
                <span className="flaticon-heart-box"></span>
              </div>
              <div className="text">
                <h3>Valuable Gifts</h3>
                <p className="mb-0">Separated they live in. A small river named Duden flows</p>
              </div>
            </div>
            <div className="services-2 p-4 d-flex ftco-animate col-lg-3 col-md-6 col-12">
              <div className="icon">
                <span className="flaticon-payment-security"></span>
              </div>
              <div className="text">
                <h3>All Day Support</h3>
                <p className="mb-0">Separated they live in. A small river named Duden flows</p>
              </div>
            </div>
            <div className="services-2 p-4 d-flex ftco-animate col-lg-3 col-md-6 col-12">
              <div className="icon">
                <span className="flaticon-customer-service"></span>
              </div>
              <div className="text">
                <h3>All Day Support</h3>
                <p className="mb-0">Separated they live in. A small river named Duden flows</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Newslatter />
    </>
  )
}
