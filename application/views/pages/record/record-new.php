<main id="main" class="main">
  <div class="pagetitle">
    <h1>New Record</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/all">All Shelves</a></li>
        <li class="breadcrumb-item"><a id="shelf_name" href="#">Shelf Name</a></li>
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
              <div class="card-title">Action</div>
              <div class="d-flex flex-column gap-2">
                <button id="btn_change_shelf" class="btn btn-primary w-100 mb-3"><i class="bi bi-dropbox"></i> Change Shelf</button>
                <button id="btn_save" class="btn btn-success w-100 mb-3"><i class="bi bi-floppy"></i> Save Record</button>
                <small class="error-msg text-danger"></small>
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
                    <label>Student number</label>
                    <input type="text" name="stud_id" class="form-control">
                    <div class="invalid-feedback">* Please enter Student number.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Last name <small class="text-danger">*</small></label>
                    <input type="text" name="stud_lname" class="form-control">
                    <div class="invalid-feedback">* Please enter Last name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>First name</label>
                    <input type="text" name="stud_fname" class="form-control">
                    <div class="invalid-feedback">* Please enter First name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Middle name</label>
                    <input type="text" name="stud_mname" class="form-control">
                    <div class="invalid-feedback">* Please enter Middle name.</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group has-validation mb-3">
                    <label>Suffix</label>
                    <input type="text" name="stud_sfx" class="form-control">
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
                      <input name="remark" type="text" list="remarks_category" class="form-control" aria-describedby="remark_value">
                      <datalist id="remarks_category"></datalist>
                      <button class="btn btn-outline-primary" type="submit" id="remark_value" name="remark_value">
                        <i class="bi bi-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div id="remarks_holder" class="alert alert-secondary d-flex flex-wrap gap-2 m-0">No Remarks</div>
                </div>
                <!-- <div class="col-12">
                  <small class="error-msg text-danger"></small>
                </div> -->
              </form>
            </div>

          </div>
        </div>
        <!-- /Remarks -->

        <!-- Documents -->
        <div class="row">
          <div class="col-12">
            <form id="document_form" class="card card-body" enctype="multipart/form-data">
              <div class="card-title">Documents</div>
              <div class="row">

                <div class="col-12" id="regi_form">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="regi_form-file" name="regi_form-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="regi_form-cb" name="regi_form-cb" type="checkbox">
                        <label for="regi_form-cb" class="user-select-none">Registration Form </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="regi_form-file" class="btn btn-success disabled add_image"><i class="bi bi-plus"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="j_f137">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="j_f137-file" name="j_f137-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="j_f137-cb" name="j_f137-cb" type="checkbox">
                        <label for="j_f137-cb" class="user-select-none">Junior Form 137 </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="j_f137-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="s_f137">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="s_f137-file" name="s_f137-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="s_f137-cb" name="s_f137-cb" type="checkbox">
                        <label for="s_f137-cb" class="user-select-none">Senior Form 137 </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="s_f137-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="f138">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="f138-file" name="f138-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="f138-cb" name="f138-cb" type="checkbox">
                        <label for="f138-cb" class="user-select-none">Form 138</label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="f138-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="birth_cert">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="birth_cert-file" name="birth_cert-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="birth_cert-cb" name="birth_cert-cb" type="checkbox">
                        <label for="birth_cert-cb" class="user-select-none">Birth Certificate </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="birth_cert-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                      </section>
                    </div>
                  </div>
                </div>

                <div class="col-12" id="good_moral">
                  <div class="alert alert-secondary p-2">
                    <div class="d-flex justify-content-between">
                      <input id="good_moral-file" name="good_moral-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                      <section class="d-flex gap-2 align-items-center">
                        <input id="good_moral-cb" name="good_moral-cb" type="checkbox">
                        <label for="good_moral-cb" class="user-select-none">Good Moral </label>
                      </section>
                      <section class="d-flex gap-2 align-items-center">
                        <label for="good_moral-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                        <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                        <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
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
                            <input id="app_grad-file" name="app_grad-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="app_grad-cb" name="app_grad-cb" type="checkbox">
                              <label for="app_grad-cb" class="user-select-none">Application for Graduation </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="app_grad-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="tor">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="tor-file" name="tor-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="tor-cb" name="tor-cb" type="checkbox">
                              <label for="tor-cb" class="user-select-none">Transcript of Records</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="tor-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="cert_of_complete">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="cert_of_complete-file" name="cert_of_complete-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="cert_of_complete-cb" name="cert_of_complete-cb" type="checkbox">
                              <label for="cert_of_complete-cb" class="user-select-none">Certificate Of Completion</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="cert_of_complete-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="hd_or_cert_of_trans">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="hd_or_cert_of_trans-file" name="hd_or_cert_of_trans-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="hd_or_cert_of_trans-cb" name="hd_or_cert_of_trans-cb" type="checkbox">
                              <label for="hd_or_cert_of_trans-cb" class="user-select-none">Honorable Dismisal / Certificate of Transferee </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="hd_or_cert_of_trans-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="req_clearance_form">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="req_clearance_form-file" name="req_clearance_form-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="req_clearance_form-cb" name="req_clearance_form-cb" type="checkbox">
                              <label for="req_clearance_form-cb" class="user-select-none">Request for Clearance</label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="req_clearance_form-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div class="col-12" id="req_credentials">
                        <div class="alert alert-secondary p-2">
                          <div class="d-flex justify-content-between">
                            <input id="req_credentials-file" name="req_credentials-file[]" type="file" class="d-none" accept="image/png, image/jpeg" multiple>
                            <section class="d-flex gap-2 align-items-center">
                              <input id="req_credentials-cb" name="req_credentials-cb" type="checkbox">
                              <label for="req_credentials-cb" class="user-select-none">Request for Credentials Form </label>
                            </section>
                            <section class="d-flex gap-2 align-items-center">
                              <label for="req_credentials-file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
                              <button class="btn btn-danger d-none remove_image" type="button"><i class="bi bi-dash"></i> <i class="bi bi-card-image"></i></button>
                              <button class="btn btn-primary disabled view_image" tabindex="-1" type="button"><i class="bi bi-eye-fill"></i></button>
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