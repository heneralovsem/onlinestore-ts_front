import React, {FC} from 'react'
import { IBrand } from '../../types/types';
import { brandsAPI } from '../../services/BrandsService';
import Button from '@mui/material/Button';

interface BrandItemProps {
    brand: IBrand
}

const BrandItem : FC<BrandItemProps> = ({brand}) => {
    const [deleteBrand, {}] = brandsAPI.useDeleteBrandMutation()

    const deleteBrandItem = async () => {
        await deleteBrand(brand.id)
    }
    return (
        <div>
           <p>{brand.id}</p>
           <p>{brand.name}</p> 
           <Button onClick={deleteBrandItem} variant='outlined'>Delete</Button>
        </div>
    )

}

export default BrandItem;