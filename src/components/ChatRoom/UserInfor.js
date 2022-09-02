import { Avatar, Button, Typography } from "antd"
import React, { useContext, useEffect } from 'react'
import styled from "styled-components"
import { AuthContext } from "../../Context/AuthProvider"
import { auth, db } from "../../fireBase/config"

const WraperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 28, 83);

    .user-name{
        color: white;
        margin-left: 5px;
    }
`



const UserInfor = () => {

    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            console.log({ data, snapshot, docs: snapshot.docs });
        })
    })

    return (<WraperStyled>
        <div>
            <Avatar src={photoURL}>
                {photoURL ? '' : displayName.charAt(0).toUpperCase()}
            </Avatar>

            <Typography.Text className="user-name">{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut()}>Log out</Button>
    </WraperStyled>)
}

export default UserInfor;