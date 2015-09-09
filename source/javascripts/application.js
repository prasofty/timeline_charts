
//= require jquery-2.1.4
//= require bootstrap
//= require prettify
//= require moment-with-locales

$(document).ready(function(){
    prettyPrint();

    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Term' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });

        dataTable.addRows([
            [ '1', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
            [ '2', 'John Adams',        new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
            [ '3', 'Thomas Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

        chart.draw(dataTable);
    }

    google.setOnLoadCallback(drawAdvChart);
    function drawAdvChart() {

        var container = document.getElementById('timeline-adv');
        var chart = new google.visualization.Timeline(container);

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Position' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });

        dataTable.addRows([
            [ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
            [ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
            [ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
            [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
            [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
            [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
            [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
            [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
            [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
            [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
            [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
            [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
            [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
            [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
            [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
        ]);

        chart.draw(dataTable);
    }

    var date = moment();

    $('.prev-week').click(function(e){
        e.preventDefault();
        drawComChart(moment($(this).data('date')).subtract(1, 'day'));
        return false;
    });

    $('.next-week').click(function(e){
        e.preventDefault();
        drawComChart(moment($(this).data('date')).add(1, 'day'));
        return false;
    });

    google.setOnLoadCallback(drawComChart(date));
    function drawComChart(date) {
        $('.timeline-complex-header-label > .start-week').text(date.startOf('week').format('MMM Do, YYYY'));
        $('.timeline-complex-header-label > .end-week').text(date.endOf('week').format('MMM Do, YYYY'));

        $('.prev-week').data('date', date.startOf('week').format('YYYY-MM-DD'));
        $('.next-week').data('date', date.endOf('week').format('YYYY-MM-DD'));

        var container = document.getElementById('timeline-complex');
        var chart = new google.visualization.Timeline(container);

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Day' });
        dataTable.addColumn({ type: 'datetime', id: 'Check-in' });
        dataTable.addColumn({ type: 'datetime', id: 'Check-out' });



        var _rows = [];
        _rows.push(['Monday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Tuesday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Wednesday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Thursday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Friday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Saturday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Saturday', new Date(0, 0, 0, 23, 59, 59), new Date(0, 0, 0, 23, 59, 59)]);
        _rows.push(['Sunday', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)]);
        _rows.push(['Sunday', new Date(0, 0, 0, 23, 59, 59), new Date(0, 0, 0, 23, 59, 59)]);

        dataTable.addRows(_rows);

        var options = {
            height: 290,
            colors: ['#1ab394', '#23c6c8', '#1c84c6', '#f8ac59', '#f8ac59', '#ed5565', '#5e5e5e'],
            timeline: {
                groupByRowLabel: true,
                barLabelStyle: { fontName: 'open sans', fontSize: 10, color: '#23c6c8' },
                rowLabelStyle: { fontName: 'open sans', fontSize: 10 }
            },
            tooltip: {
                textStyle: {
                    fontName: 'open sans', fontSize: 11
                }
            },
            hAxis: {
                format: 'hh:mm a',
                viewWindow: {
                    min: new Date(0, 0, 0, 0, 0, 0, 0),
                    max: new Date(0, 0, 0, 23, 59, 59)
                }
            }
        };
        chart.draw(dataTable, options);
        console.log('draw')
    }

});