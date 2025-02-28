import styled from "styled-components"

const Title = styled.h2`
    text-align: center;
    font-size: 30px;
    color: #333;
    font-weight: 700;
    margin: 20px 0;

    span {
        color: #fec524;
    }
`
const TitlePage = ({ text, sub }: { text: string, sub: string }) => {
    return (
        <Title className="lobster-regular">
            {sub} <span>{text}</span>
        </Title>
    )
}

export default TitlePage