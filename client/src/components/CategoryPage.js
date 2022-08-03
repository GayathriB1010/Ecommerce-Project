import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemSmall from "./ItemSmall";
import LoadingScreen from "./LoadingScreen";

//shopping cart
//a route
const CategoryPage = () => {
  const category = useParams().category;
  const [items, setItems] = useState(null)
  const [loadingState, setLoadingState] = useState("loading");

  useEffect(() => {
    setLoadingState("loading");
    fetch(`/api/items-by-category/${category}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.data)
        setLoadingState("idle");
      })
  }, [category])

  if (items && loadingState === "idle") {
    return (
      <Wrapper>
        {items.map(item => {
          return (
            <ItemSmall
              imageSrc={item.imageSrc}
              name={item.name}
              price={item.price}
              companyId={item.companyId}
              id={item._id}
            />
          )
        })}
      </Wrapper>
    )
  }
  else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 0 var(--padding-page);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default CategoryPage;

