import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";
import { BiHistory } from "react-icons/bi";
import { BsCart4, BsSearch } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md"

//nav bar
const Header = () => {
  const { state } = useContext(ShopContext);

  return (
    <Wrapper>
      <WrapperTop>
        <Nav2 to="/contact">
          <Contact />
          <ToolTip>Contact Us</ToolTip>
        </Nav2>
        <Logo to="/" >WEARLESS</Logo>
        <WrapperTopRight>
          <Nav2 to="/search">
            <Search />
            <ToolTip>Search</ToolTip>
          </Nav2>
          <Nav2 to="/order-history">
            <History />
            <ToolTip>Order History</ToolTip>
          </Nav2>
          <Nav2 to="/review-cart">
            <Cart />
            <ToolTip>Cart</ToolTip>
          </Nav2>
          {!state.currentUser ?
            <Nav to="/signin">
              <Collection>Sign In</Collection>
            </Nav>
            : <Nav to={`/user/${state.currentUser._id}`}>
              <Collection>{`Hello ${state.currentUser.firstName}`}</Collection>
            </Nav>
          }
        </WrapperTopRight>
      </WrapperTop>
      <NavBar>
        <Nav to="/products">
          <Collection>Products</Collection>
        </Nav>
        {(state.brands !== null) &&
          <DropWrapper>
            <Nav to="/brands">
              <Collection>Brands</Collection>
            </Nav>
            <List>
              {state.brands.sort().map(brand => {
                return (
                  <DropWrapper key={brand}>
                    <ListItem to={`/brands/${brand}`}>
                      <ListAfter>
                        {brand}
                      </ListAfter>
                    </ListItem>
                  </DropWrapper>
                )
              })}
            </List>
          </DropWrapper>
        }
        {(state.categories !== null) &&
          <DropWrapper>
            <Nav to="/categories">
              <Collection>Categories</Collection>
            </Nav>
            <List>
              {state.categories.sort().map(category => {
                return (
                  <DropWrapper key={category}>
                    <ListItem to={`/categories/${category}`}>
                      <ListAfter>
                        {category}
                      </ListAfter>
                    </ListItem>
                  </DropWrapper>
                )
              })}
            </List>
          </DropWrapper>
        }
        <Nav to="/new-arrivals">
          <Collection>New Arrivals</Collection>
        </Nav>
      </NavBar>
    </Wrapper>
  )
}



const List = styled.div`
  max-height: 555px;
  visibility: hidden;
  position: absolute;
  text-decoration: none;
  overflow: auto;
  background-color: rgb(211, 211, 211);
  left: 10%;
  white-space: nowrap;
  padding: 0 10px 5px 10px;
  z-index: 10;
  &:hover {
    visibility: visible;
  }
`

const ListAfter = styled.div`
  position: relative;
  width: fit-content;
  &:after {
    ${underline}
  }
`

const ListItem = styled(NavLink)`
  font-size: 18px;
  width: fit-content;
  cursor: pointer;
  text-decoration: none;
  color: black;
  overflow: hidden;
  &:hover ${ListAfter}:after{
    ${underlineTransition}
  } 
`

const Wrapper = styled.header`
  height: var(--header-height);
  font-family: var(--font);
`

const Logo = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-logo);
  font-size: 48px;
  color: black;
  text-align: center;
  position: relative;
  left: 90px;
`

const Collection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:after{
    ${underline}
  }
`

const Nav = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 15px 24px;
  font-size: 24px;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
  &:hover ${Collection}:after{
    ${underlineTransition}
  }  
`

const DropWrapper = styled.div`
  position: relative;
  padding: 8px 0;
  & ${Nav}:hover + ${List} {
    visibility: visible;
  }
`

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  
`

const WrapperTopRight = styled.div`
  display: flex;
  align-items: center;
  & ${Nav} {
    color: black;
  }
  & ${Nav} ${Collection}:after{
    background-color: black;
  }
`

const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: fit-content;
  width: 100%;
  background-color: black;
  & ${Nav}:hover + ${List} {
    visibility: visible;
  }
  & ${Collection}:after {
    background-color: white;
  }
`

const IconsCSS = css`
  padding: 0 4px;
  width: 30px;
  height: 30px;
`

const Cart = styled(BsCart4)`
  ${IconsCSS}
`

const History = styled(BiHistory)`
  ${IconsCSS}
`

const Contact = styled(MdOutlineContactSupport)`
  ${IconsCSS}
`

const Search = styled(BsSearch)`
  ${IconsCSS}
`

const ToolTip = styled.span`
  font-size: 18px;
  opacity: 0;
  width: 120px;
  background-color: #B1B3B3FF;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 80%;
  left: 25%;
  margin-left: -10px;
  transform: translate3d(0,-10px,0);
  transition: all .15s ease-in-out;
&:after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 25%;
  margin-left: -10px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #B1B3B3FF transparent;
}
`

const Nav2 = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 15px 12px;
  font-size: 24px;
  color: black;
  position: relative;
  &:hover ${ToolTip} {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`

export default Header;