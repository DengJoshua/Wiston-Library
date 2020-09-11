import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { books, columns } = this.props;

    return (
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            {columns.map(column => (
              <td key={this.createKey(book, column)}>
                {this.renderCell(book, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
