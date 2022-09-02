import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import Message from "./Message";
import { addDocument } from "../../fireBase/service"
import { useForm } from "antd/lib/form/Form";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFireStore";


const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230,230,230);

    .header{
        &__infor{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title{
            margin: 0;
            font-weight: bold;
        }

        &__des{
            font-size: 12px;
        }
    }
`

const WrapperStyed = styled.div`
    height: 100vh;
`


const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const ButtonGruopStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`







const ChatWindow = () => {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const { user: { uid, photoURL, displayName } } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [form] = useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnSubmit = () => {
        if (inputValue != "") {
            addDocument('messages', {
                text: inputValue,
                uid,
                photoURL,
                roomId: selectedRoom.id,
                displayName
            });

            form.resetFields(['message'])
        }

    }

    const messageCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
    }), [selectedRoom.id]);

    const messages = useFirestore('messages', messageCondition);


    return (<WrapperStyed>
        {selectedRoom.id ? (
            <>
                <HeaderStyled>
                    <div className="header__infor">
                        <p className="header__title">{selectedRoom.name}</p>
                        <span className="header__des">{selectedRoom.description}</span>
                    </div>
                    <ButtonGruopStyled>
                        <Button
                            type="text"
                            icon={<UserAddOutlined />}
                            onClick={() => setIsInviteMemberVisible(true)}
                        >
                            Invent
                        </Button>
                        <Avatar.Group size='small' maxCount={3}>
                            {members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName.charAt(0).toUpperCase()} </Avatar>
                            </Tooltip>)}
                        </Avatar.Group>
                    </ButtonGruopStyled>


                </HeaderStyled>
                <ContentStyled>
                    <MessageListStyled>
                        {messages.map(mes => <Message key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createdAt={mes.createAt} />)

                        }
                    </MessageListStyled>
                    <FormStyled form={form}>
                        <Form.Item name='message'>
                            <Input
                                placeholder="input message..."
                                bordered={false}
                                autoComplete='off'
                                onChange={handleInputChange}
                                onPressEnter={handleOnSubmit}
                            />
                        </Form.Item>
                        <Button type="primary" onClick={handleOnSubmit}>Send</Button>
                    </FormStyled>
                </ContentStyled>
            </>
        ) : (<Alert
            message='Hãy chọn phòng'
            type='info'
            showIcon
            style={{ margin: 5 }}
            closable></Alert>)}
    </WrapperStyed>)
}

export default ChatWindow;