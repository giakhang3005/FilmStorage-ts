import React from 'react'
import {useContext} from 'react'
import {Data, IContext} from '../../App'
import { auth, GoogleProvider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { Button, message } from 'antd'
import {GoogleOutlined} from '@ant-design/icons'


type Props = {}

export function SignIn({ }: Props) {

    const {setUser} = useContext(Data) as IContext
    
    const handleSignin = (): void => {
        signInWithPopup(auth, GoogleProvider)
            .then((res) => res.user)
            .then((newUser) => {
                const user = {
                    name: newUser.displayName,
                    email: newUser.email,
                    photoURL: newUser.photoURL,
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                message.success(`Welcome back ${user.name}`)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <Button style={{boxShadow: 'none'}} type="primary" onClick={handleSignin} icon={<GoogleOutlined />}>Sign in with Google</Button>
        </div>
    )
}