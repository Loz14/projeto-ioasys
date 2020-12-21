import { CircularProgress } from '@material-ui/core'
import React from 'react'
import './style.css'

const Loading = () => {
    return (
        <div id="overlay"> <CircularProgress style={{ width: '65px', height: '65px', color: '#57bbbc' }} /> </div>
    )
}
 export default Loading