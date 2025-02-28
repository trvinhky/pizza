import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ButtonCustomTag = styled(Button)({
    borderRadius: '30px',
    textTransform: 'none',
    padding: '10px 40px',
    backgroundColor: '#fec524',
    color: '#333'
})
const ButtonCustom = ({ text }: { text: string }) => {
    return (
        <ButtonCustomTag variant="contained" type="submit">
            {text}
        </ButtonCustomTag>
    )
}

export default ButtonCustom