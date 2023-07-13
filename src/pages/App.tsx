import * as React from "react";
import { useEffect, useState } from "react";
import { getData } from "../shared/services/network";
import { postData } from "../shared/services/network3";
import Table from "../shared/components/table";
import ImagePage from "../shared/components/imagePage";
import Button from "../shared/components/button";
import CustomTable from "../shared/components/CustomTable";

const App = () => {
  console.log("Start new MFE_ActionHistory");

  const [data1, setData1] = useState<[{}]>();
  const [data2, setData2] = useState<[{}]>();
  const [counter, setCounter] = useState(1);

  const data = [
    { name: "John", age: 25, city: "New York" },
    { name: "Jane", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 40, city: "Chicago" },
  ];
  const columns = ["name", "age", "City"];

  const tableData = {
    tableColumns: [
      {
        columnName: "Full Name",
        relevantPropertyName: "name",
        isSortable: true,
        isSearchable: true,
      },
      {
        columnName: "age",
        relevantPropertyName: "age",
        isSortable: true,
      },
      {
        columnName: "full address",
        relevantPropertyName: "address",
      },
      {
        columnName: "more",
        relevantPropertyName: "more",
        isSortable: true,
      },
    ],
    tableBody: [
      {
        id: "1",
        name: "John",
        age: 30.42424242,
        address: "New York",
        more: true,
      },
      {
        id: "2",
        name: "Anna",
        age: 20,
        address:
          "New York New York New York New York New York New York New York New York New York",
        more: false,
      },
      {
        id: "3",
        name: "Michael",
        age: 25.123456,
        address: "Los Angeles",
        more: true,
      },
      {
        id: "4",
        name: "Sarah",
        age: 35,
        address: "Chicago",
        more: false,
      },
      {
        id: "5",
        name: "David",
        age: 40.987654,
        address: "San Francisco",
        more: true,
      },      {
        id: "4",
        name: "Sarah",
        age: 35,
        address: "Chicago",
        more: false,
      },
      {
        id: "5",
        name: "David",
        age: 40.987654,
        address: "San Francisco",
        more: true,
      },
    ],
    tablePaginationLengthPerPage: 5,
    /* isHebrewTable : true */
  };

  useEffect(() => {
    let urlKey = "GET_HISTORY_ACTION";

    getData(urlKey).then((response: any) => {
      setData1(response);
    });


    postData().then((response: any) => {
      setData2(response);
    }); 
  }, [counter]);

  const clickOnMe = () => {
    console.log("You clicked on button! Counter: " + counter);
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>Hello new MFE_ActionHistory</h1>
      <h3>Custom code</h3>

      <Table data={data} columns={columns}></Table>

      <Button
        border="none"
        color="blue"
        height="100px"
        onClick={clickOnMe}
        radius="80%"
        width="100px"
        children="I'm a button!"
      />

      <CustomTable data={tableData} />

      <ImagePage {...data1} />
    </div>
  );
};

export default App;
