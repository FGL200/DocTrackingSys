<main id="main" class="main">
  <div class="pagetitle">
    <h1>New Record</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">New Record</li>
      </ol>
    </nav>
  </div>

  <section class="section">



    <div class="row">

      <div class="col-lg-4 col-md-4 col-sm-12">

        <!-- Action Card -->
        <div class="row">
          <div class="col-12">
            <div class="card card-body">
              <div class="card-title">Save Document</div>
              <div class="d-flex flex-column gap-2">
                <button id="btn_save" class="btn btn-success w-100"><i class="bi bi-floppy"></i> Save</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /Action Card -->

        <!-- Student Information -->
        <div class="row">
          <div class="col-12">

            <form id="information_form" class="card card-body">
              <div class="card-title">Student Information</div>
              <div class="row">

                <div class="col-12">
                  <div class="form-group mb-3 has-validation">
                    <label>Student number <small class="text-danger">*</small></label>
                    <input type="text" name="stud_id" class="form-control" required>
                    <div class="invalid-feedback">* Please enter Student number.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Last name <small class="text-danger">*</small></label>
                    <input type="text" name="stud_lname" class="form-control" required>
                    <div class="invalid-feedback">* Please enter Last name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>First name <small class="text-danger">*</small></label>
                    <input type="text" name="stud_fname" class="form-control" required>
                    <div class="invalid-feedback">* Please enter First name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Middle name <small class="text-danger">*</small></label>
                    <input type="text" name="stud_mname" class="form-control" required>
                    <div class="invalid-feedback">* Please enter Middle name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Suffix <small class="text-danger">*</small></label>
                    <input type="text" name="stud_sfx" class="form-control" required>
                    <div class="invalid-feedback">* Please enter Suffix.</div>
                  </div>
                </div>

              </div>
            </form>

          </div>
        </div>
        <!-- /Student Information -->

      </div>

      <div class="col-lg-8 col-md-8 col-sm-12">

        <!-- Remarks -->
        <div class="row">
          <div class="col-12">
            <div class="card card-body">
              <div class="card-title">Remarks List</div>
              <form id="remark_form" class="row">
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label>Remarks <small class="text-danger">*</small></label>
                    <div class="input-group mb-3">
                      <input name="remark" type="text" class="form-control" aria-describedby="remark_value">
                      <button class="btn btn-outline-primary" type="submit" id="remark_value" name="remark_value">
                        <i class="bi bi-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div id="remarks_holder" class="alert alert-secondary d-flex flex-wrap gap-2 m-0">No Remarks</div>
                </div>
                <div class="col-12">
                  <small class="error-msg text-danger"></small>
                </div>
              </form>
            </div>

          </div>
        </div>
        <!-- /Remarks -->

        <!-- Documents -->
        <div class="row">
          <div class="col-12">
            <form id="document_form" class="card card-body">
              <div class="card-title">Documents</div>
              <div class="row">

                <div class="col-12" id="regi_form">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="regi_form_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="regi_form_cb" type="checkbox" name="">
                        <label for="regi_form_cb" class="user-select-none">Registration Form </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="regi_form_file" class="btn btn-success disabled add_image"><i class="bi bi-plus"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="j_f137">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="j_f137_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="j_f137_cb" type="checkbox" name="">
                        <label for="j_f137_cb" class="user-select-none">Junior Form 137 </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="j_f137_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="s_f137">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="s_f137_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="s_f137_cb" type="checkbox" name="">
                        <label for="s_f137_cb" class="user-select-none">Senior Form 137 </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="s_f137_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="f138">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="f138_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="f138_cb" type="checkbox" name="">
                        <label for="f138_cb" class="user-select-none">Form 138</label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="f138_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="birth_cert">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="birth_cert_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="birth_cert_cb" type="checkbox" name="">
                        <label for="birth_cert_cb" class="user-select-none">Birth Certificate </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="birth_cert_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="good_moral">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="good_moral_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="good_moral_cb" type="checkbox" name="">
                        <label for="good_moral_cb" class="user-select-none">Good Moral </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="good_moral_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <button class="btn btn-primary w-100 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#other_documents" aria-expanded="false" aria-controls="other_documents">
                        Show Other Documents <i class="bi bi-caret-down-fill"></i>
                      </button>
                    </div>
                  </div>
                  <div class="collapse" id="other_documents">
                    <div class="row">

                      <div class="col-12" id="app_grad">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="app_grad_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="app_grad_cb" type="checkbox" name="">
                              <label for="app_grad_cb" class="user-select-none">Application for Graduation </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="app_grad_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="tor">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="tor_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="tor_cb" type="checkbox" name="">
                              <label for="tor_cb" class="user-select-none">Transcript of Records</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="tor_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="cert_of_complete">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="cert_of_complete_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="cert_of_complete_cb" type="checkbox" name="">
                              <label for="cert_of_complete_cb" class="user-select-none">Certificate Of Completion</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="cert_of_complete_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="hd_or_cert_of_trans">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="hd_or_cert_of_trans_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="hd_or_cert_of_trans_cb" type="checkbox" name="">
                              <label for="hd_or_cert_of_trans_cb" class="user-select-none">Honorable Dismisal / Certificate of Transferee </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="hd_or_cert_of_trans_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="req_clearance_form">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="req_clearance_form_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="req_clearance_form_cb" type="checkbox" name="">
                              <label for="req_clearance_form_cb" class="user-select-none">Request for Clearance</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="req_clearance_form_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="req_credentials">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="req_credentials_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="req_credentials_cb" type="checkbox" name="">
                              <label for="req_credentials_cb" class="user-select-none">Request for Credentials Form </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="req_credentials_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- /Documents -->

      </div>

    </div>

  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/record/record-new.js"></script>