import "./style.css";
const GifyModel = (props) => {
  console.log(props.data);
  return (
    <div className="gify_container">
      <input
        className="gify_inp"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
               console.log("data", e.currentTarget.value);
            if (e.currentTarget.value) props.fn(e.currentTarget.value);
          }
        }}

        placeholder="search GIF"
      />

      {props.data.map((el) => {
        return <img src={el} alt="loading.." onClick={()=>{
          props.fn2(el);
        }}/>;
      })}
    </div>
  );
};

export default GifyModel;
