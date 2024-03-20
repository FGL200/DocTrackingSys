import { Helper } from "./helper.js";

export class Modal {

  static async open(callback = undefined) {
    Modal.closed = false;
    Helper.f("#dds_modal_open").click();

    Helper.clearEvent(Helper.f("#dds_modal_close"), "click");
    Helper.onClick("#dds_modal_close", () => { Modal.close() });
    if (callback) await callback();
  }

  static onClose(callBack) {
    const close_btn = Helper.f("#dds_modal_close");
    console.log({ close_btn })

    const modal = Helper.f(Modal.id);
    modal.addEventListener('hide.bs.modal', callBack);
  }

  static async close(callback = undefined) {
    Modal.closed = true;
    Modal.setTitle('');
    Modal.setBody('');
    Modal.setFooter('');
    Helper.f("#dds_modal_header").classList.remove('d-none');
    Helper.f("#dds_modal_footer").classList.remove('d-none');
    Modal.clearSubmit();
    Helper.f("#dds_modal_close").click();
    if (callback) await callback();
  }

  static async setTitle(title = '', callback = undefined) {
    Helper.f("#dds_modal_title").innerHTML = title;
    if (callback) await callback();
  }

  static async setBody(body = '', callback = undefined) {
    Helper.f("#dds_modal_body").innerHTML = body;
    if (callback) await callback();
  }

  static async setFooter(footer = '', callback = undefined) {
    Helper.f("#dds_modal_footer").innerHTML = footer;
    if (callback) await callback();
  }

  static async setSize(size = "lg", callback = undefined) {
    Helper.f("#dds_modal_dialog").classList.remove("modal-sm");
    Helper.f("#dds_modal_dialog").classList.remove("modal-lg");
    Helper.f("#dds_modal_dialog").classList.remove("modal-xl");
    switch (size) {
      case "sm": Helper.f("#dds_modal_dialog").classList.add("modal-sm"); break;
      case "lg": Helper.f("#dds_modal_dialog").classList.add("modal-lg"); break;
      case "xl": Helper.f("#dds_modal_dialog").classList.add("modal-xl"); break;
      default: break;
    }
    if (callback) await callback();
  }

  static async submit(callback = undefined) {
    Helper.onSubmit("#dds_modal_form", async (e) => {
      e.preventDefault();
      await callback(e, new FormData(Helper.f("#dds_modal_form")));
    });
  }

  static async button(value, type, callback = undefined) {

    const button = document.createElement('button');
    button.setAttribute('class', `btn btn-${type}`)
    button.setAttribute('type', 'submit');
    button.innerHTML = value;

    const holder = document.createElement('div');
    holder.appendChild(button);
    if (callback) await callback(button);
    return holder.innerHTML;
  }

  static async hideHeader(callback = undefined) {
    Helper.f("#dds_modal_header").classList.add('d-none');
    if (callback) await callback();
  }

  static async hideFooter(callback = undefined) {
    Helper.f("#dds_modal_footer").classList.add('d-none');
    if (callback) await callback();
  }

  static async unhideFooter(callback = undefined) {
    Helper.f("#dds_modal_footer").classList.remove('d-none');
    if (callback) await callback();
  }


  static async hideCloseButton(callback = undefined) {
    Helper.f("#dds_modal_close").classList.add('d-none');
    if (callback) await callback();
  }

  static async unhideCloseButton(callback = undefined) {
    Helper.f("#dds_modal_close").classList.remove('d-none');
    if (callback) await callback();
  }


  static get form() {
    return new FormData(Helper.f("#dds_modal_form"));
  }

  static get id() {
    return '#dds_modal_form';
  }

  static clearSubmit() {
    Helper.clearEvent(Helper.f(Modal.id), "submit");
  }


  static closed = true;

}