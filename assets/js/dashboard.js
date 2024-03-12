import { Helper } from "../shared/helper.js";

let encoded_ChartData = [];
let request_ChartData = [];

(async () => {

  Array(4)
    .fill(0)
    .map((v, i) => i)
    .map(v => new Date().getFullYear() - v)
    .sort((a, b) => a + b)
    .forEach(v => Helper.f("#encoded_year_filter").innerHTML += `<li><a class="dropdown-item filter_encoded">${v}</a></li>`);

  Helper.fm(".filter_encoded", e => Helper.on(e, "click", () => {
    Load_EncodenChart(Number(Helper.removeWhiteSpaces(e.innerHTML)))
  }));

  await Load_EncodenChart();



  await LoadChart_RequestPie();

  // await LoadChart_RequestPie([
  //   {
  //     value: 500,
  //     name: 'Not Released'
  //   },
  //   {
  //     value: 1048,
  //     name: 'Released'
  //   }
  // ]);

  // await LoadChart_EncoderTotalEncoded([
  //   {
  //     name: 'Cedric',
  //     data: [1, 2, 3, 4, 5, 6, 7]
  //   },
  //   {
  //     name: 'Cedric',
  //     data: [1, 2, 2, 2, 2, 3, 4, 9, 2]
  //   },
  // ]);

})();

async function Load_EncodenChart(year= new Date().getFullYear()) {
  Helper.f("#transcriber_selected_year").innerHTML = `| ${year}`;
  const resp = (await Helper.api('user/monthly/encodes', 'json', new FormData()))
  const total_encoded_raw = resp.reduce((acc, current) => {
    const { uname, date, total } = current;
    acc[uname] = acc[uname] || [];
    acc[uname].push({ date, total });
    return acc;
  }, {});
  encoded_ChartData = Helper.ObjectToArray(total_encoded_raw)
    .map(v => ({ name: v.name, data: Encoded_getData(v.value, year) }))
    .filter(v => v.data.some(d => d > 0));

  await LoadChart_EncoderTotalEncoded();
}


function Encoded_getData(raw_data = [], year = new Date().getFullYear()) {
  const new_data = Array(year == new Date().getFullYear() ? (new Date().getMonth() + 1) : 12).fill(0);

  const raw = raw_data
    .map(v => ({ date: new Date(v.date), total: v.total }))
    .filter(v => v.date.getFullYear() == year)
    .map(v => ({ m: v.date.getMonth(), total: v.total }))
    .forEach(v => new_data[v.m] = v.total);
  return new_data;
}

async function LoadChart_RequestPie() {
  const passedData = request_ChartData;
  Helper.f("#requestPie").innerHTML = "";
  echarts.init(document.querySelector("#requestPie")).setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
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
      }
    ]
  });
}

async function LoadChart_EncoderTotalEncoded() {
  const passedData = encoded_ChartData;
  Helper.f("#encodedChart").innerHTML = "";
  new ApexCharts(Helper.f("#encodedChart"), {
    series: passedData,
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
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
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
