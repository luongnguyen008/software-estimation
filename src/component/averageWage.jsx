import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';


function AverageWage(props) {
    const [averageWage, setAverageWage] = React.useState(props.data ? props.data : 0)
    const handleChange = (e) => {
        setAverageWage(e.target.value)
        props.setData(parseInt(e.target.value))
    }
    return (
        <div style={{ height: 400, width: '90%', margin: 65 }}>
            <Box>
                Mức lương lao động bình quân (người/giờ):
                <span>    </span>
                <TextField
                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
                    value={averageWage ? averageWage : 0}
                    onChange={handleChange}
                    name="wage"
                    autoFocus
                    type="number"
                />
            </Box>

        </div>
    );
}

export default AverageWage;