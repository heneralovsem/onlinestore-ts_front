import React, {FC} from 'react'
import { IBrand } from '../../types/types';

interface BrandItemProps {
    brand: IBrand
}

const BrandItem : FC<BrandItemProps> = ({brand}) => {
    

    return (
        <div>
           <p>{brand.id}</p>
           <p>{brand.name}</p> 
        </div>
    )

}

export default BrandItem;