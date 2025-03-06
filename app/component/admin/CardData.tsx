import React from "react";

const CardData = (props: any) => {
  return (
    <div className="bg-slate-400 px-4 py-10 m-3 w-[30vh] rounded-md">
      <p>{props.number}</p>
      <p className="font-semibold">{props.title}</p>
    </div>
  );
};

export default CardData;
