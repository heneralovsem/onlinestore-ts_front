import React, {FC} from 'react'
import { IBrand } from '../../types/types';
import { brandsAPI } from '../../services/BrandsService';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { brandSlice } from '../../store/reducers/BrandSlice';
import cl from './BrandItem.module.css'

interface BrandItemProps {
    brand: IBrand
}

const BrandItem : FC<BrandItemProps> = ({brand}) => {
    const dispatch = useAppDispatch()
    const {setBrand} = brandSlice.actions
    const {selectedBrand} = useAppSelector(state => state.brandReducer)
    const [deleteBrand, {}] = brandsAPI.useDeleteBrandMutation()
    
    const deleteBrandItem = async () => {
        await deleteBrand(brand.id)
    }
    const selectBrand = () => {
        if (selectedBrand.id === brand.id) {
            dispatch(setBrand({}))
        }
        else {
        dispatch(setBrand(brand as IBrand))
        }
    }
    return (
        <div>
            <div className={selectedBrand.id === brand.id ? `${cl.selected__item__wrapper}` : `${cl.item__wrapper}`} onClick={selectBrand}>
            <p>{brand.name}</p> 
            </div>
           
           {/* <Button onClick={deleteBrandItem} variant='outlined'>Delete</Button> */}
        </div>
    )

}

export default BrandItem;