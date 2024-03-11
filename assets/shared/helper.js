import { CustomNotification } from "./custom-notification.js";

export class Helper {

  // ****************************
  // *          SIMPLE          *
  // ****************************

  static removeElement(elementNode) {
    elementNode.remove();
  }

  static removeWhiteSpaces(str) {
    return str.replace(/\s+/g, "");
  }

  static preventDefault(event_refernce) {
    event_refernce.preventDefault();
  }

  static getURL() {
    return location.href;
  }

  static setupFor(role) {
    const roles = ['V', 'E', 'A'];
    roles.forEach(r => {
      if (role != r) return;
      Helper.fm(`.remove-when-${r}`, e => e.remove());
      Helper.fm(`.disabled-when-${r}`, e => e.disabled = true);
      Helper.fm(`.readonly-when-${r}`, e => e.readonly = true);
    });
  }

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

  static DataTable_Reset(tableID = '') {
    if ($.fn.DataTable.isDataTable(tableID)) $(tableID).DataTable().destroy();
    $(tableID).html("");
  }

  static DataTable_Init(tableID = '', body = '', bindCallBackBeforeInitOfDataTable = () => { }, bindCallBackAfterInitOfDataTable = () => { }) {
    $(tableID).append(body);
    bindCallBackBeforeInitOfDataTable();
    $(tableID).DataTable({ bAutoWidth: false, autoWidth: false });
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

  static Loading_Start() {
    Helper.f("body").classList.add("loading")
  }

  static Loading_End() {
    Helper.f("body").classList.remove("loading")
  }


  // *****************************
  // *          COMPLEX          *
  // *****************************

  static async importCSS(directory, callBack) {
    const css = document.createElement("link");
    css.setAttribute("href", `${base_url}assets/css/${directory}.css`);
    css.setAttribute("rel", "stylesheet");
    Helper.f("head").appendChild(css);
  }

  static async template(directory) {
    return await fetch(`${base_url}assets/templates/${directory}.html`).then(async r => r.text())
      .catch((err) => CustomNotification.add(`Server Error(ref: ${String(err).length})`, "Error Occured. Try again later.", "danger"));
  }

  static async api(url = '', type = "text", form = undefined) {
    const args = (form) ? { method: 'post', body: form, } : { method: 'get' };
    return await fetch(base_url + 'api/' + url, args ?? undefined).then(async response => {
      if ((type).toLocaleLowerCase() === "text") return await response.text();
      if ((type).toLocaleLowerCase() === "json") return await response.json()
      return await response;
    })
      .catch((err) => CustomNotification.add(`Server Error(ref: ${String(err).length})`, "Error Occured. Try again later.", "danger"));
  }

  static getDataBind(elementNode, data_name) {
    return String(elementNode.getAttribute(`data-binder-${data_name}`))
  }

  static replaceLayout(html_layout = '', replaces = {}) {
    for (const key in replaces) html_layout = html_layout.replaceAll(`{{${key}}}`, replaces[key] ?? '');
    return html_layout;
  }

  static onChange(element, callback, mulitple = false) {
    if (Helper.f(element)) {
      if (mulitple) Helper.fm(element, e => { if (!e.onchange) e.onchange = callback });
      else {
        if (!Helper.f(element).onchange) Helper.f(element).onchange = callback;
      }
    }
    else { console.warn(`${element} not found or did not have minimum requirements.`); }
  }

  static onClick(element, callback, mulitple = false) {
    if (Helper.f(element)) {
      if (mulitple) Helper.fm(element, e => { if (!e.onclick) e.onclick = callback });
      else {
        if (!Helper.f(element).onclick) Helper.f(element).onclick = callback;
      }
    }
    else { console.warn(`${element} not found or did not have minimum requirements.`); }
  }

  static onSubmit(element, callback) {
    if (Helper.f(element) && !Helper.f(element).onsubmit) Helper.f(element).onsubmit = callback;
    else console.warn(`${element} not found or did not have minimum requirements.`);
  }

  static clearClick(element, callback, mulitple = false) {
    if (Helper.f(element)) {
      if (mulitple) Helper.fm(element, e => { e['onclick'] = null; e.removeEventListener("click", callback) });
      else {
        Helper.f(element).onclick = null;
        Helper.f(element).removeEventListener("click", callback);
      }
    }
    else { console.warn(`${element} not found or did not have minimum requirements.`); }
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
      if (Helper.f(`.form-control[name="${key}"]`)) Helper.fm(`.form-control[name="${key}"]`, e => e.style.border = "1px solid #CED4DA");
      if (Helper.f(`.form-select[name="${key}"]`)) Helper.fm(`.form-select[name="${key}"]`, e => e.style.border = "1px solid #CED4DA");

      if (fields.includes(key) && condition(val, key)) invalids.push(key);
    });

    invalids.forEach(v => {
      if (Helper.f(`.form-control[name="${v}"]`)) Helper.f(`.form-control[name="${v}"]`).style.border = "1px solid #DC3545";
      if (Helper.f(`.form-select[name="${v}"]`)) Helper.f(`.form-select[name="${v}"]`).style.border = "1px solid #DC3545";
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

  static f(element, callBack) {
    if (document.querySelector(element)) {
      if (callBack) callBack(document.querySelector(element));
      return document.querySelector(element);
    }
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

  static find(elementNode, targetElement, callback) {
    const elems = [];
    if (elementNode.querySelector(targetElement)) {
      elementNode.querySelectorAll(targetElement).forEach(v => elems.push(v));
      return callback ? elems.map(callback) : elems.map(v => v);
    }
    else return undefined
  }

  static on(elementNode, event, callback) {
    elementNode[`on${event}`] = callback;
  }

  static clearEvent(elementNode, event, callback, option = undefined) {
    elementNode[`on${event}`] = null;
    elementNode.removeEventListener(event, callback, option);
  }

  static formBindValues(formID, values = {}) {
    const form = Helper.f(formID);
    Helper.ObjectToArray(values).forEach(v => {
      Helper.find(form, `*[name=${v.name}]`, tag => tag.value = v.value);
    });
  }

}