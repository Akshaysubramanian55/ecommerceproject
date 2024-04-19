import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams, } from 'react-router-dom';
import Seller from './Components/Seller/Seller';
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import GetProduct from './Components/Listing/Listing';
import Buyer from './Components/Buyer/Buyer';
import EditProduct from './Components/Productdetails/Productdetails';
import CartProduct from './Components/Cart/Cart';
import Cart from './Components/Cartdetails/Cartdetails';
function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/signup' exact element={<Signup />} />
            <Route path='/signin' exact element={<Signin />} />
            <Route path='/seller' exact element={<Seller />} />
            <Route path='/getproducts' exact element={<GetProduct />} />
            <Route path='/' exact element={<Buyer />} />
            <Route path='/getproduct/:productId' exact element={<EditProduct />} />
            <Route path='/cartproduct/:productId' exact element={<CartProduct />} />

            <Route path='/cartdetails' exact element={<Cart/>}/>
          </Routes>
        </div>
      </Router>

    </>
  )
}

export default App
