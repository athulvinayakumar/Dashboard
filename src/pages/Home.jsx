import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
        <div>
            <div style={{ backgroundImage: "url(https://media.istockphoto.com/id/1368170023/photo/hurricane-ida-2021-topographic-map-3d-render-color.webp?b=1&s=170667a&w=0&k=20&c=kakXmBYTp2KF4WUliCYNIsvwBwGdTbU2aVEkZ3ONop0=)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '680px' }}>
                <div style={{ height: '600px' }} className='d-flex  align-items-center '>
                    <Container >
                        <h1 style={{ fontWeight: 'bold', fontSize: '50px', color: 'black' }}>The cars we drive says <br></br>a lot about us </h1>
                        <Link style={{ textDecoration: 'none' }} to={'/login'}><button style={{ backgroundColor: 'black', color: 'white' }} className='btn rounded'><b>Show Cars</b></button></Link>

                    </Container>

                </div>
            </div>
            </div>
        </>
    )
}

export default Home