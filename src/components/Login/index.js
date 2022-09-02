import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth, db } from '../../fireBase/config';
import { useHistory } from 'react-router-dom';
import { addDocument, generateKeywords } from '../../fireBase/service';



const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();


const Login = () => {

    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName.toLowerCase())
            });
        }
    }

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }}>Login</Title>
                    <Button style={{ with: '100%', marginBottom: 5 }}>
                        LogIn with Google Account
                    </Button>
                    <Button style={{ with: '100%' }}
                        onClick={handleFbLogin}>
                        LogIn with Facebook Account
                    </Button>
                </Col>
            </Row>
        </div>
    );
}


export default Login;