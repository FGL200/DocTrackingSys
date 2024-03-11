<main id="main" class="main">
  <div class="pagetitle">
    <h1>Shelf <?= $name ?></h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/all">All Shelves</a></li>
        <li class="breadcrumb-item active">Shelf <?= $name ?></li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row">
      <div class="col-12">
        <div class="card card-body">
          <div class="card-title">
            <div class="d-flex justify-content-between align-items-center">
              Records
              <span>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                  <button id="advance_search" class="btn btn-outline-primary"><i class="bi bi-search"></i> Advance Search</button>
                  <button id="reload_shelf" class="btn btn-outline-primary"><i class="bi bi-arrow-clockwise"></i>Reload all records</button>
                  <button id="new_record" class="btn btn-success remove-when-A remove-when-V"><i class="bi bi-plus"></i> New Record</button>
                </div>
              </span>
            </div>
          </div>
          <table class="table table-striped table-sm border" id="table_content"></table>
        </div>
      </div>
    </div>
  </section>
</main>

<script>
  const const_shelf_name = '<?= $name ?>';
</script>

<script type="module" src="<?= base_url() ?>assets/js/shelf/shelf-entry.js"></script>