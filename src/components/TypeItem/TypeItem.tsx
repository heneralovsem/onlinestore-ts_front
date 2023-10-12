import React, {FC} from 'react'
import { IType } from '../../types/types';

interface TypeItemProps {
    type: IType
}

const TypeItem : FC<TypeItemProps> = ({type}) => {
    

    return (
        <div>
           <p>{type.id}</p>
           <p>{type.name}</p> 
        </div>
    )

}

export default TypeItem;