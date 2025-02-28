import React from "react"
import styled from "styled-components"

const Box = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #333;
    background-color: transparent;
    cursor: pointer;
`

const BoxIntro = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default BoxIntro