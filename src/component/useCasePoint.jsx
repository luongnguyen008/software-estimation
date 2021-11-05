import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

function UseCasePoint(props) {
    const [rows, setRows] = React.useState(() => initState())
    const [TBF, setTbf] = React.useState(props.tbf ? props.tbf : 0)
    function initState() {
        if (props?.data?.length > 0) {
            return props.data
        }
        else return [
            {
                id: 1,
                type: "B - Đơn giản",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 2,
                type: "B - Trung bình",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 3,
                type: "B - Phức tạp",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 4,
                type: "M - Đơn giản",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 5,
                type: "M - Trung bình",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 6,
                type: "M - Phức tạp",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 7,
                type: "T - Đơn giản",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 8,
                type: "T - Trung bình",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
            {
                id: 9,
                type: "T - Phức tạp",
                numOfUseCases: 0,
                useCasePoint: 0,
            },
        ]
    }
    function calculateUCP(id) {
        switch (parseInt(id)) {
            case 1: return 5
            case 2: return 10 * 1
            case 3: return 15 * 1
            case 4: return 5 * 1.2
            case 5: return 10 * 1.2
            case 6: return 15 * 1.2
            case 7: return 5 * 1.5
            case 8: return 10 * 1.5
            case 9: return 15 * 1.5
            default: return 0
        }
    }
    const handleEditRowsModelChange = (model) => {
        let id = Object.keys(model)[0] || 0
        let value = Object.values(model)[0]?.numOfUseCases?.value || 0
        if (id > 0) {
            console.log(calculateUCP(id), id)
            let newData = rows.map(row => row.id == id ? row = { ...row, numOfUseCases: value, useCasePoint: value * calculateUCP(id) } : row)
            let tbf = newData.reduce(function (prev, cur) {
                return prev + cur.useCasePoint;
            }, 0);
            props.setData(newData, tbf)
            setRows(newData)
            setTbf(tbf)
        }

    };

    return (
        <React.Fragment>
            <Typography variant="h6" align="center" pt={4}>Bảng tính toán điểm các trường hợp sử dụng</Typography>
            <div style={{ height: 400, width: '90%', margin: 30 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
                <Typography pt={1}>TBF: {TBF && TBF}</Typography>
            </div>

        </React.Fragment>

    );
}

const columns = [
    { field: 'id', headerName: 'TT', type: 'number' },
    { field: 'type', headerName: 'Loại', width: 160 },
    {
        field: 'numOfUseCases',
        headerName: 'Số trường hợp sử dụng',
        type: 'number',
        width: 260,
        editable: true,
    },
    {
        field: 'useCasePoint',
        headerName: 'Điểm của từng loại trường hợp sử dụng',
        type: 'number',
        width: 350,
    },
];

export default UseCasePoint;