import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profileImg.jpg'

const Container = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 3rem;
`

const ProfileImg = styled.img`
    height: 2rem;
    margin: 0 1rem;
    cursor: pointer;
    border-radius: 50%;
`
const Nav = () => {
    return (
        <Container>
            <ProfileImg src={Image} />
        </Container>
    )
}

export default Nav
