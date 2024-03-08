<main id="main" class="main">
  <div class="pagetitle">
    <h1>New User</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">New User</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-8 col-sm-8">
        <div class="card card-body">
          <div class="card-title">User Information</div>
          <form id="user_form" class="row">

            <div class="col-sm-6">
              <div class="form-group mb-3">
                <label>Username <small class="text-danger">*</small></label>
                <input type="text" name="user-uname" class="form-control">
              </div>
            </div>

            <div class="col-sm-6">
              <div class="form-group mb-3">
                <label>Role <small class="text-danger">*</small></label>
                <select name="user-role" class="form-select">
                  <option value="">Select Gender</option>
                  <option value="V">Checker</option>
                  <option value="E">Encoder</option>
                  <option value="A">Admin</option>
                </select>
              </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12">
              <div class="form-group mb-3">
                <label>First name <small class="text-danger">*</small></label>
                <input type="text" name="fname" class="form-control">
              </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12">
              <div class="form-group mb-3">
                <label>Middle name <small class="text-danger">*</small></label>
                <input type="text" name="mname" class="form-control">
              </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12">
              <div class="form-group mb-3">
                <label>Last name <small class="text-danger">*</small></label>
                <input type="text" name="lname" class="form-control">
              </div>
            </div>

            <div class="col-sm-6">
              <div class="form-group mb-3">
                <label>Birthday <small class="text-danger">*</small></label>
                <input type="date" name="bday" class="form-control">
              </div>
            </div>

            <div class="col-sm-6">
              <div class="form-group mb-3">
                <label>Gender <small class="text-danger">*</small></label>
                <select name="gender" class="form-select">
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="N">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group mb-3">
                <input type="text" class="form-control" value="Password is set to 'default'" disabled>
              </div>
            </div>

            <div class="col-12">
              <div class="row justify-content-center">
                <div class="col-6">
                  <button class="btn btn-primary w-100" type="submit">Save</button>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <small class="error-msg text-danger"></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/user/user-new.js"></script>