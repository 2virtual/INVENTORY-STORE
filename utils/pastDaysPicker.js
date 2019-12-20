const formatDate=(date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


const ListDatesForThePastDays = n => (
    Array(n)
        .fill(new Date())
        .map((today, i) => today - 8.64e7 * i)
        .map(formatDate)
)
module.exports = ListDatesForThePastDays