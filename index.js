const createEmployeeRecords = employees => {
  return employees.map(createEmployeeRecord);
}

const createEmployeeRecord = employee => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createTimeInEvent = function(timestamp) {
  this.timeInEvents.push(createInOutEvent(timestamp, "TimeIn"));
  return this;
}

const createTimeOutEvent = function(timestamp) {
  this.timeOutEvents.push(createInOutEvent(timestamp, "TimeOut"));
  return this;
}

const createInOutEvent = (timestamp, type) => {
  const dateAndTime = timestamp.split(" ");
  return {
    type: type,
    hour: parseInt(dateAndTime[1]),
    date: dateAndTime[0]
  }
}

const wagesEarnedOnDate = function(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

const hoursWorkedOnDate = function(date) {
  const timeInEvent = findTimeInEventFromDate.call(this, date);
  const timeOutEvent = findTimeOutEventFromDate.call(this, date);
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const findTimeInEventFromDate = function(date) {
  return this.timeInEvents.find(event => {
    return event.date === date;
  });
}

const findTimeOutEventFromDate = function(date) {
  return this.timeOutEvents.find(event => {
    return event.date === date;
  })
}

const calculatePayroll = (employees) => {
  return employees.reduce(function(total, employee) {
    return total + allWagesFor.call(employee);
  }, 0);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
  return employeeRecords.find(record => record.firstName === firstName);
}