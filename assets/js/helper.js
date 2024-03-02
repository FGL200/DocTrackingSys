
class Helper {

  // ****************************
  // *          SIMPLE          *
  // ****************************

  static dateDiff(dateString_1, dateString_2) {
    const d1 = new Date(dateString_1);
    const d2 = new Date(dateString_2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() - d2.getTime();
  }

  static isFutureDate(dateString) {
    const today = new Date();
    const givenDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    return givenDate.getTime() > today.getTime();
  }

  static toDetailedDate(string_date = '') {
    return new Date(string_date).toDateString();
  }

  static toInputDate(string_date = '') {
    const date = new Date(string_date);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
  }

  static AsID(id, padding_count = 0, padding_char = '', start = '', end = '') {
    return `${start}${String(id).padStart(padding_count, padding_char)}${end}`
  }

  static ObjectToArray(obj) {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  }

  static DataTable_Reset(tableElemenet = '') {
    if ($.fn.DataTable.isDataTable(tableElemenet)) $(tableElemenet).DataTable().destroy();
    $(tableElemenet).html("");
  }

  static DataTable_Init(tableElemenet = '', body = '', bindCallBackBeforeInitOfDataTable = () => { }, bindCallBackAfterInitOfDataTable = () => { }) {
    $(tableElemenet).append(body);
    bindCallBackBeforeInitOfDataTable();
    $(tableElemenet).DataTable({ bAutoWidth: false, autoWidth: false });
    bindCallBackAfterInitOfDataTable();
  }

  static getAge(dateString) {
    if (!dateString) return 0;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static Promt_Error(msg) {
    Helper.fm('.error-msg', e => e.innerHTML = `<b>Error: </b>${msg}`);
  }

  static Promt_Clear() {
    Helper.fm('.error-msg', e => e.innerHTML = '');
  }


  // *****************************
  // *          COMPLEX          *
  // *****************************


  static async template(directory) {
    return await fetch(`${base_url}/assets/templates/${directory}.html`).then(async r => r.text());
  }

  static async api(url = '', type = "text", form = new FormData()) {
    const args = (form) ? { method: 'post', body: form } : null;
    return await fetch(base_url + url, args).then(async response => {
      if (type === "text") return await response.text();
      if (type === "json") return await response.json()
      return await response;
    });
  }

  static getDataBind(elementNode, data_name) {
    return String(elementNode.getAttribute(`data-binder-${data_name}`))
  }

  static replaceLayout(html_layout = '', replaces = {}) {
    for (const key in replaces) html_layout = html_layout.replaceAll(`{{${key}}}`, replaces[key]);
    return html_layout;
  }

  static onChange(element, callback) {
    if (Helper.f(element)) Helper.f(element).addEventListener("change", callback);
    else { console.warn(`${element} not found.`); }
  }

  static onSubmit(element, callback) {
    if (Helper.f(element)) Helper.f(element).addEventListener("submit", callback);
    else { console.warn(`${element} not found.`); }
  }

  static onClick(element, callback, mulitple = false) {
    if (Helper.f(element)) {
      if (mulitple) Helper.fm(element, e => e.addEventListener("click", callback));
      else Helper.f(element).addEventListener("click", callback);
    }
    else { console.warn(`${element} not found.`); }
  }

  static clearClick(element, callback, mulitple = false) {
    if (Helper.f(element)) {
      if (mulitple) Helper.fm(element, e => e.removeEventListener("click", callback));
      else Helper.f(element).removeEventListener("click", callback);
    }
    else { console.warn(`${element} not found.`); }
  }

  static isValidForm(form = new FormData(), required = ['']) {
    let invalids = [];
    form.forEach((val, key) => {
      if (Helper.f(`.form-control[name="${key}"]`))
        Helper.fm(`.form-control[name="${key}"]`, e => e.style.border = "1px solid #CED4DA");
      if (required.includes(key) && !val) invalids.push(key);
    });
    invalids.map(v => Helper.f(`.form-control[name="${v}"]`)).forEach(v => {
      if (v) v.style.border = "1px solid #DC3545";
    });
    return invalids.length === 0;
  }

  static formValidator(form = new FormData(), fields = [''], condition = () => false) {
    let invalids = [];
    form.forEach((val, key) => {
      if (Helper.f(`.form-control[name="${key}"]`))
        Helper.fm(`.form-control[name="${key}"]`, e => e.style.border = "1px solid #CED4DA");
      if (fields.includes(key)) {
        if (condition(val, key)) invalids.push(key);
      }
    });
    invalids.map(v => Helper.f(`.form-control[name="${v}"]`)).forEach(v => {
      if (v) v.style.border = "1px solid #DC3545";
    });
    return invalids
  }

  static createFormData(object = {}, passedData = new FormData()) {
    for (const key in object) passedData.append(key, object[key]);
    return passedData;
  }

  static getDataFromFormData(formData) {
    const data = {};
    formData.forEach((val, key) => data[key] = val);
    return data;
  }

  static f(element) {
    if (document.querySelector(element)) return document.querySelector(element);
    else return undefined;
  }

  static fm(element, callback) {
    const elems = [];
    if (document.querySelector(element)) {
      document.querySelectorAll(element).forEach(v => elems.push(v));
      return elems.map(callback);
    }
    else return undefined;
  }

  static on(elementNode, event, callback, option = undefined) {
    elementNode.addEventListener(event, callback, option);
  }

  static clearEvent(elementNode, event, callback, option = undefined) {
    elementNode.removeEventListener(event, callback, option);
  }

}

class RequestInterface {
  id = '';
  lname = '';
  fname = '';
  mname = '';
  file = '';
  reason = '';
  created_at = '';
  created_by = '';
  updated_at = '';
  updated_by = '';
  deleted_flag = '';
  constructor(data = {}) {
    this.id = data.id ?? '';
    this.lname = data.lname ?? '';
    this.fname = data.fname ?? '';
    this.mname = data.mname ?? '';
    this.file = data.file ?? '';
    this.reason = data.reason ?? '';
    this.created_at = data.created_at ?? '';
    this.created_by = data.created_by ?? '';
    this.updated_at = data.updated_at ?? '';
    this.updated_by = data.updated_by ?? '';
    this.deleted_flag = data.deleted_flag ?? '';
  }
}