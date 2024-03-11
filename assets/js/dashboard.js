(async () => {

  await LoadChart_RequestPie([
    {
      value: 500,
      name: 'Not Released'
    },
    {
      value: 1048,
      name: 'Released'
    }
  ]);

  await LoadChart_EncoderTotalEncoded([
    {
      name: 'Cedric',
      data: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      name: 'Cedric',
      data: [1, 2, 2, 2, 2, 3, 4, 9, 2]
    },
  ]);


})();

async function LoadChart_RequestPie(passedData = []) {
  echarts.init(document.querySelector("#trafficChart")).setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [{
      name: 'File Request',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: passedData,
    }]
  });
}

async function LoadChart_EncoderTotalEncoded(passData = []) {

  new ApexCharts(document.querySelector("#reportsChart"), {
    series: passData,
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
    },
    markers: {
      size: 4
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'string',
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Dec",
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }).render();
}
