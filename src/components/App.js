import React from "react";
import "../css/App.css";
import DataTable from "./DataTable";
import TextField from "@material-ui/core/TextField";

const App = () => {
  const [searchText, setSearchText] = React.useState("");
  const onKeyUp = (event) => {
    if (event.key==="Enter") {
      console.log(event.target.value);
      setSearchText(event.target.value);
    }
  }
  return (
    <div>
      <div className="searchbox">
        <TextField label="Search" variant="outlined" onKeyUp={onKeyUp} />
      </div>
      <DataTable searchText={searchText}></DataTable>
    </div>
  );
};

export default App;
