import { Helper } from "./helper.js";

export class Modal {

  static async open(callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_open").click();
  }

  static async close(callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_close").click();
  }

  static async setTitle(title = '', callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_title").innerHTML = title;
  }

  static async setBody(body = '', callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_body").innerHTML = body;
  }

  static async setFooter(footer = '', callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_footer").innerHTML = footer;
  }

  static async setSize(size = "lg", callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_dialog").classList.remove("modal-sm");
    Helper.f("#dds_modal_dialog").classList.remove("modal-lg");
    Helper.f("#dds_modal_dialog").classList.remove("modal-xl");
    switch (size) {
      case "sm":Helper.f("#dds_modal_dialog").classList.add("modal-sm"); break;
      case "lg":Helper.f("#dds_modal_dialog").classList.add("modal-lg"); break;
      case "xl":Helper.f("#dds_modal_dialog").classList.add("modal-xl"); break;
      default: break;
    }
  }

  static async submit(callback = undefined) {
    Helper.onSubmit("#dds_modal_form", async (e) => {
      e.preventDefault();
      await callback(e, new FormData(Helper.f("#dds_modal_form")));
    });
  }

  static async button(value, type, callback = undefined) {
    if (callback) await callback();
    return `<button class="btn btn-${type}" type="submit">${value}</button>`;
  }

  static async hideHeader(callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_header").classList.add('d-none');
  }

  static async hideFooter(callback = undefined) {
    if (callback) await callback();
    Helper.f("#dds_modal_footer").classList.add('d-none');
  }

  static async hideCloseButton() {
    Helper.f("#dds_modal_close").classList.add('d-none');
  }

}