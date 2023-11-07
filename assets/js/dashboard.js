MAIN.addNotif("Welcome!", CONST_UNAME);
GRAPH = {
    bar: {
        data: []
    },
    pie: {
        data: []
    }
}

async function setupEncoded_monthly() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element 
    let root = am5.Root.new("encoded-monthly");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/ 
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    remove_logo(root);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        maxTooltipDistance: 0,
        pinchZoomX: true
    }));

    


    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
        value = Math.round((Math.random() * 10 - 4.2) + value);
        am5.time.add(date, "day", 1);
        return {
            date: date.getTime(),
            value: value
        };
    }

    function generateDatas(count) {
        let data = [];
        for (let i = 0; i < count; ++i) {
            data.push(generateData());
        }
        return data;
    }

    function setUpSeries(chart, name) {
        return chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series " + name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            legendValueText: "{valueY}",
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "{valueY}"
            })
        }));
    }


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let series = null;

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    for (let i = 0; i < 10; i++) {
        series = setUpSeries(chart, i);        

        date = new Date();
        date.setHours(0, 0, 0, 0);
        value = 0;

        let data = generateDatas(10);
        series.data.setAll(data);
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
    }

    setTimeout(()=>{
        
    }, 3000)
    
    

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical"
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100)
    }));

    // When legend item container is hovered, dim all the series except the hovered one
    legend.itemContainers.template.events.on("pointerover", function (e) {
        let itemContainer = e.target;

        // As series list is data of a legend, dataContext is series
        let series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries) {
            if (chartSeries != series) {
                chartSeries.strokes.template.setAll({
                    strokeOpacity: 0.15,
                    stroke: am5.color(0x000000)
                });
            } else {
                chartSeries.strokes.template.setAll({
                    strokeWidth: 3
                });
            }
        })
    })

    // When legend item container is unhovered, make all series as they are
    legend.itemContainers.template.events.on("pointerout", function (e) {
        let itemContainer = e.target;
        let series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries) {
            chartSeries.strokes.template.setAll({
                strokeOpacity: 1,
                strokeWidth: 1,
                stroke: chartSeries.get("fill")
            });
        });
    })

    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
        width: am5.p100,
        textAlign: "right"
    });

    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}

