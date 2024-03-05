import { Helper } from "./helper.js";
import { Modal } from "./modal.js";

export class TermsAndCondition {
  static __agree__ = "";
  static __showed__ = false;

  static async show() {
    if (TermsAndCondition.__agree__) return;
    if (TermsAndCondition.__showed__) return;
    TermsAndCondition.__showed__ = true;

    Modal.setSize('lg');
    Modal.hideCloseButton();
    Modal.setTitle('Terms and Condittion');
    Modal.setBody(await Helper.template('terms_and_condition'));
    Modal.setFooter(await Modal.button('I agree', 'primary'));
    Modal.submit(async (e, form_data) => {
      const resp = (await Helper.api('agree/set', "json", new FormData()));
      TermsAndCondition.__agree__ = resp?.agree == '1';
      TermsAndCondition.__showed__ = false;
      Modal.close();
    });
    Modal.open();
  }

  static async init() {
    const resp = (await Helper.api('agree/get', "json", new FormData()));
    TermsAndCondition.__agree__ = resp?.agree == '1';
    TermsAndCondition.show();

  }
}