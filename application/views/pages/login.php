<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Login</title>
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
  <link href="<?= base_url() ?>assets/css/login.css" rel="stylesheet">

  <!-- Fontawesome -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"></script>

  <!-- Template Main CSS File -->
  <link href="<?= base_url() ?>assets/css/template-style.css" rel="stylesheet">

  <script>
    const base_url = '<?= base_url() ?>';
  </script>
</head>

<body>
  <main>
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="<?= base_url() ?>assets/images/rtu-logo.png" alt="" width="40px" height="40px">
                  <span class="d-none d-lg-block">SRAC: DDS</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
                  </div>
                  <form id="form_login" class="row needs-validation g-3" novalidate>

                    <div class="col-12">
                      <label for="username" class="form-label">Username</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                        <input name="username" id="username" type="text" class="form-control" required>
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="password" class="form-label">Passwowrd</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input name="password" id="password" type="password" class="form-control" required>
                        <div class="invalid-feedback">Please enter your password.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Login</button>
                    </div>

                    <div class="col-12">
                      <p>
                        Check our <a id="terms_and_condition" class="link " href="#terms_and_contition">Terms and condition</a>
                      </p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="<?= base_url() ?>assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="<?= base_url() ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="<?= base_url() ?>assets/vendor/chart.js/chart.umd.js"></script>
  <script src="<?= base_url() ?>assets/vendor/echarts/echarts.min.js"></script>
  <script src="<?= base_url() ?>assets/vendor/quill/quill.min.js"></script>
  <script src="<?= base_url() ?>assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="<?= base_url() ?>assets/vendor/tinymce/tinymce.min.js"></script>

  <!-- Template Main JS File -->
  <script src="<?= base_url() ?>assets/js/main.js"></script>

  <script type="module" src="<?= base_url() ?>assets/js/login.js"></script>

</body>

</html>


<button id="dds_modal_open" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#dds_modal"></button>
<div class="modal fade" id="dds_modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" id="dds_modal_dialog">
    <form id="dds_modal_form" class="modal-content">
      <div id="dds_modal_header" class="modal-header">
        <h5 id="dds_modal_title" class="modal-title fs-5 fw-bold"></h5>
        <button id="dds_modal_close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="dds_modal_body" class="modal-body"></div>
      <div id="dds_modal_footer" class="modal-footer"></div>
    </form>
  </div>
</div>

<!-- <main class="d-flex flex-column justify-content-center align-items-center justify-self-center" style="width: 100%;">
  <form class="d-flex flex-wrap shadow m-2" id="login-form" style="min-height: 300px;">
    <div class="p-4 d-flex justify-content-center flex-column gap-2 flex-grow-1" style="min-width: 300px;">
      <section>
        <h2>Login</h2>
        Sign in to get started!
      </section>
      <section class="d-flex flex-column gap-2">
        <input class="form-control" id="uname" name="username" type="text" placeholder="Username">
        <input class="form-control" id="pword" name="password" type="password" placeholder="Password">
      </section>
      <section class="d-flex flex-row-reverse justify-content-between">
        <button id="btn-login" class="btn btn-primary">Login</button>
      </section>
    </div>
    <div class="p-4 d-flex flex-column flex-grow-1 justify-content-center align-items-center" style="min-width: 300px;">
      <section class="fs-4" style="padding-left: .5rem;" id="welcome-text">
        Welcome to SRAC DDS
      </section>
      <section class="d-flex flex-column" style="margin-top: 1rem; font-size: small; text-align: justify; color: #E5E5F7;">
        <div class="fw-bold fs-6">Note:</div>
        <div class="note-item">If you <b style="color: white;">do not have account</b>, contact admin <br /> to register new account.</div>
        <div class="note-item">If you <b style="color: white;">forgot your password</b>, contact admin <br /> to reset your password.</div>
        <div class="note-item"><b style="color: white;">Unauthorized use</b> of the system will result <br /> to disciplinary actions.</div>
        <div class="note-item">Read <a href="#" style="color: white; font-weight:bold; text-decoration:underline;" onclick="termsAndCondition()">Terms and Conditions</a> to learn more.</div>
      </section>
    </div>
    <div>
    </div>
  </form>
</main> -->