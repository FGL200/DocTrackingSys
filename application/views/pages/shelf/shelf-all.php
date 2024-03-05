<main id="main" class="main">
  <div class="pagetitle">
    <h1>All Shelves</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>l">Home</a></li>
        <li class="breadcrumb-item active">All Shelves</li>
      </ol>
    </nav>
  </div>

  <section class="section dashboard">
    <div id="shelves_container" class="row">

      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 remove-when-E remove-when-V">
        <a class="card info-card sales-card" href="<?= base_url() ?>shelf/new">
          <div class="card-body">
            <div class="card-title"> </div>

            <div class="d-flex align-items-center">
              <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-plus-lg"></i>
              </div>
              <div class="ps-3">
                <div class="">
                  <span class="h4 fw-bold">Add new Shelf</span>
                </div>
              </div>
            </div>
            <div class="card-body"></div>
          </div>
        </a>
      </div>

    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/shelf/shelf-all.js"></script>