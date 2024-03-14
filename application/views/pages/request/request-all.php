<main id="main" class="main">
  <div class="pagetitle">
    <h1>All Requests</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">All Requests</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row">
      <div class="card card-body">
        <div class="card-title">
          <div class="d-flex justify-content-between align-items-center">
            All Requests
            <span>
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button id="advance_search" class="btn btn-outline-primary"><i class="bi bi-search"></i> Advance Search</button>
                <button id="reload_content" class="btn btn-outline-primary"><i class="bi bi-arrow-clockwise"></i>Reload all requests</button>
                <a href="<?= base_url()?>request/new" id="new_record" class="btn btn-success remove-when-E"><i class="bi bi-plus"></i> New request</a>
              </div>
            </span>
          </div>
        </div>
        <table class="table table-striped table-sm border" id="table_content"></table>
      </div>
    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/request/request-all.js"></script>