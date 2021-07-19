import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { columns } from "../config";
import "../css/DataTable.css";

const DataTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  React.useEffect(() => {
    setLoading(true);
    if (props.searchText !== "") {
      fetch("http://localhost:3000/shipments?q="+ props.searchText+"&_limit"+pageSize)
        .then((response) => response.json())
        .then((data) => {
          setRows(data);
        });
    }
    else {
      fetch(
        "http://localhost:3000/shipments?_start=" +
          page * pageSize +
          "&_limit=" +
          pageSize
      )
        .then((response) => response.json())
        .then((data) => {
          setRows(data);
        });
    }    
    setLoading(false);
  }, [page, pageSize, props.searchText]);

  return (
    <div className="dt-table">
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={24}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
