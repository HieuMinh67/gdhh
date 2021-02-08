import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem;
`

const Main = () => {
    return (
        <Container>
            <Nav/>
        </Container>
    )
}

export default Main
