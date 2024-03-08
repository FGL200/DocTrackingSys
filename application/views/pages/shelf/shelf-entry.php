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
          <div class="card-title">Records</div>
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