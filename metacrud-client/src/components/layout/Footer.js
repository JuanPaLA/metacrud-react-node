import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSchemas } from "../../store/slices/schemas";

export default function Footer() {
  const { schemas } = useSelector((state) => state.schemas);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    Object.getPrototypeOf(schemas) === Object.prototype && dispatch(fetchSchemas());
    console.log(schemas);
  },[]);

  const Menu = () => {
    return (
      <React.Fragment>        
        {
          schemas && 
          <div className={'dropup'}>
          <button class="dropbtn">Entities</button>
          <div class="dropup-content">
          {Object.keys(schemas).map((key) => (                        
            <Link to={`/list/${key}/entities`} state={{selector: `${key}_list`}}  key={key}>
              {key}
            </Link>
            
          ))}
          </div>
          </div>
          }
      </React.Fragment>
    );
  };

  return (
    <div
      id="footer"
      className="box"
      style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/list/schemas/schemas"} state={{ selector: null }}>
        Schemas
      </Link>
      <Menu />
    </div>
  );
}

/*
        <Link to={"/list/users/entities"} state={{selector: `users_list`}}>Users</Link>
        <Link to={"/list/items/entities"} state={{selector: `items_list`}}>Items</Link>
*/
