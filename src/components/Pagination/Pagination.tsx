import React, {ChangeEvent, FC} from 'react'

import Button from '@mui/material/Button';
import { Pagination } from '@mui/material';
import { pageSlice } from '../../store/reducers/PageSlice'; 
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './Pagination.module.css'


interface PaginationProps {
    devicesCount: number,
    limit: number;
}

const ShopPagination : FC<PaginationProps> = ({devicesCount, limit}) => {
    const totalPages = Math.ceil(devicesCount / limit)
    const dispatch = useAppDispatch()
    const { setPage } = pageSlice.actions
    const { currentPage } = useAppSelector(state => state.pageReducer) 
    const handleChange = (e: ChangeEvent<unknown>, value: number ) => {
        dispatch(setPage(value))
        console.log(value)
        console.log(currentPage)
    }
    console.log(currentPage)

    return (
        <div className={cl.pagination__wrapper}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </div>
    )

}

export default ShopPagination;