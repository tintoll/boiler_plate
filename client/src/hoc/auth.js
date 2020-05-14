import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import { withRouter } from 'react-router-dom'

export default function(SpecificComponent, option, adminRoute = null) {
    /* option 
        null => 아무나 출입이 가능한 페이지
        true => 로그인한 유저만 출입가능한 페이지
        false => 로그인한 유저는 출입 불가능한 페이지 
    */
    // adminRoute = true 이면 관리자 페이지
    
    function AuthenticationCheck(props) {
        var dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then( response => {
                console.log(response)
                
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }        
                } else {
                    // 로그인한 상태 
                    
                    // 관리자 페이지인데 일반사용자가 접근하면
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {

                        // 로그인 유저는 접근 불가 페이지 이면
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }            
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return withRouter(AuthenticationCheck);
}