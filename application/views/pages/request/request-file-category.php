<main id="main" class="main">
  <div class="pagetitle">
    <h1>Request File Category</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">Request File Category</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row">
      <div class="card card-body">
        <div class="card-title d-flex justify-content-between">
          Request File Categories
          <button id="btn_new_category" class="btn btn-primary"><i class="bi bi-plus-circle"></i> New Category</button>
        </div>
        <table class="table table-striped table-sm border" id="table_content"></table>
      </div>
    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/request/request-file-category.js"></script>