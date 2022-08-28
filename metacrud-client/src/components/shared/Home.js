import React from "react";
import CreateSchema from "../layout/CreateSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../store/slices/entities";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const schemas = useSelector(state => state.schemas.schemas);

  React.useEffect(()=>{
    if(schemas)      
      Object.keys(schemas).forEach(schema => {
        dispatch(fetchEntities(schema));
      });    
  },[schemas])

  return (
    <div className="box">
      <h1>Metacrud</h1>
      <div className="item" style={{ flexDirection: "column" }}>
        <h4>What is this?</h4>        
          This is a REACT NODE web application where I try to explore the limits of reusable components featuring a CRUD system.
      </div>
      <div className="item" style={{ flexDirection: "column" }}>
          <h4>Why I do this?</h4>
          <p>Any kind of web app can be uderstood as a CRUD system. 
          This entails the possibility of a lot of duplicate code. </p>
          
          <p>So I propposed my self the challenge of creating reusables components for all these operations with no regards of the type of entity within a system. </p>
      </div>

      <div className="item" style={{ flexDirection: "column" }}>
          <h4>What do I proppose here?</h4>
          <p>An UI to create schemas, with wich create then entities and interact with them. </p>                  
      </div>
      <CreateSchema/>

      <Link to={'/'}>
        <p>More about this app</p>
      </Link>
    </div>
  );
}


      {/* <div className="item" style={{ flexDirection: "column" }}>
        <h4>My motivations</h4>
        I was tired to write the same code for each time i needed to fetch, put, delete or edit some data, as I was also tired 
        of write multiple list and detail components for each entity I was dealing with. Also jaded after write just another form, input tags, handlers and so on.
        So, this is what I proposed to do:
        <p><b>Write the most reusable, abstracted, automated and schematized logic components for basics and fundamentals processes related to: </b></p>
          <ul>
            <li>CRUD operations, from client and server both sides</li>
            <li>Navigation from list to item, disregarding the type of entity</li>
            <li>Forms rendering and validation</li>
          </ul>        
        </div>

        <div className="item" style={{ flexDirection: "column" }}>
          <h4>How do I approach it?</h4>
        </div>

        <div className="item" style={{ flexDirection: "column" }}>
          <h4>Key Components</h4>
        </div>

        <div className="item" style={{ flexDirection: "column" }}>
          <h4>Key Concepts</h4>
        </div>

        <div className="item" style={{ flexDirection: "column" }}>
          <h4>Limitations</h4>
        </div>

        <div className="item" style={{ flexDirection: "column" }}>
          <h4>The Stack</h4>
        </div> */}

        
      {/* <div className="item" style={{ flexDirection: "column" }}>
        <h4>Why do I explore this options?</h4>
          Again again we face web apps whoose
          fundamentals features are just CRUD operations, and whoose
          navigation logic begins with a "list-of-items" that proceeds with a
          "detail-item-view", where you could interact with an element, edit it
          or delete it.
      </div> */}