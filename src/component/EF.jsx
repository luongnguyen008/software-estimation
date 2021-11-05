import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { withStyles } from "@material-ui/core";

function EF(props) {
    const [rows, setRows] = React.useState(() => initState())
    const [EF, setEF] = React.useState(props.ef ? props.ef : 0)
    const [P, setP] = React.useState(props.p ? props.p : 0)
    function initState() {
        if (props?.data?.length > 0) {
            return props.data
        }
        else return [
            {
                id: 1,
                factor: "Có áp dụng qui trình phát triển phần mềm theo mẫu RUP và có hiểu biết về RUP hoặc quy trình phát triển phần mềm tương đương",
                weight: 1.5,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 2,
                factor: "Có kinh nghiệm về ứng dụng tương tự ",
                weight: 0.5,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 3,
                factor: "Có kinh nghiệm về hướng đối tượng ",
                weight: 1,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 4,
                factor: "Có khả năng lãnh đạo Nhóm",
                weight: 0.5,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 5,
                factor: "Tính chất năng động",
                weight: 1,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 6,
                factor: "Độ ổn định của các yêu cầu",
                weight: 2,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 7,
                factor: "Sử dụng các nhân viên làm bán thời gian",
                weight: -1,
                value: 0,
                result: 0,
                ES: 0,
            },
            {
                id: 8,
                factor: "Dùng ngôn ngữ lập trình loại khó",
                weight: -1,
                value: 0,
                result: 0,
                ES: 0,
            },

        ]
    }
    const resultToES = (value) => {
        if (value <= 0) {
            return 0
        }
        if (0 < value && value <= 1) {
            return 0.05
        }
        if (1 < value && value <= 2) {
            return 0.1
        }
        if (2 < value && value <= 3) {
            return 0.6
        }
        if (value > 3) {
            return 1
        }
    }
    const esToP = (value) => {
        if (value < 1) {
            return 48
        }
        if (value >= 1 && value < 3) {
            return 32
        }
        if (value >= 3) {
            return 20
        }
    }
    const handleEditRowsModelChange = (model) => {
        let id = Object.keys(model)[0] || 0
        let value = Object.values(model)[0]?.value?.value || 0
        if (id > 0) {
            console.log("id", id, value)
            let newData = rows.map(row => row.id == id ? row = { ...row, value: value, result: value * row.weight, ES: resultToES(value * row.weight) } : row)
            let efw = newData.reduce(function (prev, cur) {
                return prev + cur.result;
            }, 0);
            let es = newData.reduce(function (prev, cur) {
                return prev + cur.ES;
            }, 0);
            let p = esToP(es)
            let ef = 1.4 + (-0.03 * efw)
            ef = Math.round(ef * 10000) / 10000
            props.setData(newData, ef, p)
            setRows(newData)
            setEF(ef)
            setP(p)
        }

    };

    return (
        <React.Fragment>
            <Typography variant="h6" align="center" pt={4} pl={6} pr={6}>Tính toán hệ số tác động môi trường và nhóm làm việc, hệ số phức tạp về môi trường, xác định độ ổn định kinh nghiệm và nội suy thời gian lao động (P)</Typography>
            <div style={{ height: 380, width: '90%', margin: 30 }}>
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
                <Typography pt={1}>EF: {EF && EF}</Typography>
                <Typography pt={1}>P: {P && P}</Typography>
            </div>
        </React.Fragment>

    );
}

const columns = [
    { field: 'id', headerName: 'TT', type: 'number' },
    { field: 'factor', headerName: 'Hệ số tác động môi trường', width: 260 },
    {
        field: 'weight',
        headerName: 'Trọng số',
        type: 'number',
        width: 140,
    },
    {
        field: 'value',
        headerName: 'Giá trị xếp hạng (0-5)',
        type: 'number',
        width: 160,
        editable: true,
    },
    {
        field: 'result',
        headerName: 'Kết quả',
        type: 'number',
        width: 140,
    },
    {
        field: 'ES',
        headerName: 'Độ ổn định kinh nghiệm',
        type: 'number',
        width: 160,
    },

];
const StyledDataGrid = withStyles({
    root: {
        "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important"
        },
        "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal"
        },
        "& .MuiDataGrid-row": {
            maxHeight: "none !important"
        }
    }
})(DataGrid);
export default EF;