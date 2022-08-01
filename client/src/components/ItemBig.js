import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemsPage from "./ItemsPage";
import YouMayAlsoLike from "./YouMayAlsoLike";

// PAGE COMPONENT for each individual item
//individual page for each item
//a route
const ItemBig = () => {
  // ****** code here to change to useReducer logic
  const [item, setItem] = useState();

  //useState for brandName
const [brandName, steBrandName] = useState();
  // GET item ID # from URL
  const { id } = useParams();

  // get userId from localstorage
  // const userId = localStorage.getItem("userId");
  const userId = "abc12321";//remember to change to localstorage userId when it's added

  // FETCH details about the individual item
  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
      });

    // CHECK that the user is logged in; if so, GET user ID to POST to
    // the back-end, when they add an item to the cart. If no user logged-in,
    // userID = "none" ?
  }, []);

  useEffect(() => {
    if (item) {
      fetch(`/api/get-brand-name/${item.companyId}`)
      .then((res)=> res.json())
      .then((data) => {
        console.log(data);
        steBrandName(data.data);
      })
    }
  }, [item]); 
  // POST item to cart, when button is clicked
  // ******** useReducer?
  const addToCart = (ev) => {
    ev.preventDefault();

    fetch(`/api/add-item-in-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userID, // note the capital
        user: userId,
        item: id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // show confirmation that it was added to the cart: MUI?
        console.log(data);
      });
      // .catch((err) => {
      //   console.log(err);
      // });
  };

  return (
    <>
    {item &&
      <>
        <Wrapper>
          <img alt="Item" src={item.imageSrc}/>
          <Details>
            {brandName &&
            <Link to={`/brands/${brandName}`} >
              <CompanyId>{brandName}</CompanyId>
            </Link>
            }
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price}</ItemPrice>
            <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
            <Description>
                The worst wearables, all new. The worst wearables, all new. The worst
                wearables, all new. The worst wearables, all new. The worst wearables,
                all new. The worst wearables, all new. The worst wearables, all new. The
                worst wearables, all new. The worst wearables, all new. The worst
                wearables, all new.
                </Description>
            {/* with dropdown capabilities? */}
          </Details>
        </Wrapper>
        <YouMayAlsoLike />
      </>
      }

    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Details = styled.div`
`;

const CompanyId = styled.div`
`;

const ItemName = styled.div`
`;

const ItemPrice = styled.div`
`;

const AddToCartButton = styled.button`
`;

const Description = styled.p`
padding: 100px;
line-height: 1.4;
`;
export default ItemBig;

