

import { Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../fireBase/service';

const AddRoomModal = () => {

    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const [form] = Form.useForm();
    const { user: { uid } } = useContext(AuthContext);
    const handleOK = () => {
        addDocument('rooms', {
            ...form.getFieldsValue(),
            members: [uid]

        });
        form.resetFields();
        setIsAddRoomVisible(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false)
    }


    return (
        <div>
            <Modal
                title="Create Room"
                visible={isAddRoomVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Room name" name="name">
                        <Input placeholder='input room name' />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder='input description' />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default AddRoomModal
