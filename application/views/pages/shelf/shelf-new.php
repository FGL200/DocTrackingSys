<main id="main" class="main">
  <div class="pagetitle">
    <h1>New Shelf</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>l">Home</a></li>
        <li class="breadcrumb-item active">New Shelf</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-6 col-sm-8">
        <div class="card card-body">
          <form id="sheld_form" class="row">

            <div class="col-12">
              <div class="card-title"><i class="bi bi-box-seam"></i> New Shelf</div>
            </div>

            <div class="col-12 mb-3">
              <label for="name" class="form-label">Name <small class="text-danger">*</small></label>
              <input type="text" class="form-control" id="name" name="name">
              <div class="invalid-feedback">Name cannot be empty.</div>
            </div>

            <div class="col-12 text-end">
              <button class="btn btn-primary">Save</button>
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

<script type="module" src="<?= base_url() ?>assets/js/shelf/shelf-new.js"></script>