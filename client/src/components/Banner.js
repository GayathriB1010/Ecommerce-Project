import styled from "styled-components";

// COMPONENT for Brand, Category, New Arrivals, and Home Pages
// Text and imageSrc can to be adjusted depending on page.

const Banner = ({ text, imageSrc }) => {
  return (
    <Wrapper>
      <Image src={imageSrc}/>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 50vh;
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;
// CODE to be used when banner images found
// const Image = styled.img`
// background-image: url("source")
// `
// const Image = styled.div`
//   background: lightblue;
//   height: 300px;
// `;

const Text = styled.div`
  position: absolute;
  color: white;
  /* top: 40%; */
  bottom: 30%;
  left: 15%;
  font-size: 34px;
`;

export default Banner;
