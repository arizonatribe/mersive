import {
  Header,
  Icon,
  Loader,
  Popup
} from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import { DataTable } from "./DataTable"
import { Pagination } from "./Pagination"
import { fetchDevices } from "./api"

const UpToDateIcon = () => {
  const icon = <Icon name="checkmark" color="green" />
  return <Popup content="Up to Date" trigger={icon} />
}

const UpdateInProgressIcon = () => {
  const icon = <Loader active inline size="tiny" />
  return <Popup content="Update In Progress" trigger={icon} />
}

const UnauthorizedUserIcon = () => {
  const icon = <Icon name="warning sign" color="yellow" />
  return <Popup content="Not Authorized" trigger={icon} />
}

const columns = [{
  id: "updated",
  render: (row) => row.iconExample && <UpdateInProgressIcon />,
  collapsing: true
}, {
  id: "user",
  header: "User",
  render: (row) => (
    <>
      {"my@email.com"}
      &nbsp;
      {row.iconExample && <UnauthorizedUserIcon />}
    </>
  )
}, {
  id: "name",
  header: "Name",
  render: (row) => "My Device"
}, {
  id: "version",
  header: "Firmware",
  render: (row) => "1.0.0"
}, {
  id: "updated",
  header: "Last Updated",
  render: (row) => "1 Hour Ago"
}]

/**
 * The main component (or entry point) for the React App
 *
 * @function
 * @name App
 * @returns {React.Component} The rendered JSX component
 */
function App() {
  const [currentPage, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(10)
  const [sizes, setSizes] = useState([10, 25, 50])
  const [devices, setDevices] = useState([])
  const [isAscending, setAscendingDirection] = useState(true)

  /**
   * Fetches the data to display in the data table rows
   *
   * @function
   * @name fetchData
   */
  async function fetchData() {
    const data = await fetchDevices()
    setTotal(data ? data.length : 0)
    setDevices(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DataTable
      data={devices}
      sortBy={{
        columnId: "user",
        ascending: isAscending
      }}
      columns={columns}
      sort={(columnId) => console.log({ columnId })}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={currentPage}
          total={total}
          size={size}
          sizes={sizes}
          setCurrent={setCurrent}
          setSize={(pageSize) => {
            setSizes([
              ...sizes,
              pageSize
            ])
            setSize(pageSize)
          }}
        />
      }
    />
  )
}

export default App
