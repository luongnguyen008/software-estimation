import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Result(props) {
    const { data } = props
    const [state, setState] = useState(() => initState())
    const { e, p, h, g } = state

    function initState() {
        let { taw, tbf, tcf, ef, p, h } = props.data
        let aucp = (taw + tbf) * tcf * ef
        let e = aucp * 10 / 6
        e = Math.round(e * 10000) / 10000
        let g = 1.4 * e * p * h
        g = Math.round(g * 10000) / 10000
        return {
            p: p,
            e: e,
            h: numberWithCommas(h),
            g: numberWithCommas(g)
        }
    }
    useEffect(() => {
        let { taw, tbf, tcf, ef, p, h } = data
        let aucp = (taw + tbf) * tcf * ef
        let e = aucp * 10 / 6
        e = Math.round(e * 10000) / 10000
        let g = 1.4 * e * p * h
        g = Math.round(g * 10000) / 10000
        setState({
            ...state,
            p: p,
            e: e,
            h: numberWithCommas(h),
            g: numberWithCommas(g)
        })
    }, [JSON.stringify(props.data)])
    const handleReset = () => {
        props.handleReset()
    }
    const handleBack = () => {
        props.handleBack()
    }
    return (
        <React.Fragment>
            <div style={{ height: 380, width: '90%', margin: 30 }}>
                <Typography pt={1}>Nội suy thời gian lao động (P): <b>{p}</b></Typography>
                <Typography pt={1}>Giá trị nỗ lực thực tế (E): <b>{e}</b> </Typography>
                <Typography pt={1}>Mức lương lao động bình quân (H): <b>{h}</b></Typography>
                <Typography pt={1}>Giá trị phần mềm nội bộ (G): <b>{g} đồng</b> </Typography>

            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    color="inherit"
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button onClick={handleReset}>Reset</Button>
            </Box>
        </React.Fragment>
    );
}

export default Result;