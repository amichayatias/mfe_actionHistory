import React from "react";

const imagePage = (props: any) => {
  console.log("Props:  " + props);

  return (
    <div>
       <h3>{props.status}</h3>
       <h3>{props.age}</h3>
      <img src={props.message} />
    </div>
  );
};
export default imagePage;
