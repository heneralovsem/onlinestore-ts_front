import React, {FC} from 'react'
import { IType } from '../../types/types';
import Button from '@mui/material/Button';
import { typesAPI } from '../../services/TypesService';
import { typeSlice } from '../../store/reducers/TypeSlice';
import { pageSlice } from '../../store/reducers/PageSlice'; 
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './TypeItem.module.css'


interface TypeItemProps {
    type: IType
}

const TypeItem : FC<TypeItemProps> = ({type}) => {
    const [deleteType, {}] = typesAPI.useDeleteTypeMutation()
    const dispatch = useAppDispatch()
    const {setPage} = pageSlice.actions
    const {setType} = typeSlice.actions
    const {selectedType} = useAppSelector(state => state.typeReducer)
    const deleteTypeItem = async () => {
        await deleteType(type.id)
    }
    const selectType = () => {
        if (selectedType.id === type.id) {
            dispatch(setType({}))
            dispatch(setPage(1))
        }
        else {
            dispatch(setType(type as IType))
            dispatch(setPage(1))
        }
        
    }
    return (
        <div>
            <div className={selectedType.id === type.id ? `${cl.selected__item__wrapper}` : `${cl.item__wrapper}`} onClick={selectType}>
           <p>{type.name}</p> 
           </div>
           {/* <Button onClick={deleteTypeItem} variant='outlined'>Delete</Button> */}
        </div>
    )

}

export default TypeItem;