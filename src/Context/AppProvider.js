import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFireStore'
import { AuthContext } from './AuthProvider'



export const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const { user: { uid } } = useContext(AuthContext);
    const [selectedRoomId, setSelectedRoomId] = useState('');


    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members]);
    const members = useFirestore('users', usersCondition);



    return (
        <AppContext.Provider
            value={{
                rooms,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                members,
                isInviteMemberVisible, 
                setIsInviteMemberVisible
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
