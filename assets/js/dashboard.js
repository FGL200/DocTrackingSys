import { Helper } from "../shared/helper.js";
import { Modal } from "../shared/modal.js";
import { SheetJS } from "../shared/sheet-js.js";

let encoded_ChartData = [];
let request_ChartData = [];

(async () => {

  Array(4)
    .fill(0)
    .map((v, i) => i)
    .map(v => new Date().getFullYear() - v)
    .sort((a, b) => a + b)
    .forEach(v => Helper.f("#encoded_year_filter").innerHTML += `<li><a class="dropdown-item filter_encoded">${v}</a></li>`);

  Helper.fm(".filter_encoded", e => Helper.on(e, "click", async () => {
    await Load_EncodenChart(Number(Helper.removeWhiteSpaces(e.innerHTML)))
  }));

  await Load_EncodenChart();


  Helper.fm(".filter_request", e => Helper.on(e, "click", async function () {
    await Load_PieChart(Helper.removeWhiteSpaces(e.innerHTML));
  }));

  await Load_PieChart();
})();

async function Load_PieChart(showBy = 'ThisMonth') {
  const resp = (await Helper.api('report/requests-graph', 'json'));
  switch (showBy) {
    case 'PrevMonth':
      request_ChartData = [{ value: resp.curr_month.released ?? 0, name: 'Not Released', }, { value: resp.curr_month.not_released ?? 0, name: 'Released', }];
      Helper.f("#request_selected_filter").innerHTML = "| Previous Month";
      LoadChart_RequestPie();
      break;
    case 'ThisMonth':
      request_ChartData = [{ value: resp.prev_month.released ?? 0, name: 'Not Released', }, { value: resp.prev_month.not_released ?? 0, name: 'Released', }];
      Helper.f("#request_selected_filter").innerHTML = "| This Month";
      LoadChart_RequestPie();
      break;
    case 'ThisYear':
      request_ChartData = [{ value: resp.yearly.released ?? 0, name: 'Not Released', }, { value: resp.yearly.not_released ?? 0, name: 'Released', }];
      Helper.f("#request_selected_filter").innerHTML = "| This Year";
      LoadChart_RequestPie();
      break;
    default: break;
  }
}

async function Load_EncodenChart(year = new Date().getFullYear()) {
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
  echarts.init(Helper.f("#requestPie")).setOption({
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






Helper.onClick("#generate_report", async () => {

  Modal.unhideCloseButton();
  Modal.setTitle('Generate Report')
  Modal.setBody(`
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group mb-3">
        <label for="date_from">From <small class="text-danger">* </small></label>
        <input id="date_from" name="_form" class="form-control" type="date" />
      </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group mb-3">
        <label for="date_to">To <small class="text-danger">* </small></label>
        <input id="date_to" name="_to" class="form-control" type="date" />
      </div>
    </div>
    <div class="col-12 text-center">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button id="btn_report_remarks" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Remarks Report</button>
        <button id="btn_report_request" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Requests Report</button>
        <button id="btn_report_documents" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Documents Report</button>
      </div>
    </div>
  </div>
  `, () => {


    Helper.onClick("#btn_report_remarks", async () => {
      const date_data = Helper.getDataFromFormData(Modal.form);
      const resp = (await Helper.api('report/remarks', 'json', new FormData()));
      console.log({ resp })


      // Modal.close();
    });

    Helper.onClick("#btn_report_request", async () => {

      const date_data = Helper.getDataFromFormData(Modal.form);
      Modal.close();
      setTimeout(() => {
        Modal.unhideCloseButton();
        Modal.setTitle('Request Report');
        Modal.setBody(`
          <table class="table table-striped table-sm border">
            <tr>
              <th></th>
              <th>Contents</th>
            </tr>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Released</td>
            </tr>
          </table>
        `)
        Modal.open();

      }, 500);
    });

    Helper.onClick("#btn_report_documents", async () => {

      const date_data = Helper.getDataFromFormData(Modal.form);
      Modal.close();
      setTimeout(() => {
        Modal.unhideCloseButton();
        Modal.setTitle('Documents Report');
        Modal.setBody(`
          <table class="table table-striped table-sm border">
            <tr>
              <th><input id="check_all_documents" type="checkbox"/></th>
              <th>Contents</th>
            </tr>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Registration Form</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Junior Form 137</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Senior Form 137</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Form 138</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Birth Certificate</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Good Moral</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Application for Graduation</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Transcript of Records</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Certificate Of Completion</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Honorable Dismisal / Certificate of Transferee</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Request for Clearance</td>
            <tr>
              <td><input type="checkbox" name=""/></td>
              <td>Request for Credentials Form</td>
            </tr>
          </table>
        `)
        Modal.open();
      }, 500);
    });

  });
  Modal.open();
});






function makeTabke(id, headers = [], body = [[]]) {
  let thead = '';
  headers.forEach(v => thead += `<th>${v}</th>`);

  let tbody = '';
  body.forEach(raw => {
    let data = '';
    raw.forEach(v => data += `<td>${v}</td>`);
    tbody += `<tr>${data}</tr>`
  });
  return `<table id="${id}"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
}