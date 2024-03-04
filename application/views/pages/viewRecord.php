<main class="d-flex justify-content-center align-items-center">
  <form id="record_form" class="container-fluid m-3">
    <card class="card card-body bg-light p-2">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 my-auto text-start">
          <button class="btn btn-danger mb-3" id="btn_back">Back</button>
        </div>
        <div class="col-lg-3 col-md-10 col-sm-10 my-auto">
          <div class="border rounded fw-bold p-2 mb-3">Record ID# <span id="stud_rec_id"></span>
          </div>
        </div>
        <div class="col-lg-7 col-md-12 col-sm-12 my-auto text-center">
          <button id="btn_merge" class="btn btn-primary mb-3 remove-when-V remove-when-A"><i class="fa-solid fa-object-ungroup"></i> Merge</button>
          <button id="btn_move" class="btn btn-primary mb-3 remove-when-V remove-when-A"><i class="fa-solid fa-arrows-left-right"></i> Move SHelf</button>
          <button id="btn_archive" class="btn btn-secondary border border-primary mb-3 remove-when-V remove-when-A">
            <i class="fa-solid fa-box-archive"></i> Archive
          </button>
          <button id="btn_save" class="btn btn-success mb-3 remove-when-V remove-when-A"><i class="fa-solid fa-floppy-disk"></i> Save</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card card-body shadow-sm p-3 mb-3">
            <div class="h5">Information</div>
            <div class="row">
              <div class="col-12">
                <div class="form-group mb-3">
                  <label>Student Number <small class="text-danger">*</small></label>
                  <input type="text" name="stud_id" class="form-control disabled-when-A disabled-when-V">
                </div>
              </div>
              <div class="col-12">
                <div class="form-group mb-3">
                  <label>Last Name <small class="text-danger">*</small></label>
                  <input type="text" name="stud_lname" class="form-control disabled-when-A disabled-when-V">
                </div>
              </div>
              <div class="col-12">
                <div class="form-group mb-3">
                  <label>First Name</label>
                  <input type="text" name="stud_fname" class="form-control disabled-when-A disabled-when-V">
                </div>
              </div>
              <div class="col-12">
                <div class="form-group mb-3">
                  <label>Middle Name</label>
                  <input type="text" name="stud_mname" class="form-control disabled-when-A disabled-when-V">
                </div>
              </div>
              <div class="col-12">
                <div class="form-group mb-3">
                  <label>Suffix</label>
                  <input type="text" name="stud_sfx" class="form-control disabled-when-A disabled-when-V">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-12">
              <div class="card card-body shadow-sm p-3 mb-3">
                <div class="row">
                  <div class="col-4 my-auto">
                    <div class="h5 mb-3">Remarks</div>
                  </div>
                  <div class="col-8 my-auto">
                    <select class="form-select mb-3 remove-when-V remove-when-A" name="" id=""></select>
                  </div>
                  <div class="col-12">
                    <div class="card card-body p-2 bg-secondary d-flex align-items-center gap-2 flex-wrap" id="remarks-holder">
                      <!-- Remarks Here -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card card-body shadow-sm p-3 mb-3">
                <div class="h5 mb-3">Documents</div>
                <div class="container">
                  <div class="row" id="documents-holder">
                    <!-- Documents Here -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </form>
</main>