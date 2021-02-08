import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profileImg.png'
import {logout} from '../../auth/index'

const Container = styled.div`
    margin-top: 5rem;
`

const ProfileImg = styled.img`
    height: 5rem;
`

const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
`

const Profile = ({user}) => {
    return (
        <Container>
            <ProfileImg src={Image}/>
            <ProfileName>Hieu Minh</ProfileName>
            <button className='btn border-none p-0' styled='cursor: pointer;' onClick={logout}>Đăng xuất</button>
        </Container>
    )
}

export default Profile
   