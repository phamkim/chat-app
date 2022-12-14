import { Row, Col } from 'antd';
import React from 'react';
import ChatWindow from './ChatWindow';
import SideBar from './SideBar';

const ChatRoom = () => {
    return (<div>
        <Row>
            <Col span={6}><SideBar /></Col>
            <Col span={18}><ChatWindow /></Col>
        </Row>
    </div>)
}


export default ChatRoom;