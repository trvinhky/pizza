import styled from "styled-components"

const Title = styled.h2`
  font-size: 30px;
  color: #333;
  font-weight: 700;
  margin-bottom: 20px;
`

const TitleBox = ({ text }: { text: string }) => {
  return (
    <Title className="lobster-regular">
      {text}
    </Title>
  )
}

export default TitleBox