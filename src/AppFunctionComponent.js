import { useState } from "react";

function AppFunctionComponent() {
    const [name,setName] = useState("salma");
    const [age,setAge] = useState(25);
    const [position,setPosition] = useState("developer");
    const [info,setInfo] = useState({
        name: "salma",
        age: 25,
        city: "cairo"
    })
  return (
    //fragement tag 
    <>
      <h1>Hello, World!</h1>
      <h1>Name:{name}</h1>
      <h1>position:{position}</h1>
      <h1>Name:{info.name}</h1>
        <h1>Age:{info.age}</h1>
        <h1>City:{info.city}</h1>

        <button onClick={() => setName("ahmed")} className="btn btn-danger" >Change Name</button>
    </>
  );
}
export default AppFunctionComponent;