import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { withStyles } from "@material-ui/core";

function TCF(props) {
    const [rows, setRows] = React.useState(() => initState())
    const [TFW, setTFW] = React.useState(props.tfw ? props.tfw : 0)
    const [TCF, setTCF] = React.useState(props.tcf ? props.tcf : 0)
    function initState() {
        if (props?.data?.length > 0) {
            return props.data
        }
        else return [
            {
                id: 1,
                factor: "Hệ thống phân tán",
                weight: 2,
                value: 0,
                result: 0
            },
            {
                id: 2,
                factor: "Tính chất đáp ứng tức thời hoặc yêu cầu đảm bảo thông lượng",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 3,
                factor: "Hiệu quả sử dụng trực tuyến ",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 4,
                factor: "Độ phức tạp của xử lý bên trong ",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 5,
                factor: "Mã nguồn phải tái sử dụng được ",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 6,
                factor: "Dễ cài đặt",
                weight: 0.5,
                value: 0,
                result: 0
            },
            {
                id: 7,
                factor: "Dễ sử dụng",
                weight: 0.5,
                value: 0,
                result: 0
            },
            {
                id: 8,
                factor: "Khả năng chuyển đổi",
                weight: 2,
                value: 0,
                result: 0
            },
            {
                id: 9,
                factor: "Khả năng dễ thay đổi",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 10,
                factor: "Sử dụng đồng thời",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 11,
                factor: "Có các tính năng bảo mật đặc biệt",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 12,
                factor: "Cung cấp truy nhập trực tiếp tới các phần mềm của các hãng thứ ba",
                weight: 1,
                value: 0,
                result: 0
            },
            {
                id: 13,
                factor: "Yêu cầu phương tiện đào tạo đặc biệt cho người sử dụng",
                weight: 1,
                value: 0,
                result: 0
            },
        ]
    }
    const handleEditRowsModelChange = (model) => {
        let id = Object.keys(model)[0] || 0
        let value = Object.values(model)[0]?.value?.value || 0
        if (id > 0) {
            console.log("id", id, value)
            let newData = rows.map(row => row.id == id ? row = { ...row, value: value, result: value * row.weight } : row)
            let tfw = newData.reduce(function (prev, cur) {
                return prev + cur.result;
            }, 0);
            let tcf = 0.6 + (0.01 * tfw)
            props.setData(newData, tfw, tcf)
            setRows(newData)
            setTFW(tfw)
            setTCF(tcf)
        }

    };

    return (
        <React.Fragment>
            <Typography variant="h6" align="center" pt={4}>Bảng tính toán hệ số phức tạp kỹ thuật-công nghệ</Typography>
            <div style={{ height: 400, width: '90%', margin: 30 }}>
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
                <Typography pt={1}>TFW: {TFW && TFW}</Typography>
                <Typography pt={1}>TCF: {TCF && TCF}</Typography>
            </div>
        </React.Fragment>

    );
}

const columns = [
    { field: 'id', headerName: 'TT', type: 'number' },
    { field: 'factor', headerName: 'Hệ số', width: 260 },
    {
        field: 'weight',
        headerName: 'Trọng số',
        type: 'number',
        width: 160,
    },
    {
        field: 'value',
        headerName: 'Giá trị xếp hạng (0-5)',
        type: 'number',
        width: 260,
        editable: true,
    },
    {
        field: 'result',
        headerName: 'Kết quả',
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
export default TCF;