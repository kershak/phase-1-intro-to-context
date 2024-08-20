// Your code here
const createEmployeeRecord = function (record) {
    return {
        firstName : record[0],
        familyName : record[1],
        title : record[2],
        payPerHour : record[3],
        timeInEvents : [],  
        timeOutEvents : [],
    }
}

const createEmployeeRecords = function (employeeRowData) {
    return employeeRowData.map(function (record){
        return createEmployeeRecord(record)
    })
}

const createTimeInEvent = function (employee, timeData){
    let [date, hour] = timeData.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),       
        date,
    })  

    return employee 
}

const createTimeOutEvent = function (employee,timeData) {
    let [date, hour] = timeData.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const hoursWorkedOnDate = function (employee, workdedDate) {
    let clockedIn = employee.timeInEvents.find(function(event){
        return event.date === workdedDate
    })
    let clockedOut = employee.timeOutEvents.find(function(event){
        return event.date === workdedDate
    })
    return (clockedOut.hour - clockedIn.hour) / 100
}       

const wagesEarnedOnDate = function (employee, workdedDate) {
    let wage = hoursWorkedOnDate(employee, workdedDate) * employee.payPerHour
    return parseFloat(wage.toString())
}

const allWagesFor = function (employee) {
    let allWorkedDates = new Set([...employee.timeInEvents.map(event => event.date), ...employee.timeOutEvents.map(event => event.date)]); 
    let paidWage = 0;
    allWorkedDates.forEach(date => {
      paidWage += wagesEarnedOnDate(employee, date); 
    });
    return paidWage; 
} 

const findEmployeeByFirstName = function (mainArray, firstName){    
    return mainArray.find(function (records){
        return records.firstName === firstName
    })
}   

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(function (memo, records) {
        return memo + allWagesFor(records)
    }, 0);
}

            