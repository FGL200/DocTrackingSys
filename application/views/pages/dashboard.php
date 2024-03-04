<main id="main" class="main">
  <div class="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>

  <section class="section dashboard">
    <div class="row">

      <div class="col-lg-7">
        <div class="row">

          <!-- File Request -->
          <div class="col-12">
            <div class="card" id="request_container">
              <div class="filter">
                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li><a class="dropdown-item" href="#">Today</a></li>
                  <li><a class="dropdown-item" href="#">This Month</a></li>
                  <li><a class="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>

              <div class="card-body pb-0">
                <h5 class="card-title">File Request <span>| Today</span></h5>
                <div id="trafficChart" style="min-height: 400px;" class="echart"></div>
              </div>
            </div>
          </div>
          <!-- End File Request -->

          <!-- File Request -->
          <div class="col-12">

            <div class="card">
              <div class="filter">
                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li><a class="dropdown-item">2024</a></li>
                  <li><a class="dropdown-item">2023</a></li>

                </ul>
              </div>
              <div class="card-body">
                <h5 class="card-title">Encoder's Iduuno the term <span>| 2024</span></h5>
                <div id="reportsChart"></div>
              </div>

            </div>
          </div>
          <!-- End File Request -->

        </div>
      </div>

      <div class="col-lg-5 col-md-12 col-sm-12">
        <div class="d-flex align-items-center justify-content-center">
          <div class="card card-info">
            <div class="auto-jsCalendar"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</main>

<script src="<?= base_url('assets/third_party/amChart/amChart.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/xy.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/percent.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/Animated.js') ?>"></script>

<script type="module" src="<?= base_url() ?>assets/js/dashboard.js"></script>


