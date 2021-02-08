import React, {Fragment, useState} from 'react'
import styled from 'styled-components'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
    transition: 0.2s all ease-in-out;
`

const Title = styled.h1`
    font-size: 0.9rem;
    font-weight: 300;
    margin-top: 0.67em;
    width: 100%
    color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"};
`

// const Item = ({ title, active, icon }) => {
//     return (
//         <Container>
//             <Span active={active} className="iconify" data-inline="false" data-icon={`mdi-light:${icon}`}></Span>
//             <Title active={active}>{title}</Title>
//         </Container>
//     )
// }

const Item = ({item, depth = 0, ...rest}) => {
    const [collapsed, setCollapsed] = useState(true);
    const {label, items, Icon, onClick: onClickProp} = item;

    function toggleCollapse() {
        setCollapsed(preValue => !preValue);
    }

    function onClickTest(e, item) {
        window.alert(JSON.stringify(item, null, 2));
    }

    function onClick(e) {
        if (Array.isArray(items)) {
            toggleCollapse();
        } else {
            onClickTest(e, item);
        }
    }

    let expandItem;

    if (Array.isArray(items) && items.length) {
        expandItem = !collapsed ? (
            <ExpandLessIcon className='sidebar-item-expand-arrow sidebar-item-expand-arrow-expanded'/>
        ) : (
            <ExpandMoreIcon className="sidebar-item-expand-arrow"/>
        );
    }
    return (
        <>
            <ListItem onClick={onClick} button className='sidebar-item' dense {...rest}>
                <Container style={{paddingLeft: 15 * depth}}>
                    {Icon && <Icon className="sidebar-item-con" fontSize="small"/>}
                    <Title>{label}</Title>
                </Container>
                {expandItem}
            </ListItem>
            <Collapse in={!collapsed} timeout="out" unmountOnExit>
                {Array.isArray(item.items) ? (
                    <List disablePadding dense>
                        {item.items.map((subItem, index) => (
                            <Fragment key={`${depth}${index}`}>
                                {subItem === 'divider' ? (
                                    <Divider style={{margin: "6px 0"}}/>
                                ) : (
                                    <Item item={subItem} depth={depth + 1}/>
                                )}
                            </Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    )
}
export default Item
