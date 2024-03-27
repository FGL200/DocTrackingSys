import { CustomNotification } from "../shared/custom-notification.js";
import { Helper } from "../shared/helper.js";

Helper.onSubmit("#form_login", async (e) => {
  e.preventDefault();
  const form_data = new FormData(Helper.f("#form_login"));

  // Account Deactivation
  const username = Helper.getDataFromFormData(form_data).username;
  const prevUsername = sessionStorage?.username ?? "";
  const blocked = JSON.parse(sessionStorage?.blocked ?? "[]");

  if (prevUsername != username) sessionStorage.removeItem('failedCount');
  let failedCount = Number(sessionStorage?.failedCount ?? 0);

  if (failedCount >= 3 || blocked.includes(username)) {
    CustomNotification.clear();
    CustomNotification.add("Error", "Account is decativated. Try again Later", "danger");
    if (!blocked.includes(username)) blocked.push(username);
    sessionStorage.setItem("blocked", JSON.stringify(blocked));
    return;
  }
  // 

  const resp = (await Helper.api('/user/login', "json", form_data))
  if (resp.result) {
    sessionStorage.clear();
    location.href = base_url + 'dashboard';
  } else {
    sessionStorage.setItem('failedCount', prevUsername == username ? String(++failedCount) : '1');
    sessionStorage.setItem('username', username);
    CustomNotification.add("Error", "Invalid Username or Password.", "danger");
  }
});