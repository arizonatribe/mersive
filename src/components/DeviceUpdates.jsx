import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Header, Icon, Loader, Popup } from "semantic-ui-react"

import Types from "../jsdoc.typedefs.js"
import { DataTable } from "./DataTable"
import { Pagination } from "./Pagination"
import { fetchDevices } from "./api/index.js"
import { toRecentTimespanOrYearMonthDay, statusSortValue, sortVersions } from "../helpers/index.js"

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

/**
 * SemanticUI React table column configuration settings
 *
 * @typedef {Object<string, string|boolean|function>} ColumnConfigurationSettings
 * @property {string} id The column's unique identifier
 * @property {string} [header] The column label
 * @property {boolean} [collapsing] A cell can be collapsing so that it only uses as much space as required.
 * @property {function} [render] A function which provides the content. In its simplest form just selects the field from the source object
 */

/**
 * The configuration settings for the device updates data
 *
 * @name columns
 * @type {Array<ColumnConfigurationSettings>}
 * @constant
 * @default
 */
const columns = [{
  id: "status",
  collapsing: true,
  render: (row) => (
    row.isCurrent
      ? <UpToDateIcon />
      : row.inProgress
        ? <UpdateInProgressIcon />
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
    return toRecentTimespanOrYearMonthDay(row.lastUpdatedAt)
  }
}]

/**
 * The list of devices and their corresponding users
 *
 * @function
 * @name DeviceUpdates
 * @param {string} [token] The current access token for the user's authenticated session
 * @param {function} props.setMessage A callback function to place messages into the page which are generated from activity in this component
 * @returns {React.Component} The rendered JSX component
 */
function DeviceUpdates({ setMessage, token }) {
  const [currentPage, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [size, setSize] = useState(10)
  const [sizes] = useState([10, 25, 50])
  const [devices, setDevices] = useState([])
  const [currentlySelectedColumn, setCurrentlySelectedColumn] = useState("user")
  const [columnSort, setColumnSort] = useState(
    columns.reduce((sortObj, col) => ({
      ...sortObj,
      [col.id]: true
    }), {})
  )

  /**
   * Paginates a list of devices
   *
   * @function
   * @name paginate
   * @param {Array<Types.Device>} items The devices to paginate
   * @returns {Array<Types.Device>} The paginated list of devices
   */
  function paginate(items) {
    return items.slice((currentPage - 1) * size, currentPage * size)
  }

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
        return devices.slice().sort((a, b) => (
          b.name < a.name
            ? (isAscending ? 1 : -1)
            : (isAscending ? -1 : 1)
        ))
      case "user":
        return devices.slice().sort((a, b) => (
          b.user?.email < a.user?.email
            ? (isAscending ? 1 : -1)
            : (isAscending ? -1 : 1)
        ))
      case "updated":
        return devices.slice().sort((a, b) => (
          isAscending
            ? b.lastUpdatedAt - a.lastUpdatedAt
            : a.lastUpdatedAt - b.lastUpdatedAt
        ))
      case "status":
        return devices.slice().sort((a, b) => (
          statusSortValue(isAscending ? b : a) < statusSortValue(isAscending ? a : b)
            ? -1
            : 1
        ))
      case "version":
        return sortVersions(devices, isAscending)
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
  }, [setMessage, token])

  return (
    <DataTable
      data={paginate(devices)}
      sortBy={{
        columnId: currentlySelectedColumn,
        ascending: columnSort[currentlySelectedColumn]
      }}
      columns={columns}
      sort={(columnId) => setDevices(sortData(columnId))}
      header={<Header textAlign="center">Devices to Update</Header>}
      footer={
        <Pagination
          total={total}
          size={size}
          sizes={sizes}
          setSize={setSize}
          current={currentPage}
          setCurrent={setCurrent}
        />
      }
    />
  )
}

DeviceUpdates.propTypes = {
  token: PropTypes.string,
  setMessage: PropTypes.func.isRequired
}

export { DeviceUpdates }
