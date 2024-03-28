<main id="main" class="main">
  <div class="pagetitle">
    <div class="row">
      <div class="col-12">
        <div class="card card-body pb-0">
          <div class="card-title m-0"><i class="bi bi-person-circle"></i> Welcome, <?= $constants['myname'] ?>!</div>
        </div>
      </div>
    </div>
  </div>

  <section class="section dashboard">
    <div class="row">

      <!-- File Request -->
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="card" id="request_container">
          <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li class="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a class="dropdown-item filter_request" href="#">This Month</a></li>
              <li><a class="dropdown-item filter_request" href="#">Prev Month</a></li>
              <li><a class="dropdown-item filter_request" href="#">This Year</a></li>
            </ul>
          </div>

          <div class="card-body pb-0">
            <h5 class="card-title">File Request <span id="request_selected_filter">| Today</span></h5>
            <div id="requestPie" style="min-height: 400px;" class="echart"></div>
          </div>
        </div>
      </div>
      <!-- End File Request -->

      <!-- File Request -->
      <div class="col-lg-6 col-md-6 col-sm-6">

        <div class="card">
          <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow" id="encoded_year_filter">
              <li class="dropdown-header text-start">
                <h6>Filter</h6>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title">Transcriber's monthly encoded <span id="transcriber_selected_year">| 2024</span></h5>
            <div id="encodedChart"></div>
          </div>

        </div>
      </div>
      <!-- End File Request -->

    </div>

    <div class="row">

      <div class="col-lg-7 col-md-7 remove-when-V remove-when-E remove-when-VE">
        <div class="card card-body">
          <div class="card-title">Report</div>
          <button id="generate_report" class="btn btn-primary w-100" type="button"><i class="bi bi-printer"></i> Generate Report</button>
        </div>
      </div>

      <div class="col-lg-5 col-md-5">
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