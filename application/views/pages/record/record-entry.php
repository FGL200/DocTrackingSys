<main id="main" class="main">
  <div class="pagetitle">
    <h1>Record #<?= $record_name ?></h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/all">All Shelves</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/entry/" id="shelf_name">Shelf </a></li>
        <li class="breadcrumb-item active">Record #<?= $record_name ?></li>
      </ol>
    </nav>
  </div>

  <section class="section">

    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="card card-body">
          <div class="card-title">Actions</div>
          <div class="d-flex flex-column gap-2">
            <button id="btn_merge" class="btn btn-primary w-100"><i class="bi bi-intersect"></i> Merge</button>
            <button id="btn_move" class="btn btn-primary w-100"><i class="bi bi-arrows-move"></i> Move</button>
            <button id="btn_archive" class="btn btn-danger w-100"><i class="bi bi-dash-circle"></i> Archive</button>

            <!-- Togle between save and edit -->
            <button id="btn_save" class="btn btn-success d-none w-100"><i class="bi bi-floppy"></i> Save</button>
            <button id="btn_edit" class="btn btn-warning w-100"><i class="bi bi-pencil-square"></i> Edit</button>
          </div>
        </div>
      </div>

      <div class="col-lg-8 col-md-8 col-sm-12">
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

    <form id="record_form" class="row needs-validation" novalidate>
      <!-- <button>Save</button> -->

      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="card card-body">
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
        </div>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12">
        <div class="card card-body">
          <div class="card-title">Documents</div>
          <div class="row">

            <div class="col-12 document_item" id="regi">
              <div class="alert alert-secondary p-2">
                <div class="d-flex justify-content-between">
                  <input id="regi_file" type="file" class="d-none" accept="image/png, image/jpeg" multiple>

                  <section class="d-flex gap-2 align-items-center">
                    <input id="regi_cb" type="checkbox" name="">
                    <label for="regi_cb" class="document_name">Registration Form </label>
                  </section>

                  <section class="d-flex gap-2 align-items-center">
                    <label for="regi_file" class="btn btn-success disabled add_image"><i class="bi bi-plus sym"></i> <i class="bi bi-card-image"></i></label>
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

                  <!-- <div class="col-12 document_item">
                    <div class="alert alert-secondary p-2">
                      <input type="file" class="d-none">
                      <span class="document_name">Name </span>
                      <input type="checkbox" name="">
                      <button class="btn btn-success" type="button"><i class="bi bi-plus"></i> <i class="bi bi-card-image"></i></button>
                      <button class="btn btn-primary" type="button"><i class="bi bi-eye-fill"></i></button>
                    </div>
                  </div> -->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</main>

<script>
  const const_record_name = '<?= $record_name ?>';
</script>

<script type="module" src="<?= base_url() ?>assets/js/record/record-entry.js"></script>