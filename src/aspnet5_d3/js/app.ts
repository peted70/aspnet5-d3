document.addEventListener('DOMContentLoaded', function () {

    var data = [
        78.0,
        120.0,
        80.0,
        90.0,
        92.5,
        76.2,
        120.0,
        80.0,
        90.0,
        92.5,
        76.2
    ];

    var chart = new Charts.LineChart(600, 300, data);
    var button = document.getElementById('updateButton');
    var random = d3.random.normal(80, 20);

    document.addEventListener('click', function (ev) {
        chart.currentValue = random();
    }, true);
});
