import { Helper } from "../shared/helper.js";
import { Modal } from "../shared/modal.js";
import { SheetJS } from "../shared/sheet-js.js";

let encoded_ChartData = [];
let request_ChartData = [];

(async () => {

  // Init Sheet JS
  SheetJS.init();

  // Make a filter array for encode
  Array(4)
    .fill(0)
    .map((v, i) => i)
    .map(v => new Date().getFullYear() - v)
    .sort((a, b) => a + b)
    .forEach(v => Helper.f("#encoded_year_filter").innerHTML += `<li><a class="dropdown-item filter_encoded">${v}</a></li>`);

  // filter encodes
  Helper.fm(".filter_encoded", e => Helper.on(e, "click", async () => {
    await Load_EncodenChart(Number(Helper.removeWhiteSpaces(e.innerHTML)))
  }));

  // load filtered encodes
  await Load_EncodenChart();


  // filter requests
  Helper.fm(".filter_request", e => Helper.on(e, "click", async function () {
    await Load_PieChart(Helper.removeWhiteSpaces(e.innerHTML));
  }));

  // load filtered requests
  await Load_PieChart();
})();

async function Load_PieChart(showBy = 'ThisMonth') {
  const resp = (await Helper.api('report/requests-graph', 'json'));
  switch (showBy) {
    case 'ThisMonth':
      request_ChartData = [{ value: resp.curr_month.released ?? 0, name: 'Not Released', }, { value: resp.curr_month.not_released ?? 0, name: 'Released', }];
      Helper.f("#request_selected_filter").innerHTML = "| This Month";
      LoadChart_RequestPie();
      break;
    case 'PrevMonth':
      request_ChartData = [{ value: resp.prev_month.released ?? 0, name: 'Not Released', }, { value: resp.prev_month.not_released ?? 0, name: 'Released', }];
      Helper.f("#request_selected_filter").innerHTML = "| Previous Month";
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
        <input id="date_from" name="_from" class="form-control" type="date" />
      </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group mb-3">
        <label for="date_to">To <small class="text-danger">* </small></label>
        <input id="date_to" name="_to" class="form-control" type="date" />
      </div>
    </div>
    <div class="col-12 text-center">
      <div class="btn-group mb-3" role="group" aria-label="Basic example">
        <button id="btn_report_remarks" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Remarks Report</button>
        <button id="btn_report_request" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Requests Report</button>
        <button id="btn_report_documents" type="button" class="btn btn-outline-primary btn-sm" ><i class="bi bi-download"></i> Documents Report</button>
      </div>
    </div>
    <div class="col-12">
      <small class="error-msg text-danger"></small>
    </div>
  </div>
  `, () => {


    Helper.onClick("#btn_report_remarks", async () => {
      Modal.close();
      const resp = (await Helper.api('report/remarks', 'json', new FormData()));
      setTimeout(async () => {
        Modal.setTitle('Generating file')
        Modal.setBody(
          `<div class="alert alert-light">Generating. Please wait.</div>`
          + createTable("remarks_table", ["Form", "Released Document"], Helper.ObjectToArray(resp).map(v => [v.name, v.value]), true)
        );
        Modal.open()
        SheetJS.clear();
        await SheetJS.save("#remarks_table", "remarks");
        Modal.close();
      }, 500);
    });

    Helper.onClick("#btn_report_request", async () => {

      const date_data = Helper.getDataFromFormData(Modal.form);
      if (Helper.formValidator(Modal.form, ["_from", "_to"], v => v == '').length > 0) {
        Helper.Promt_Error("* Please fill out the required fields.")
        return;
      }

      Modal.close();
      setTimeout(async () => {
        Modal.unhideCloseButton();
        Modal.setTitle('Request Report');
        Modal.setBody(`
          <table class="table table-striped table-sm border">
            <tr>
              <th></th>
              <th>Contents</th>
            </tr>
            <tr>
              <td><input type="checkbox" name="released" id="request_released_cb"/></td>
              <td><label for="request_released_cb">Released</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="not-released" id="not_request_released_cb"/></td>
              <td><label for="not_request_released_cb">Not Released</label></td>
            </tr>
            <tr>
              <td><input type="checkbox" name="pending" id="request_pending_cb"/></td>
              <td><label for="request_pending_cb">Pending</label></td>
            </tr>
          </table>
        `);
        Modal.setFooter(await Modal.button('Generate', 'primary'));
        Modal.open();
        Modal.submit(async (e, form_data) => {
          const data = Helper.getDataFromFormData(form_data);
          const body = {
            ...date_data,
            released: data.released ? 1 : 0,
            pending: data.pending ? 1 : 0,
            ['not-released']: data['not-released'] ? 1 : 0,
          }
          Modal.close();
          const resp = (await Helper.api('report/requests', 'json', Helper.createFormData(body)));

          setTimeout(async () => {
            Modal.setTitle('Generating file')
            Modal.setBody(
              `<div class="alert alert-light">Generating. Please wait.</div>`
              + createTable("docs_table", ["Request Status", "Total"], Helper.ObjectToArray(resp).map(v => [v.value._status, v.value.total]), true)
            );
            Modal.open()
            SheetJS.clear();
            await SheetJS.save("#docs_table", "docs");
            Modal.close();
          }, 500);

        });
      }, 500);
    });

    Helper.onClick("#btn_report_documents", async () => {

      const date_data = Helper.getDataFromFormData(Modal.form);
      if (Helper.formValidator(Modal.form, ["_from", "_to"], v => v == '').length > 0) {
        Helper.Promt_Error("* Please fill out the required fields.")
        return;
      }

      Modal.close();
      setTimeout(async () => {
        Modal.unhideCloseButton();
        Modal.setTitle('Documents Report');
        const categories = (await Helper.api('file-request-category/all', 'json'));
        console.log({ categories })
        let trs = '';
        categories.forEach(v => trs += `
          <tr>
            <td><input type="checkbox" class="doc_cbs" name="${v.name}" id="doc_${v.id}_cb" /></td>
            <td><label for="doc_${v.id}_cb"> ${v.name} </label></td>
          </tr>
        `);
        Modal.setBody(`
          <table class="table table-striped table-sm border">
            <tr>
              <th><input id="check_all_documents" type="checkbox"/></th>
              <th>Contents</th>
            </tr>
            ${trs}
          </table>
        `);
        Modal.setFooter(await Modal.button('Generate', 'primary'));
        Helper.f("#check_all_documents", cad => Helper.on(cad, "change", () => Helper.fm(".doc_cbs", cbs => cbs.checked = cad.checked)));
        Modal.open();
        Modal.submit(async (e, form_data) => {
          const body = {
            ...date_data,
            files: JSON.stringify(Helper.ObjectToArray(Helper.getDataFromFormData(form_data)).map(v => v.name)),
          }

          Modal.close();
          const resp = (await Helper.api('report/file-requests', 'json', Helper.createFormData(body)));

          setTimeout(async () => {
            Modal.setTitle('Generating file')
            Modal.setBody(
              `<div class="alert alert-light">Generating. Please wait.</div>`
              + createTable("docs_table", ["File", "Total"], Helper.ObjectToArray(resp).map(v => [v.value.file, v.value.total]), true)
            );
            Modal.open()
            SheetJS.clear();
            await SheetJS.save("#docs_table", "docs");
            Modal.close();
          }, 500);

        });
      }, 500);
    });

  });
  Modal.open();
});






function createTable(id, headers = [], body = [[]], hidden = false) {
  let thead = '';
  headers.forEach(v => thead += `<th>${v}</th>`);

  let tbody = '';
  body.forEach(raw => {
    let data = '';
    raw.forEach(v => data += `<td>${v}</td>`);
    tbody += `<tr>${data}</tr>`
  });
  return `<table id="${id}" class="table table-striped table-sm border ${hidden ? 'd-none' : ''}"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
}