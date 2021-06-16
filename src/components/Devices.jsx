import ms from "ms"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Header, Icon, Loader, Popup } from "semantic-ui-react"

import Types from "../jsdoc.typedefs.js"
import { DataTable } from "./DataTable"
import { Pagination } from "./Pagination"
import { fetchDevices } from "./api/index.js"
import { sortVersions } from "../helpers/index.js"

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
  collapsing: true,
  render: (row) => (
    row.inProgress
      ? <UpdateInProgressIcon />
      : row.isCurrent
        ? <UpToDateIcon />
        : null
  )
}, {
  id: "user",
  header: "User",
  render: (row) => (
    <>
      {row.user?.email}
      &nbsp;
      {row.user?.canPerformUpdates && <UnauthorizedUserIcon />}
    </>
  )
}, {
  id: "name",
  header: "Name",
  render: (row) => row.name
}, {
  id: "version",
  header: "Firmware",
  render: (row) => row.version
}, {
  id: "updated",
  header: "Last Updated",
  render(row) {
    if (row.lastUpdatedAt != null) {
      if (ms("1d") > (Date.now() - row.lastUpdatedAt)) {
        return `${ms(Date.now() - row.lastUpdatedAt, { long: true })} ago`
      }
      return (new Date(row.lastUpdatedAt)).toLocaleString().split(/\s/).replace(/,/g, "")
    }
    return row.lastUpdatedAt
  }
}]

/**
 * The list of devices and their corresponding users
 *
 * @function
 * @name Devices
 * @param {string} [token] The current access token for the user's authenticated session
 * @param {function} props.setMessage A callback function to place messages into the page which are generated from activity in this component
 * @param {function} props.setToken A callback function which updates the current access token
 * @returns {React.Component} The rendered JSX component
 */
function Devices({ setMessage, setToken, token }) {
  const [currentPage, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(10)
  const [sizes, setSizes] = useState([10, 25, 50])
  const [devices, setDevices] = useState([])
  const [currentlySelectedColumn, setCurrentlySelectedColumn] = useState("user")
  const [columnSort, setColumnSort] = useState(
    columns.reduce((sortObj, col) => ({
      ...sortObj,
      [col.id]: true
    }), {})
  )

  /**
   * Sorts the device data by a specified device field (or sub-field)
   *
   * @function
   * @name sortData
   * @param {string} columnId The column ID/name to sort by
   * @returns {Array<Types.Device>} The sorted devices
   */
  function sortData(columnId) {
    const isAscending = !columnSort[columnId]

    setColumnSort({ ...columnSort, [columnId]: isAscending })
    setCurrentlySelectedColumn(columnId)

    switch (columnId) {
      case "name":
        return setDevices(
          devices.sort((a, b) => (isAscending ? b.name - a.name : a.name - b.name))
        )
      case "user":
        return setDevices(
          devices.sort((a, b) => (
            isAscending ? b.user.email - a.user.email : a.user.email - b.user.email
          ))
        )
      case "updated":
        return setDevices(
          devices.sort((a, b) => (isAscending ? b.lastUpdatedAt - a.lastUpdatedAt : a.lastUpdatedAt - b.lastUpdatedAt))
        )
      case "version":
        return setDevices(sortVersions(devices, isAscending))
      default:
        return devices
    }
  }

  useEffect(() => {
    fetchDevices(token)
      .then(data => {
        setTotal(data ? data.length : 0)
        setDevices(data)
      })
      .catch(err => {
        setMessage(err.message)
      })
  }, [setMessage, setToken, token])

  return (
    <DataTable
      data={devices}
      sortBy={{
        columnId: currentlySelectedColumn,
        ascending: columnSort[currentlySelectedColumn]
      }}
      columns={columns}
      sort={sortData}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={currentPage}
          total={total}
          size={size}
          sizes={sizes}
          setCurrent={setCurrent}
          setSize={(pageSize) => {
            setSizes([...sizes, pageSize])
            setSize(pageSize)
          }}
        />
      }
    />
  )
}

Devices.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export { Devices }
