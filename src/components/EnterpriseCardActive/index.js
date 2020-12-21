import React from 'react'
import './style.css'

const EnterpriseCardActive = props => {
    const { photo, description } = props

    const srcPhoto = 'https://empresas.ioasys.com.br/' + photo;

    return (
        <div className="card-enterprise-active">
            <div>
                <div className="card-photo">
                    <img src={srcPhoto} alt="" className="photo-card" />
                </div>
                <div className="card-description">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseCardActive