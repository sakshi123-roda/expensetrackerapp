import React from 'react'
import { Table, ListGroup, ListGroupItem } from 'reactstrap'

const List = ({ expenses }) => (
  <div>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {expenses.map((item, index) => (
        <tr key={index}>

          <th scope="row">{index + 1}</th>
          <td>{item.date}</td>
          <td>{item.title}</td>
          <td>${item.amount}</td>
        </tr>
      ))}
      </tbody>
    </Table>
   
  </div>
)

export default List