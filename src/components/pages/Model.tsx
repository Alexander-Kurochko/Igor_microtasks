import React from 'react';
import {adidasArr} from './Adidas';
import {pumaArr} from './Puma';
import {useLocation, useParams} from 'react-router-dom';

export const Model = () => {
    const params = useParams()
    const location = useLocation();
    // todo: Необходимо убрать хардкор массива
    console.log(location)

    let currentModel = null;
    if (location.pathname.startsWith('/adidas')) {
        currentModel = adidasArr.find(el => el.id === Number(params.id));
    } else if (location.pathname.startsWith('/puma')) {
        currentModel = pumaArr.find(el => el.id === Number(params.id));
    }

    return (
        <div style={{textAlign: 'center'}}>
            {currentModel
                ? <>
                    <h2>{currentModel.model}</h2>
                    <h4>{currentModel.collection}</h4>
                    <h3>{currentModel.price}</h3>
                    <img
                        src={currentModel.picture}
                        alt={currentModel.model}
                        style={{width: '600px', height: 'auto', marginRight: '10px'}}
                    />
                </>
                : <h2>Такой модели не существует</h2>
            }
        </div>
    );
};

//export default Model;