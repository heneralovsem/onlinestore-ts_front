import React, {FC} from 'react'
import { IType } from '../../types/types';
import Button from '@mui/material/Button';
import { typesAPI } from '../../services/TypesService';


interface TypeItemProps {
    type: IType
}

const TypeItem : FC<TypeItemProps> = ({type}) => {
    const [deleteType, {}] = typesAPI.useDeleteTypeMutation()


    const deleteTypeItem = async () => {
        await deleteType(type.id)
    }
    return (
        <div>
           <p>{type.id}</p>
           <p>{type.name}</p> 
           <Button onClick={deleteTypeItem} variant='outlined'>Delete</Button>
        </div>
    )

}

export default TypeItem;