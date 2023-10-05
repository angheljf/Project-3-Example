url = "http://127.0.0.1:5000/"

// Loop through the data and group by station and sum the precipitation
d3.json(url).then(function(data) {
    
        let station = data.map(row => row.station);
        let precipitation = data.map(row => row.prcp);
        let stationPrcp = {};
    
        for (let i = 0; i < station.length; i++) {
            if (station[i] in stationPrcp) {
                stationPrcp[station[i]] += precipitation[i];
            } else {
                stationPrcp[station[i]] = precipitation[i];
            }
        }

        // Arrange stationPrcp in descending order
        stationPrcp = Object.fromEntries(
            Object.entries(stationPrcp).sort(([,a],[,b]) => b-a)
        );

        // Use stationPrcp to a bar chart
        let x = Object.keys(stationPrcp);
        let y = Object.values(stationPrcp);

        var trace1 = {
            x: x,
            y: y,
            type: "bar"
        };

        var data = [trace1];

        var layout = {
            title: "Total Precipitation by Station",
            xaxis: { title: "Stations" },
            yaxis: { title: "Precipitation" }
        };

        Plotly.newPlot("plot", data, layout);
    });
