import React from 'react'

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap'

const Form =({title,amount,date,handleTitle,handleAmount,handleDate,handleSubmitForm }) => (
  <BTForm style={{ margin: 10 }} onSubmit={handleSubmitForm}>
    <FormGroup className="row">
      <Label  sm={2}>
        Title of Expense
      </Label>
      <Col sm={4}>
        <Input
          type="text"
          title="title"
          id="expenseName"
          placeholder="Please Enter any  Expenses"
          value={title}
          onChange={handleTitle}
        />
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
         Amount
      </Label>
      <Col sm={4}>
        <Input
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="0.00"
          value={amount}
          onChange={handleAmount}
        />
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Date
      </Label>
      <Col sm={4}>
        <Input
          type="date"
          name="date"
          id="expenseDate"
          placeholder=""
          value={date}
          onChange={handleDate}
        />
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>
  </BTForm>
)

export default Form