import { Button, Collapse, Typography } from 'antd'
import React, { useContext } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import styled from 'styled-components';

import { AppContext } from '../../Context/AppProvider';
const { Panel } = Collapse;
const { Link } = Typography;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, 
        p{
            color: white;
        }

        .ant-collapse-content-box {
            padding : 0 40px;
        }

        .add-room{
            color: white;
            padding: 0;
        }

    }
`

const LinkStyled = styled(Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`

const RoomList = () => {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
    console.log(rooms);
    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    return (
        <div>
            <Collapse ghost defaultActiveKey={['1']}>
                <PanelStyled header="List Room" key='1'>
                    {rooms.map((room) => (
                        <LinkStyled
                            key={room.id}
                            onClick={() => setSelectedRoomId(room.id)}
                        >
                            {room.name}
                        </LinkStyled>)
                    )}
                    <Button
                        className='add-room'
                        type='text'
                        icon={<PlusSquareOutlined />}
                        onClick={handleAddRoom}
                    >
                        Add Room
                    </Button>
                </PanelStyled>
            </Collapse>
        </div>
    )
}

export default RoomList

