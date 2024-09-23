var http = require("http");
var employeeModule = require("./Employee");
console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        } 
        else if (req.url === '/employee') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(employeeModule.getAllEmployees()));
        } 
        else if (req.url === '/employee/names') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(employeeModule.getEmployeeNames()));
        } 
        else if (req.url === '/employee/totalsalary') {
            res.setHeader('Content-Type', 'application/json');
            const totalSalary = employeeModule.getTotalSalary();
            res.end(JSON.stringify({"total_salary": totalSalary}));
        } 
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
