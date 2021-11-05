import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

function ActorsPoint(props) {
    const [rows, setRows] = React.useState(() => initState())
    const [TAW, setTaw] = React.useState(props.taw ? props.taw : 0)
    function initState() {
        if (props?.data?.length > 0) {
            return props.data
        }
        else return [
            {
                id: 1,
                type: "Đơn giản",
                description: "Thuộc loại giao diện của chương trình",
                numOfActors: 0,
                actorPoint: 0,
            },
            {
                id: 2,
                type: "Trung bình",
                description: "Giao diện tương tác hoặc phục vụ một giao thức hoạt động",
                numOfActors: 0,
                actorPoint: 0,
            },
            {
                id: 3,
                type: "Phức tạp",
                description: "Giao diện đồ họa",
                numOfActors: 0,
                actorPoint: 0,
            },
        ]
    }
    const handleEditRowsModelChange = (model) => {
        let id = Object.keys(model)[0] || 0
        let value = Object.values(model)[0]?.numOfActors?.value || 0
        let newData = rows.map(row => row.id == id ? row = { ...row, numOfActors: value, actorPoint: value * id } : row)
        let taw = newData.reduce(function (prev, cur) {
            return prev + cur.actorPoint;
        }, 0);
        if (id > 0) {
            props.setData(newData, taw)
            setRows(newData)
            setTaw(taw)
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" align="center" pt={4}>Bảng tính toán điểm các tác nhân (actors) tương tác</Typography>
            <div style={{ height: 400, width: '90%', margin: 30 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
                <Typography pt={1}>TAW: {TAW && TAW}</Typography>
            </div>

        </React.Fragment>

    );
}
const columns = [
    { field: 'id', headerName: 'TT', type: 'number' },
    { field: 'type', headerName: 'Loại Actor', width: 160 },
    { field: 'description', headerName: 'Mô tả', width: 280, type: 'text' },
    {
        field: 'numOfActors',
        headerName: 'Số tác nhân',
        type: 'number',
        width: 160,
        editable: true,
    },
    {
        field: 'actorPoint',
        headerName: 'Điểm của từng loại tác nhân',
        type: 'number',
        width: 260,
    },
];

export default ActorsPoint;