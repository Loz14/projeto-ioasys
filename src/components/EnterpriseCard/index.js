import React from 'react'
import './style.css'

const EnterpriseCard = props => {
    const { photo, enterprise_name, country, enterprise_type, enterprise } = props
    const { enterprise_type_name } = enterprise_type

    const srcPhoto = 'https://empresas.ioasys.com.br/' + photo;

 /**
 * Envia como evento para o componente pai, as informações da empresa escolhida
 */
    const activeCard = () => {
        props.onCardChange(enterprise)
    }

    return (
        <div onClick={e => activeCard()} className="card-enterprise">
            <div className="card-img">
                <img src={srcPhoto} alt="" className="photo-card" />
            </div>
            <div className="card-desc">
                <div>
                    <div className="name-card block">{enterprise_name}</div>
                    <div className="desc-card block">{enterprise_type_name}</div>
                    <div className="country-card block">{country}</div>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseCard