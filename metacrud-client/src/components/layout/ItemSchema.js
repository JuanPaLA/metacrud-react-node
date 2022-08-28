import React, { useEffect } from 'react'
import { renderForm } from '../helpers';
import { createSchema } from '../../store/slices/schemas';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ItemSchema({closer}) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [schema, setSchema] = React.useState({});
    const [baseschema, setBasesSchema ] = React.useState({
        type: {type: "select", required: true, value: '', options: ['text', 'textarea', 'number', 'boolean', 'date', 'select']},
        required: {type: "boolean", required: true, value: ''},
    });
    const [baseprop, setBaseprop] = React.useState(
         {type: '', required: '', value: ''},
    );

    const handleChange = (e, cond) => {
        e.preventDefault();
        cond && document.getElementById('entity-name').value.length > 3 
        ? setSchema({ [document.getElementById('entity-name').value]: {
            name : {
                type: 'text',
                required: true,
                label: 'This is provided as default to ease the listing of entities',
            }
        } })
        : setSchema({ })
    }

    const handleValue = (e) => {        
        setBaseprop({            
            ...baseprop,
            [e.target.name]: e.target.value
        })
        console.log(baseprop);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var prop_name = document.getElementById('property-name').value;
        prop_name.length > 0 &&
        setSchema({
            [Object.keys(schema)[0]]: {
                ...schema[Object.keys(schema)[0]],
                [prop_name]: {
                    ...baseprop,
                }
            }
        })
        setBaseprop({
            type: '', required: '', value: ''
        })   
        document.getElementById('property-name').value = '';
    }

    const setStoreSchema = (e) => {
        e.preventDefault();
        dispatch(createSchema(schema, callBackState));
    }

    const callBackState = (res) => {        
        if(res.status === 200){
            alert('Schema created successfully');
            setSchema({});            
            !pathname.includes('list') 
            ? navigate(`list/schemas/schemas`, {state: {selector:null }})                         
            : closer(false)
        } 
    }

  return (
    <>
    <form>
        <fieldset>
        <legend>Entity</legend>
        {Object.keys(schema).length === 0 ?
            <><input type="text" id="entity-name" placeholder='cars horses computers'/> <button onClick={(e)=>handleChange(e,true)}>Add</button></>
        :
            <><input type="text" id="entity-name" value={Object.keys(schema)[0]} disabled/><button onClick={(e)=>handleChange(e,false)}>Remove</button></>
        }
        </fieldset>
    </form>
    
    {Object.keys(schema).length > 0 ?
        <fieldset>
        <legend>Properties</legend>
            <label htmlFor='property-name'>Prop Name</label>
            <input type="text" id="property-name" placeholder="Property name"/>
            
            <div className='item'>
                {renderForm(baseschema, handleValue, handleSubmit)}
            </div>            
        </fieldset>
    :
    null
    }

    
        <>
            <pre>
                {schema !== null && JSON.stringify(schema, null, 2)}
            </pre>
            {
                Object.keys(Object.keys(schema)).length > 0 &&
                <button onClick={(e)=> setStoreSchema(e)}>Post Schema</button>
            }
        </>
    </>
  )
}
