<main id="main" class="main">
  <div class="pagetitle">
    <h1>User Logs</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">User Logs</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="row">
      <div class="card card-body">
        <div class="card-title">User Logs</div>
        <table class="table table-striped table-sm border" id="table_content"></table>
      </div>
    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/user/user-logs.js"></script>