<!-- <main class="d-flex">
  <div id="dashBoard" class="card p-3 m-3 flex-grow-1 gap-2">
    <div class="d-flex flex-wrap aling-items-center justify-content-between gap-2 mb-3">
      <span class="fs-3 flex-grow-1 d-flex align-items-center" style="
                background-color: rgba(0,0,0,0.02); 
                padding: 0 1rem;
                box-shadow: inset 0 .12rem .5rem rgba(0,0,0,.08);
                border-radius: 5px;">
        Dashboard
      </span>
      <span class="d-flex align-items-center gap-2 border rounded" style="padding-left: 1rem; padding-right: .25rem;">

        <input type="text" placeholder="Quick Search" id="quick_serach" class="border-0" style="outline: none;">
        <button class="btn btn-primary" onclick="Submit_QuickSearch()"><i class="fa-solid fa-magnifying-glass"></i></button>
      </span>

      <?php if ($role === 'V') { ?>
        <span class="d-flex align-items-center flex-wrap gap-2">
          <button class="btn btn-primary" onclick="newRequest()">
            <i class="fa-solid fa-plus"></i> New Request
          </button>
          <a href="<?= base_url() ?>requests" class="btn btn-secondary">
            <i class="fa-regular fa-eye"></i> View Requests
          </a>
        </span>
      <?php } ?>

      <?php if ($role === 'A') { ?>
        <span class="d-flex align-items-center flex-wrap gap-2">
          <a href="<?= base_url() ?>requests" class="btn btn-secondary">
            <i class="fa-regular fa-eye"></i> View Requests
          </a>
        </span>
      <?php } ?>

      <?php if ($role === 'A') { ?>
        <span class="d-flex justify-content-end flex-wrap gap-2">
          <ul class="nav nav-tabs justify-content-start" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link dashboard-nav active" id="shelves-tab" data-bs-toggle="tab" data-bs-target="#shelf" type="button" role="tab" aria-selected="true" style="white-space: nowrap;">
                <i class="fa-solid fa-lines-leaning"></i> Shelves
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#visual-analytics" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                <i class="fa-solid fa-chart-line"></i> Statistics
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button onclick="MAIN.goto('manage')" class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#manage-users" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                <i class="fa-solid fa-users"></i> Manage Users
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button onclick="MAIN.goto('logs')" class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#users-log" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                <i class="fa-solid fa-book"></i> Users log
              </button>
            </li>
          </ul>
        </span>
      <?php } ?>

    </div>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="shelf" role="tabpanel" aria-labelledby="shelves-tab" tabindex="0">
        <div class="row">

          <div class="col-lg-7 col-md-12 col-sm-12">
            <div id="shelf-holder" class="d-flex justify-content-center flex-wrap align-items-start gap-3">
              <?php foreach ($shelves as $shelf) { ?>
                <a href="<?= base_url('shelf/' . $shelf['name']) ?>" class="shelf-container card p-3 shadow-0" data-binder-id="<?= $shelf['id'] ?>" data-binder-name="<?= $shelf['name'] ?>">

                  <section class="shelf-title d-flex justify-content-between align-items-center gap-2 fs-4">
                    <span>
                      <i class="fa-solid fa-bars-staggered"></i>
                    </span>
                    <span class="shelf-name flex-grow-1">
                      <?= strtoupper($shelf['name']); ?>
                    </span>
                  </section>
                  <section class="shelf-body d-flex flex-column">
                    <span><b>Records: </b> <span><?= $shelf['total'] ?? '--'; ?></span> </span>
                    <span><b>Encoders:</b> <span><?= $shelf['users'] ?? '--'; ?></span></span>
                    <span><b>Last update: </b> <span><?= $shelf['last date'] ?? '--'; ?></span></span>
                  </section>
                </a>
              <?php } ?>

              <?php if ($role === 'A') { ?>
                <a href="<?= base_url('shelf/trash') ?>" class="shelf-container shelf-trash card p-3 shadow-0">
                  <section class="shelf-title fs-4">
                    <i class="fa-solid fa-box-archive"></i>
                    Archived
                  </section>
                  <section class="shelf-body d-flex flex-column">
                    <span><b>Records: </b><span><?= $bin_records ?></span></span>
                  </section>
                </a>

                <a href="#" onclick="newShelf()" class="shelf-container shelf-new card p-3 shadow-0 mb-3">
                  <section class="shelf-body d-flex flex-grow-1 justify-content-center align-items-center gap-2">
                    <i class="fa-solid fa-plus"></i>
                    <span class="fs-4"><span>Add Shelf</span></span>
                  </section>
                </a>
              <?php } ?>
            </div>
          </div>

          <div class="col-lg-5 col-md-12 col-sm-12">
            <div class="d-flex justify-content-center align-items-center">
              <div class="auto-jsCalendar shadow-0 card align-self-start mt-3"></div>
            </div>
          </div>

        </div>
      </div>
      <?php if ($role === 'A') { ?>

        <div class="tab-pane fade" id="visual-analytics" role="tabpanel" aria-labelledby="statistics-tab" tabindex="1" style="overflow-y: auto;">
          <div class="d-flex flex-column flex-grow-1 gap-2">
            <div class="d-flex flex-row-reverse">
              <button class="btn btn-primary" onclick="generateReport()">Generate Report</button>
            </div>
            <div class="d-flex flex-wrap gap-2">
              <section id="bar-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                <span class="chart-title fw-bold">Daily update</span>
                <div id="encoded-live" style="min-width: 300px;"></div>
              </section>
              <section id="pie-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                <span class="chart-title fw-bold">Request record</span>
                <div id="remarks-pie" style="min-width: 300px;"></div>
              </section>
            </div>
            <div class="d-flex flex-wrap gap-2">
              <section id="line-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                <span class="chart-title fw-bold">Monthly encoded</span>
                <div id="encoded-monthly" style="min-width: 300px; min-height: 450px;"></div>
              </section>
            </div>
          </div>
        </div>

        <div class="tab-pane fade" id="manage-users" role="tabpanel" aria-labelledby="manage-tab" tabindex="2">
        </div>

        <div class="tab-pane fade" id="users-log" role="tabpanel" aria-labelledby="log-tab" tabindex="3">
        </div>

      <?php } ?>
    </div>
  </div>
  <div id="settings" class="hide">
    <section class="fw-bold mb-2" style="border-bottom: 1px solid rgba(0,0,0,0.05);"><span></span>
      <div id="settings-shlef-name" style="white-space: nowrap;">Name of Shelf</div>
    </section>
    <button onclick="s_Open(this)" class="text-primary"><span><i class="fa-solid fa-folder-open"></i></span> Open</button>
    <button onclick="s_NTab(this)" class="text-primary"><span><i class="fa-solid fa-up-right-from-square"></i></span> Open in new tab</button>
    <button onclick="s_RName(this)" class="text-warning"><span><i class="fa-solid fa-pen-to-square"></i></span> Rename shelf</button>
    <button onclick="s_Tash(this)" class="text-danger"><span><i class="fa-solid fa-trash-can"></i></span> Move Records to Trash</button>
    <button onclick="s_Del(this)" class="text-danger"><span><i class="fa-solid fa-square-minus"></i></span> Delete shelf</button>
  </div>
</main>
-->