import PropTypes from "prop-types"
import { Menu, Icon } from "semantic-ui-react"

/**
 * A React component which handles pagination of a set of rows in a data table
 *
 * @function
 * @name Pagination
 * @param {number} props.current The current page number
 * @param {number} props.total The number of pages in total
 * @param {function} props.setCurrent A callback function which sets the current page to given (numeric) value
 * @param {function} props.setSize A callback function which sets the page size to a given (numeric) value
 * @param {number} props.size The current page size
 * @param {Array<number>} props.sizes A list of page size values
 * @returns {PropTypes.element} The rendered pagination compoent
 */
function Pagination({ current, total, setCurrent, setSize, size, sizes }) {
  return (
    <>
      <Menu floated="right" pagination>
        <Menu.Item
          as="a"
          icon
          disabled={current === 1}
          onClick={() => setCurrent(1)}
        >
          <Icon name="angle double left" />
        </Menu.Item>
        <Menu.Item
          as="a"
          icon
          disabled={current === 1}
          onClick={() => setCurrent(current - 1)}
        >
          <Icon name="angle left" />
        </Menu.Item>
        <Menu.Item active>
          Page {current} of {total}
        </Menu.Item>
        <Menu.Item
          as="a"
          icon
          disabled={current === total}
          onClick={() => setCurrent(current + 1)}
        >
          <Icon name="angle right" />
        </Menu.Item>
        <Menu.Item
          as="a"
          icon
          disabled={current === total}
          onClick={() => setCurrent(total)}
        >
          <Icon name="angle double right" />
        </Menu.Item>
      </Menu>
      <Menu floated="right" pagination>
        <Menu.Item active>Items per page</Menu.Item>
        {sizes.map((item) => (
          <Menu.Item
            key={item}
            onClick={() => setSize(item)}
            header={item === size}
            name={`${item}`}
          />
        ))}
      </Menu>
    </>
  )
}

Pagination.propTypes = {
  current: PropTypes.number,
  setCurrent: PropTypes.func.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number,
  sizes: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number
}

Pagination.defaultProps = {
  current: 0,
  size: 0,
  sizes: [],
  total: 0
}

export { Pagination }
