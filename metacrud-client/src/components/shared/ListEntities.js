import React from "react";
import { deleteSchemas } from "../../store/slices/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletes } from "../../store/slices/entities";
import CreateSchema from "../layout/CreateSchema";

export default function ListEntities({ list, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const objectFunctions = {
    deleteschemas: function (id, cb) {
      dispatch(deleteSchemas(id, cb));
    },
    deletes: function (id, data, cb) {
      dispatch(deletes(id, data, cb));
    },
  };

  const callbackState = (res) => {
    res.status === 200 ? alert("Success") : alert("Error");
  };

  const HandleNavigation = ({ name, id, entity = false }) => {
    if (type === "schemas") {
      let path = `/list/${name}/entities`;
      return (
        <>
          <Link to={path} state={{ selector: `${name}_list` }}>
            Entity: {`${name}`}
          </Link>
          <span
            onClick={() => {
              objectFunctions[`delete${type}`](name, callbackState);
            }}
          >
            (X)
          </span>
        </>
      );
    } else {
      let path = `/detail-entity/${id}/${type}/view`;
      return (
        <>
          <Link to={path} state={{ entity }}>
            Entity: {`${name}`}
          </Link>
          <span
            onClick={() => {
              objectFunctions[`deletes`](type, entity.id, callbackState);
            }}
          >
            (X)
          </span>
        </>
      );
    }
  };

  return (
    <div className="box">
      <h4>Type of elements listed: {type}</h4>
      {list &&
        list.map((item, index) => (
          <div key={index} className="item">
            <HandleNavigation
              name={type === "schemas" ? item : item.name}
              id={type === "schemas" ? item : item.name}
              entity={type === "schemas" ? false : item}
            />
          </div>
        ))}

      {type === "schemas" ? (
        <CreateSchema />
      ) : (
        <button
          onClick={() =>
            navigate(`/detail-entity/${false}/${type}/create`, {
              state: { entity: {} },
            })
          }
        >
          Create new {type}
        </button>
      )}
    </div>
  );
}
