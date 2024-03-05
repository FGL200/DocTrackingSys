<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <script>
    <?php if (isset($constants)) foreach ($constants as $c => $v) { ?>
      const const_<?= $c ?> = '<?= $v ?>';
    <?php } ?>
    const base_url = '<?= base_url() ?>';
  </script>

  <title>SRAC: DDS</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link rel="shortcut icon" href="<?= base_url('assets/images/rtu-logo') ?>.png" type="image/x-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="<?= base_url() ?>assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- jsCalendar CSS -->
  <link rel="stylesheet" href="<?= base_url('assets/third_party/jsCalendar/jsCalendar.min') ?>.css">

  <?php if (isset($css)) foreach ($css as $c) { ?>
    <link rel="stylesheet" href="<?= base_url("assets/css/$c") ?>.css">
  <?php } ?>

  <link href="<?= base_url() ?>assets/css/template-style.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/css/header.css" rel="stylesheet">

</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center color-white">

    <div class="d-flex align-items-center justify-content-between">
      <a href="<?= base_url() ?>" class="logo d-flex align-items-center">
        <img src="<?= base_url() ?>assets/images/rtu-logo.png" alt="" width="40-px" height="40px">
        <span class="d-none d-lg-block header-white">SRAC: DDS</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn header-white"></i>
    </div><!-- End Logo -->

    <div class="search-bar">
      <form class="search-form d-flex align-items-center" id="form_quickSearch">
        <input type="text" name="query" placeholder="Quick Search" title="Enter search record">
        <button type="submit" title="Search"><i class="bi bi-search"></i></button>
      </form>
    </div><!-- End Search Bar -->

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <span class="profile-picture d-flex align-items-center justify-content-center rounded-circle bg-white">
              <i class="bi bi-person"></i>
            </span>
            <!-- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"> -->
            <span class="d-none d-md-block dropdown-toggle ps-2 header-white"><?= $constants['username'] ?></span>
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

            <li class="dropdown-header">
              <h6><?= $constants['fullname'] ?></h6>
              <span><?= getRoleByRoleID($constants['role']) ?></span>
            </li>

            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="#edit-profile">
                <i class="bi bi-person"></i>
                <span>Edit Profile</span>
              </a>
            </li>

            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="<?= base_url() ?>api/user/logout">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

      </ul>
    </nav><!-- End Icons Navigation -->

  </header><!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link" href="<?= base_url() ?>dashboard">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->

      <li class="nav-heading">Records</li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="<?= base_url() ?>shelf/all">
          <i class="bi bi-list-nested"></i><span>All Shelves</span>
        </a>
      </li><!-- End Student Records Page Nav -->

      <li class="nav-heading remove-when-E remove-when-V">Admin</li>

      <li class="nav-item remove-when-E remove-when-V">
        <a class="nav-link collapsed" data-bs-target="#users-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-people"></i><span>Manage Users</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="users-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a id="page-add_user" href="<?= base_url() ?>user/new">
              <i class="bi bi-person-plus"></i><span>Add New User</span>
            </a>
          </li>
          <li>
            <a id="page-all_users" href="<?= base_url() ?>user/all">
              <i class="bi bi-people"></i><span>All Users</span>
            </a>
          </li>
          <li>
            <a id="page-users_log" href="<?= base_url() ?>user/logs">
              <i class="bi bi-list-task"></i><span>Users Logs</span>
            </a>
          </li>
        </ul>
      </li><!-- End Users Nav -->


      <li class="nav-item remove-when-E remove-when-V">
        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bookshelf"></i><span>Manage Shelves</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a href="<?= base_url() ?>shelf/new">
              <i class="bi bi-plus"></i><span>New Shelf</span>
            </a>
          </li>
          <li>
            <a href="<?= base_url() ?>shelf/archived">
              <i class="bi bi-box-seam"></i><span>Archived Shelves</span>
            </a>
          </li>
        </ul>
      </li><!-- End Shelves Nav -->

      <li class="nav-item remove-when-E remove-when-V">
        <a class="nav-link collapsed" data-bs-target="#manage-request-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-wallet2"></i><span>Manage Request</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="manage-request-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a id="page-add_user" href="<?= base_url() ?>request/file-categories">
              <i class="bi bi-diagram-3"></i><span>File Categories</span>
            </a>
          </li>
        </ul>
      </li><!-- End Users Nav -->

      <li class="nav-heading remove-when-A remove-when-V">Encoder</li>

      <li class="nav-item remove-when-A remove-when-V">
        <a class="nav-link collapsed" data-bs-target="#records-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-file-earmark-person"></i><span>Student Records</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="records-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a id="page-all_users" href="<?= base_url() ?>record/new">
              <i class="bi bi-plus"></i><span>Add New Record</span>
            </a>
          </li>
          <li>
            <a id="page-all_users" href="<?= base_url() ?>record/archived">
              <i class="bi bi-box-seam"></i><span>Archived Records</span>
            </a>
          </li>
        </ul>
      </li><!-- End Users Nav -->

      <li class="nav-heading remove-when-E remove-when-A">Checker</li>

      <li class="nav-item remove-when-E remove-when-A">
        <a class="nav-link collapsed" data-bs-target="#request-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-person-lines-fill"></i> <span>Requests</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="request-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <a id="page-add_user" href="<?= base_url() ?>request/new">
              <i class="bi bi-plus"></i><span>Add New Request</span>
            </a>
          </li>
          <li>
            <a id="page-all_users" href="<?= base_url() ?>request/all">
              <i class="bi bi-hourglass-split"></i>All Requests</span>
            </a>
          </li>
      </li>
      <li>
        <a id="page-all_users" href="<?= base_url() ?>request/archived">
          <i class="bi bi-box-seam"></i><span>Archived Requests</span>
        </a>
      </li>
    </ul>
    </li><!-- End Users Nav -->

    </ul>

  </aside><!-- End Sidebar-->