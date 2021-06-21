import React, { Component} from "react";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Dashboard.css";
import { Jumbotron, Container,FormGroup,Col,Label,Input, InputGroup, InputGroupAddon, Button, InputGroupText } from 'reactstrap'
import Logo from '.././logo.svg'
import Form from './Form'
import List from './List'
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      searched: '',
      min_amount:'',
      max_amount:'',
      min_date:'',
      max_date:'',
      filtered_expenses:''
    };
    this.handleSearched = this.handleSearched.bind(this);
    this.handleMinAmount = this.handleMinAmount.bind(this);
    this.handleMaxAmount = this.handleMaxAmount.bind(this);
    this.handleMinDate = this.handleMinDate.bind(this);
    this.handleMaxDate = this.handleMaxDate.bind(this);
    this.search = this.search.bind(this);
}
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true,
  });
};
handleSearched(event) {this.setState({searched: event.target.value});}
handleMinAmount(event) {this.setState({min_amount: event.target.value});}
handleMaxAmount(event) {this.setState({max_amount: event.target.value});}
handleMinDate(event) {this.setState({min_date: event.target.value});}
handleMaxDate(event) {this.setState({max_date: event.target.value});}
  search(event) {
    event.preventDefault();
    var filtered_expenses =this.props.expenses;
    var searched = this.state.searched;
    if(searched!== ''){
        filtered_expenses = filtered_expenses.filter(
        (expense) =>  (expense.title).includes(searched)
      );
    }
    var min_amount = this.state.min_amount;
    var max_amount = this.state.max_amount;
    if(min_amount!== '' && max_amount!== '')
    {
       filtered_expenses = filtered_expenses.filter(
        (expense) =>  (parseFloat(expense.amount) >=parseFloat(min_amount))&& (parseFloat(expense.amount) <=parseFloat(max_amount))
      );
    }
    var min_date = this.state.min_date;
    var max_date = this.state.max_date;
    if(min_date!==''&& max_date!=='')
    {
      filtered_expenses = filtered_expenses.filter(
        (expense) =>  (expense.date >=min_date)&& (expense.date <=max_date)
      );
    }
    this.setState({
      filtered_expenses: filtered_expenses,
   });
}
 render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div>
       <ul>
          <li>
            <Link to={`${match.path}`}>Dashboard</Link>
          </li>
          <li className="push-right">
            <button onClick={this.signOut} href="#">
              Log Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Container className="text-center">
              <Jumbotron fluid>
                <h1 className="display-6">
                  Expense Tracker
                  <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
                </h1>
                <div>
                  <p>
                    Total Expense:{' '}
                    <span className="text-success">
                      ${' '}
                      {this.props.expenses.reduce((accumulator, currentValue) => {
                        return (accumulator += parseInt(currentValue.amount))
                      }, 0)}
                    </span>
                  </p>
                </div>
                <Form 
                  title={this.props.title}
                  amount={this.props.amount}
                  date = {this.props.date}
                  handleTitle={this.props.handleTitle}
                  handleAmount={this.props.handleAmount}
                  handleDate = {this.props.handleDate}
                  handleSubmitForm={this.props.handleSubmitForm}
                />
                <FormGroup className="row">
                  <Label for="exampleEmail" sm={2}>
                          Amount
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="amount_min"
                      id="expenseAmount"
                      placeholder=""
                      value={this.state.min_amount}
                      onChange={this.handleMinAmount}
                    />
                  </Col>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="amount_max"
                      id="expenseAmount"
                      placeholder=""
                      value={this.state.max_amount}
                      onChange={this.handleMaxAmount}
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
                       name="date_min"
                       id="expenseDate"
                       placeholder=""
                       value={this.state.min_date}
                       onChange={this.handleMinDate}
                    />
                  </Col>
                  <Col sm={4}>
                    <Input
                      type="date"
                      name="date_max"
                      id="expenseDate"
                      placeholder=""
                      value={this.state.max_date}
                      onChange={this.handleMaxDate}
                    />
                  </Col>
                </FormGroup>
                <InputGroup>
                  <Input
                    type="text"
                    title="title"
                    placeholder="search"
                    value={this.state.searched}
                    onChange={this.handleSearched}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Button color="primary" onClick={this.search}>Go</Button>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                  <List expenses={this.state.filtered_expenses ? this.state.filtered_expenses : this.props.expenses} /> 
              </Jumbotron>
            </Container>
          </div>
        </main>  
      </div>
    );
  }
}

export default withRouter(Dashboard);