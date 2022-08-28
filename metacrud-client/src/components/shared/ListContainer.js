import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ListEntities from './ListEntities';
import { fetchEntities } from '../../store/slices/entities';

export default function ListContainer() {
  const dispatch = useDispatch();
    const { type, layer } = useParams();
    let slice_selector = useLocation().state.selector;
    const entities = useSelector(state => state[layer][layer][slice_selector]);
    const {schemas} = useSelector(state => state.schemas);

    useEffect(() => {
        !entities &&  dispatch(fetchEntities(type));
    } ,[entities]);
  return (
    <>      
        {
            type === 'schemas' 
            ?<ListEntities list={Object.keys(schemas)} type={type} />
            :<ListEntities list={entities} type={type} />
        }        
    </>
  )
}
