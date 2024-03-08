<main id="main" class="main">
  <div class="pagetitle">
    <h1>Record #<?= $record_name ?></h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/all">All Shelves</a></li>
        <li class="breadcrumb-item"><a href="<?= base_url() ?>shelf/entry/"><span id="shelf_name">Shelf Name</span> </a></li>
        <li class="breadcrumb-item active">Record #<?= $record_name ?></li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row">

    </div>
  </section>
</main>

<script>
  const const_record_name = '<?= $record_name ?>';
</script>

<script type="module" src="<?= base_url() ?>assets/js/record/record-entry.js"></script>

