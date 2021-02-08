import React, {Fragment} from 'react'
import styled from 'styled-components'
import Item from './Item'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import './styles.css'

const Container = styled.div`
    margin-top: 2rem;
    height: 100vh;
    width: 100%;
`

const items = [
    {label: "Trang chủ", Icon: "home"},
    "divider",
    {
        label: "Thao tác đầu năm", Icon: "cog", items: [
            {label: "Chia đội thiếu nhi", Icon: "cog"},
            {label: "Phân công trưởng phụ trách", Icon: "cog"},
            {label: "Báo cáo tiền quỹ", Icon: "cog"},
            {label: "Quỹ thiếu nhi", Icon: "cog"},
        ]
    },
    {
        label: "Điểm Giáo Lý", Icon: "gift", items: [
            {label: "Điểm danh thứ 5", icon: "cog"},
            {label: "Điểm danh Chúa Nhật", icon: "cog"},
            {label: "Nhập điểm cho nhóm", icon: "cog"},
            {label: "Duyệt bảng điểm", icon: "cog"},
        ]
    },
    {
        label: "Danh sách thiếu nhi", Icon: "book", items: [
            {label: "Danh sách đội", Icon: "cog"},
            {label: "Danh sách chi đoàn", Icon: "cog"},
            {label: "Danh sách phân đoàn", Icon: "cog"},
            {label: "Thiếu nhi toàn xứ đoàn", Icon: "cog"},
        ]
    },
    {
        label: "Danh sách trưởng", Icon: "file-multiple", items: [
            {label: "Toàn xứ đoàn", Icon: "cog"},
            {label: "Trưởng phân đoàn", Icon: "cog"},
            {label: "Trưởng chi đoàn", Icon: "cog"},
        ]
    },
]

const Menu = () => {
    return (
        <Container>
            <List disablePadding dense>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        {item === "divider" ?
                            <Divider style={{margin: "6px 0"}}/>
                            :
                            <Item item={item} depth={1}/>
                        }
                    </Fragment>
                ))}
            </List>
        </Container>
    )
}

export default Menu
