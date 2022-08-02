import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoAddSharp, IoRemoveOutline } from "react-icons/io5";
import SnackbarComponent from "./SnackbarComponent";
import styled from "styled-components";
import {
  YourCart,
  ItemsNum,
  EmptyCart,
  Review,
  ItemDetails,
  ItemRow,
  ItemHeader,
  ItemData,
  ItemName,
  ItemPrice,
  ItemPic,
  ChangeQuantity,
  Cost,
  CostDetails,
  CostRow,
  CostTotal,
  CostHeader,
  CostData,
  AddToCart,
} from "./ReviewCartPage/reviewCartStyledComponents";

import { addToCart } from "../handlers/addToCart";
import PriceSummary from "./ReviewCartPage/PriceSummary";

// ------------------------------------------------

const ReviewCartPage = () => {
  let navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false); // for Snackbar

  const [cartItems, setCartItems] = useState(null); // Array of item ID #s
  const [cartItemsArray, setCartItemsArray] = useState([]); // Array of item data
  let cartItems1 = []; // empty array of items to be pushed into
  let total = 0;

  const userId = "abc12321"; // hard-coded user, until we can create new users

  //Calculate the total price of the order
  const totalCost = () => {
    if (cartItemsArray.length) {
      cartItems.forEach((cartItem) => {
        cartItemsArray.forEach((item) => {
          if (item._id === cartItem.itemId) {
            total =
              total +
              cartItem.quantity * parseFloat(item.price.replace("$", ""));
          }
        });
      });
    }
    return total.toFixed(2);
  };

  // GET item ID #s of all items in the user's cart,
  const getCartDetails = async () => {
    const response = await fetch(`/api/all-items-in-cart/${userId}`);
    const data = await response.json();
    setCartItems(data.data.items);
  };

  // GET cart details on mount
  useEffect(() => {
    getCartDetails();
  }, []);

  // GET data for each item in the cart (using item ID #s received above)
  useEffect(() => {
    if (cartItems) {
      Promise.all(
        cartItems.map((item) =>
          fetch(`/api/item/${item.itemId}`).then((resp) => resp.json())
        )
      ).then((data) => {
        data.forEach((item) => {
          cartItems1.push(item.data);
        });
        setCartItemsArray(cartItems1);
      });
    }
  }, [cartItems]);

  // DELETE item from the cart
  const handleRemove = (_id) => {
    fetch("/api/delete-item-in-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        item: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setSnackbarOpen(true);
          getCartDetails();
        }
      });
  };

  // ADD item to cart
  const handleAdd = (_id) => {
    fetch(`/api/add-item-in-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        item: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          setSnackbarOpen(true);
          getCartDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ------------------------------------------------
  return (
    <div>
      <SnackbarComponent
        message="Cart modified"
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
      {cartItems && (
        <YourCart>
          Your Shopping Cart <ItemsNum>({cartItems.length})</ItemsNum>
        </YourCart>
      )}
      {cartItems && (
        <Review>
          {/* Conditional rendering of Item Details table */}
          {cartItems.length === 0 ? (
            <EmptyCart>There is nothing in your cart</EmptyCart>
          ) : (
            <ItemDetails>
              <tbody>
                <ItemRow>
                  <ItemHeader></ItemHeader>
                  <ItemHeader>PRODUCT</ItemHeader>
                  <ItemHeader>PRICE</ItemHeader>
                  <ItemHeader></ItemHeader>
                  <ItemHeader>QUANTITY</ItemHeader>
                  <ItemHeader></ItemHeader>
                </ItemRow>
                {cartItemsArray.map((item, index) => {
                  return (
                    <ItemRow key={item._id}>
                      <ItemData>
                        <ItemPic src={item.imageSrc} alt={item.name} />
                      </ItemData>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>{item.price}</ItemPrice>
                      <ItemData>
                        <ChangeQuantity onClick={() => handleRemove(item._id)}>
                          <IoRemoveOutline />
                        </ChangeQuantity>
                      </ItemData>
                      {cartItems.length === cartItemsArray.length && (
                        <ItemData>{cartItems[index].quantity}</ItemData>
                      )}
                      <ItemData>
                        <ChangeQuantity onClick={() => handleAdd(item._id)}>
                          <IoAddSharp />
                        </ChangeQuantity>
                      </ItemData>
                    </ItemRow>
                  );
                })}
              </tbody>
            </ItemDetails>
          )}
          {/* Conditional rendering of Subtotal Table if no items in cart */}
          {cartItems.length === 0 ? (
            <div></div>
          ) : (
            // <PriceSummary total={total} />
            <Cost>
              <CostDetails>
                <tbody>
                  <CostRow>
                    <CostHeader>SUBTOTAL</CostHeader>
                    <CostData>${(total = totalCost())}</CostData>
                  </CostRow>
                  <CostRow>
                    <CostHeader>Tax</CostHeader>
                    <CostData>None</CostData>
                  </CostRow>
                  <CostRow>
                    <CostHeader>Shipping</CostHeader>
                    <CostData>None</CostData>
                  </CostRow>
                  <CostTotal>
                    <CostHeader>TOTAL PRICE</CostHeader>
                    <CostData>${total}</CostData>
                  </CostTotal>
                </tbody>
              </CostDetails>
              <AddToCart
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </AddToCart>
            </Cost>
          )}
        </Review>
      )}
    </div>
  );
};

export default ReviewCartPage;
