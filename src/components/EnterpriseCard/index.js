import React from 'react'
import './style.css'

const EnterpriseCard = props => {
    const { photo, enterprise_name, country, enterprise_type } = props 
    const { enterprise_type_name } = enterprise_type

    return (
        <div className="card-enterprise">
            <div className="card-img">

            </div>
            <div className="card-desc">

            </div>
        </div>
    )
}

export default EnterpriseCard