import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../Services/allAPI'
import Swal from 'sweetalert2';

function Authorize({ register }) {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    console.log(userData);
    const registerform = register ? true : false

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = userData
        if (!username || !email || !password) {
            Swal.fire({
                icon: "info",
                title: "Please fill the form completely!"
            });

        }
        else {
            const result = await registerAPI(userData)
            console.log(result.data);

            if (result.status === 200) {
              
                Swal.fire({
                    title: "Successfully Registerd",
                    text: "",
                    icon: "success"
                });
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else {

                Swal.fire({
                    title: result.response.data,
                    text: "",
                    icon: "error"
                });
            }
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userData

        if (!email || !password) {
            Swal.fire({
                icon: "info",
                title: "Please fill the form completely!"
            });
        }
        else {

            const result = await loginAPI(userData)
            console.log(result);

            if (result.status === 200) {
                Swal.fire({
                   
                    title: "Login Successfull",
                    text: "",
                    icon: "success"
                });               
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                setUserData({
                    email: "",
                    password: ""
                })
                if (result.data.existingUser.email = "admin@gmail.com" && result.data.existingUser.password === 'admin123') {
                    navigate('/admin-dashboard')
                }
                else {
                    navigate('/dashboard')

                }

            }
            else {
                Swal.fire({
                    title: result.response.data,
                    text: "",
                    icon: "error"
                });
               

            }
        }
    }
    return (
        <div
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/19528148/pexels-photo-19528148/free-photo-of-a-brick-wall-with-a-light-on-it.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')",
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{ width: '100%' }} className='d-flex justify-content-center align-items-center'>
                <div className='w-50 container'>
                    <div className='card  p-3' style={{ borderRadius: '10px', boxShadow: '0px 0px 20px 0px #888888', backgroundColor: '#ffffff' }}>
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className='d-flex align-items-center flex-column'>
                                    <h1 className='fw-bolder text-dark mt-5' style={{ fontSize: "250%" }}> TURBO</h1>
                                    <h5 className='fw-bolder text-center mt-3 mb-3 text-black'>
                                        {
                                            registerform ?

                                                'Sign up to your Account' : 'Sign In to your Account'
                                        }
                                    </h5>
                                    <Form className='text-light w-75 mt-2'>
                                        {registerform && (
                                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                                <Form.Control type="text" placeholder="Username" className="form-control" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                                            </Form.Group>
                                        )}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Enter your Email Id" className="form-control"  value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Enter your password" className="form-control" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                                        </Form.Group>
                                        {registerform ? (
                                            <div className='text-center'>
                                                <button onClick={handleRegister} className='w-50 btn btn-primary rounded-pill mt-3'>Register</button>
                                                <p className='text-black mt-3'>Already have an account? Click here to <Link to={'/login'} className="btn-link">Login</Link></p>
                                            </div>
                                        ) : (
                                            <div className='text-center'>
                                                <button onClick={handleLogin}  className='w-50 btn btn-primary rounded-pill mt-3'>Login</button>
                                                <p className='text-black mt-3'>New User? Click here to <Link to={'/register'} className="btn-link">Register</Link></p>
                                            </div>
                                        )}
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authorize