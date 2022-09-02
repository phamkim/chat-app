import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import RoomList from "./RoomList";
import UserInfor from "./UserInfor";

const SideBarStyled = styled.div`
    background-color: #3f0e40;
    color: white;
    height: 100vh;
`


const SideBar = () => {
    return (
        <SideBarStyled >
            <Row>
                <Col span={24}><UserInfor /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SideBarStyled>
    )

}

export default SideBar;