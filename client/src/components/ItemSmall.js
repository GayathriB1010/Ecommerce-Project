import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Props are temporary; depend on what is received from the useReducer in context
const ItemSmall = ({ imageSrc, name, price, companyId, id }) => {
  let navigate = useNavigate();
  // HandleClick to be moved to a useContext file

  const handleClickItem = (ev) => {
    ev.preventDefault();
    navigate(`/item/${id}`);
  };

  return (
    <Wrapper onClick={handleClickItem}>
      <Image src={imageSrc} alt={name} />
      <Name>{name}</Name>
      {/* eventually to be replaced with company name */}
      <Company>{companyId}</Company>
      <Price>{price}</Price>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: front;
  align-items: center;
  width: 300px;
  margin: 20px 10px;
`;

const Image = styled.img`
  height: 170px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Company = styled.div``;
const Name = styled.div`
  margin: 10px 0px;
  height: 40px;
  text-align: center;
`;
const Price = styled.div`
  margin: 5px 0px;
`;

export default ItemSmall;