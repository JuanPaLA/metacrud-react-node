import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { renderForm } from "../helpers";
import { post, put } from "../../store/slices/entities";

export default function DetailEntity() {
  let { id, type, view } = useParams();
  const [flag, setFlag] = useState(false);
  const [mode, setMode] = useState(view);
  const dispatch = useDispatch();
  const schema = useSelector(state => state.schemas.schemas[type]);
  const [state, setState] = useState(false);
  const [statetypes, setStatetypes] = useState();
  const navigate = useNavigate();
  let entity = useLocation().state.entity;
  const objectFunctions = {
    post: function(a,b,c){
      dispatch(post(a,b,c));
    },
    put: function(a,b,c){
      dispatch(put(a,b,c));
    }
  }

  useEffect(() => {
    if(schema !== undefined)
    if (id !== "false" && entity) {
      setState(entity);
      setFlag(true)
    } else {      
      var flat_schema = structuredClone(schema);
      for (const property in flat_schema) {
        delete flat_schema[property];
        flat_schema[property] = "";
      }
      setState(flat_schema);
      setStatetypes(schema);
    }
  }, [schema]);

  useEffect(() => {
    if(state && flag) handleState(state);
  },[flag]);

  useEffect(() => {
    console.log(state);
  } ,[state]);
  
  const handleState = (state) =>{
    if (state) {
      var flat_schema = structuredClone(schema);
      for (const property in flat_schema) {
        flat_schema[property].value = state[property];
      }
      setStatetypes(flat_schema);
    }
  }
  
  const handleValue = (evt) => {
    var value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      if (id === "false") {
        {
          objectFunctions['post'](type, state, callbackState);
        }
      } else {
        {
          objectFunctions[`put`](type, state, callbackState);
        }
      }
    }catch(err){
      console.log(err);
      alert(err)
    }
  };

  const callbackState = (res) => {
    console.log(res);
    res.status === 200 ? alert("Success") : alert("Error");
    type === 'schemas' 
    ? navigate("/list/schemas/schemas") 
    : navigate(`/list/${type}/entities`, { state : {selector: `${type}_list`}});    
  };

  return (
    <div className="box">
      <div className="item">
        {id === "false" && (
          <div style={{ displayDirection: "row" }}>
            <h4>Create new {type}</h4>
          </div>
        )}
        {id !== "false" && (
          <>
            <p
              onClick={() => setMode("view")}
              style={{
                backgroundColor: mode === "view" ? "lightgray" : null,
                padding: "5px",
              }}
            >
              View
            </p>
            <p
              onClick={() => setMode("edit")}
              style={{
                backgroundColor: mode === "edit" ? "lightgray" : null,
                padding: "5px",
              }}
            >
              Edit
            </p>
          </>
        )}
      </div>
      <div className="item">
        {mode !== "view" && statetypes &&
          
          renderForm(statetypes, handleValue, handleSubmit)
        }

        {mode === "view" && state && (
          <div className={`grid-card-${type}`}>
            {Object.entries(state).map(([key, value]) => (
              <div key={key} style={{gridArea: key}} className="item-grid" id={`${type}-${key}`}>
                {key!== 'id' && value}
                {key === 'available' ? value ? 'Yes' : 'No' : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