async function setupEncoded_live() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("encoded-live");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    remove_logo(root);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none"
    }));

    // We don't want zoom-out button to appear while animating, so we hide it
    chart.zoomOutButton.set("forceHidden", true);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30
    });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: 0,
        paddingRight: 15
    });
    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "uname",
        renderer: xRenderer
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "total",
        categoryXField: "uname"
    }));

    // Rounded corners for columns
    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
    });

    // Make each column to be of a different color
    series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // Add Label bullet
    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationY: 1,
            sprite: am5.Label.new(root, {
                text: "{valueYWorking.formatNumber('#.')}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: 0,
                centerX: am5.p50,
                populateText: true
            })
        });
    });


    let data = await fetch_data('user/all/encodes', {method : 'post', form : ""}, series);
    data = await data.json();
    let temp = [];

    for(let d of data) {
        temp.push({uname : d.uname, total : parseInt(d.total)});
    }

    xAxis.data.setAll(temp);
    series.data.setAll(temp);

    // update data with random values each 1.5 sec
    setInterval(async function () {
        let users = await fetch_data('user/all/encodes', {method : 'post', form : ""}, series);
        users = await users.json();


        for(let user of users) {
            addNewData(user);
        }
        // updateData();

    }, 1500)

    function addNewData(data) {
        const keys = xAxis.data.values.map(data => data.uname);
        
        const uname = data.uname;
        const total = parseInt(data.total);

        

        if(!keys.includes(uname)) {

            let nData = {"uname" : uname, "total" : total};

            xAxis.data.push(nData);
            series.data.push(nData);
        } else {
            
            const prev_total = series.data.values[keys.indexOf(uname)].total ;


            if(prev_total != total) {
                // console.log(prev_total, total);
                am5.array.each(series.dataItems, function (dataItem) {
                    if(dataItem.get("categoryX") == uname) {
                        let value = total;
                        // both valueY and workingValueY should be changed, we only animate workingValueY
                        dataItem.set("valueY", value);
                        dataItem.set("categoryX", uname);
                        
                        dataItem.animate({
                            key: "valueYWorking",
                            to: value,
                            duration: 600,
                            easing: am5.ease.out(am5.ease.cubic)
                        });
                    }
                })
                sortCategoryAxis()
            }

    }
}
    function updateData() {

        am5.array.each(series.dataItems, function (dataItem) {
        
            var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
            if (value < 0) {
                value = 10;
            }
            // both valueY and workingValueY should be changed, we only animate workingValueY
            dataItem.set("valueY", value);
            dataItem.animate({
                key: "valueYWorking",
                to: value,
                duration: 600,
                easing: am5.ease.out(am5.ease.cubic)
            }); 
        })
        am5.array.each(series.dataItems, function (dataItem) {
            let value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
            if (value < 0) {
                value = 10;
            }

            console.log(dataItem.get("category"));
            // both valueY and workingValueY should be changed, we only animate workingValueY
            // dataItem.set("valueY", value);
            // dataItem.animate({
            //     key: "valueYWorking",
            //     to: value,
            //     duration: 600,
            //     easing: am5.ease.out(am5.ease.cubic)
            // });
        })

        // sortCategoryAxis();
    }

    
    // Get series item by category
    function getSeriesItem(category) {
        for (let i = 0; i < series.dataItems.length; i++) {
            let dataItem = series.dataItems[i];
            if (dataItem.get("categoryX") == category) {
                return dataItem;
            }
        }
    }


    // Axis sorting
    function sortCategoryAxis() {

        // Sort by value
        series.dataItems.sort(function (x, y) {
            return y.get("valueY") - x.get("valueY"); // descending
            //return y.get("valueY") - x.get("valueY"); // ascending
        })

        // Go through each axis item
        am5.array.each(xAxis.dataItems, function (dataItem) {
            // get corresponding series item
            let seriesDataItem = getSeriesItem(dataItem.get("category"));
            console.log(seriesDataItem);
            if (seriesDataItem) {
                // get index of series data item
                let index = series.dataItems.indexOf(seriesDataItem);
                // calculate delta position
                let deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
                // set index to be the same as series data item index
                dataItem.set("index", index);
                // set deltaPosition instanlty
                dataItem.set("deltaPosition", -deltaPosition);
                // animate delta position to 0
                dataItem.animate({
                    key: "deltaPosition",
                    to: 0,
                    duration: 1000,
                    easing: am5.ease.out(am5.ease.cubic)
                })
            }
        });

        // Sort axis items by index.
        // This changes the order instantly, but as deltaPosition is set,
        // they keep in the same places and then animate to true positions.
        xAxis.dataItems.sort(function (x, y) {
            return x.get("index") - y.get("index");
        });
    }


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
}


async function setupRemarks_pie() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("remarks-pie");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    remove_logo(root); 

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
    }));


    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
        { value: 10, category: "One" },
        { value: 9, category: "Two" },
        { value: 6, category: "Three" },
        { value: 5, category: "Four" },
        { value: 4, category: "Five" },
        { value: 3, category: "Six" },
        { value: 1, category: "Seven" },
    ]);


    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);
}



$(window).on("load", function (e) {
    am5.ready(async function () {
        if (CONST_ROLE === 'A') {
            await setupEncoded_live();
            await setupEncoded_monthly();
            await setupRemarks_pie();
        }
    });
});

function newShelf() {
    MODAL.setTitle("<span class='fs-5'>New Shelf<span>");
    MODAL.setBody(`<div>
        <input type='text' class='form-control'name='name' placeholder='Shelf name'>
    </div>`);
    MODAL.setFooter("<button class='btn btn-success'>Add</button><button class='btn btn-danger' type='button' onClick='MODAL.close()'>Cancel</button>");
    MODAL.onSubmit((e)=>{
        const form = new FormData(MODAL.form);
        
        // add new shelf here
    });
    
    MODAL.open();
}

function remove_logo(root) {
    root._logo.dispose();
}

// Patrick
function fetch_data(url, method = null, series) {
    return fetch(url, method);
}

// $("#statistics-tab").on("click", ()=>{
//     am5WaterMarkRemover(["encoded-live", "remarks-pie", "encoded-monthly"]);
// })

// function am5WaterMarkRemover(ids = []) {
//     $("div.am5-html-container").remove();
//     $("div.am5-reader-container").remove();
//     $("div.am5-focus-container").remove();
//     $("div.am5-tooltip-container").remove();

//     for(let id of ids) {
//         const tip = $(`#${id} > div > div > div`).children()[1].remove();
//     }
// }
