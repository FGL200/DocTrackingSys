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

  <form id="search_form" class="row">
    <div class="col-sm-4">
      <div class="input-block mb-3">
        <input type="text" name="query" class="form-control" placeholder="Search User">
      </div>
    </div>
    <div class="col-sm-4">
      <button type="submit" class="btn btn-success w-100 mb-3"><i class="bi bi-search"></i> Search</button>
    </div>
    <div class="col-sm-4">
      <button id="refresh_table" type="button" class="btn btn-primary w-100 mb-3"><i class="bi bi-arrow-clockwise"></i> Refresh Table</button>
    </div>
  </form>
  <div class="row">
    <div class="col-12">
      <section class="section dashboard">
        <div id="users_container" class="row align-items-center">
        </div>
      </section>
    </div>
  </div>

</main>

<script type="module" src="<?= base_url() ?>assets/js/user/user-logs.js"></script>