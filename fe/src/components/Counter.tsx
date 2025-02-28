import { Button, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CounterProps {
    count: number
    hanldeCount: (num: number) => void
}

export default function Counter({ count, hanldeCount }: CounterProps) {

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Button
                variant="text"
                onClick={() => hanldeCount(count - 1)}
            >
                <RemoveIcon fontSize="small" />
            </Button>

            <Typography variant="h6">{count}</Typography>

            <Button
                variant="text"
                onClick={() => hanldeCount(count + 1)}
            >
                <AddIcon fontSize="small" />
            </Button>
        </Box>
    );
}
