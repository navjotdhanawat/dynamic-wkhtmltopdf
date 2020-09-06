var fs = require('fs');
var pdf = require('./index');
var html = fs.readFileSync('template.html', 'utf8');

// Custom handlebar helper
pdf.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
})

var options = {
    pageSize: "A3"
};
// for more options refer wkhtmltopdf official documentation

var users = [
    {
        name: 'aaa',
        age: 24,
        dob: '1/1/1991'
    },
    {
        name: 'bbb',
        age: 25,
        dob: '1/1/1995'
    },
    {
        name: 'ccc',
        age: 24,
        dob: '1/1/1994'
    }
];

var document = {
    type: 'file',     // 'file' , 'buffer' or 'stream'
    template: html,
    context: {
        users: users
    },
    path: "./output.pdf"    // it is not required if type is buffer
};

pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });