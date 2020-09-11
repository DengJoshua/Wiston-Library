import React, { Component } from 'react'

class TableHead extends Component {
  render() {

    const { columns } = this.props;

    return (
        <thead className="thead-dark">
            <tr>
            {
                columns.map(column => (
                    <th key={column.path|| column.key} >{column.label}</th>
                ))           
             }
            </tr>
        </thead>
    )
  }
}

export default TableHead;
