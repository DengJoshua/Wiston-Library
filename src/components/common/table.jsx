import React, { Component } from 'react'
import TableHead from './tableHead'
import TableBody from './tableBody'

class Table extends Component {
  render() {
    const { columns, books } = this.props;
    return (
      <table className="table" >
            <TableHead columns={columns} />
            <TableBody books={books} columns={columns} />
      </table>
    )
  }
}

export default Table;
