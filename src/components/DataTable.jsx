import PropTypes from "prop-types"
import { Table } from "semantic-ui-react"

/**
 * The table header column configuration details
 *
 * @typedef {Object<string, string|boolean|PropTypes.element>} HeaderColumn
 * @property {string} id The unique identifier (key) for the column
 * @property {boolean} [collapsing] A table can be collapsing, taking up only as much space as its rows.
 * @property {PropTypes.element} header The header cell contenxt text or another (simple) element
 * @param {function} render A function to use when rendering a row to pick out the appropiate field from a single row
 */

/**
 * The table sorting configuration details
 *
 * @typedef {Object<string, string|boolean>} SortBy
 * @property {string} [columnId] The column id to sort by
 * @property {boolean} [ascending] Whether or not to sort in ascending order
 */

/**
 * A data item to be rendered into a table row
 *
 * @typedef {Object<string, any>} Item
 * @property {string} id The unique identifier (key) for the item
 */

/**
 * A data table component which uses the semantic UI `Table` component under-the-hood to display data in a sortable & pageable manner.
 *
 * @function
 * @name DataTable
 * @param {Array<Item>} props.data The data items to render into the table rows
 * @param {function} props.sort A sorting function which receives the column ID and determines how to order the rows
 * @param {PropTypes.element} [props.header] An optional header text/element to stretch across the top of the table (above the individual column headers)
 * @param {PropTypes.element} [props.footer] An optional footer text/element to stretch across the bottom of the table
 * @param {SortBy} props.sortBy The column sorting configuration (for ascending/descending order and by which column)
 * @param {Array<HeaderColumn>} props.columns The column header configuration details
 * @returns {PropTypes.element} The rendered data table
 */
function DataTable({ data, sort, header, footer, sortBy, columns }) {
  const sortDirection = /^true$/i.test(sortBy?.ascending)
    ? "ascending"
    : "descending"

  return (
    <Table sortable celled>
      <Table.Header>
        {!!header && (
          <Table.Row>
            <Table.HeaderCell colSpan={columns.length}>
              {header}
            </Table.HeaderCell>
          </Table.Row>
        )}
        <Table.Row>
          {columns.filter(column => !!column.id).map((column) => (
            <Table.HeaderCell
              key={column.id}
              sorted={
                sortBy.columnId === column.id ? sortDirection : undefined
              }
              onClick={() => sort(column.id)}
              collapsing={column.collapsing}
            >
              {column.header}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((column) => (
              <Table.Cell
                key={column.id}
                collapsing={column.collapsing}
              >
                {column.render(item)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        {!!footer && (
          <Table.Row>
            <Table.HeaderCell colSpan={columns.length}>
              {footer}
            </Table.HeaderCell>
          </Table.Row>
        )}
      </Table.Footer>
    </Table>
  )
}

DataTable.propTypes = {
  header: PropTypes.element,
  footer: PropTypes.element,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    collapsing: PropTypes.bool,
    render: PropTypes.func
  })),
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })),
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.shape({
    columnId: PropTypes.string,
    ascending: PropTypes.bool
  })
}

DataTable.defaultProps = {
  data: [],
  columns: [],
  sortBy: {
    ascending: false
  }
}

export { DataTable }
