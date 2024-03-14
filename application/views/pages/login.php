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
  <link href="<?= base_url() ?>assets/css/login.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="<?= base_url() ?>assets/css/template-style.css" rel="stylesheet">
  <link href="<?= base_url() ?>assets/css/login.css" rel="stylesheet">

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
            <div class="col-lg-9 col-md-8 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="<?= base_url() ?>assets/images/rtu-logo.png" alt="" width="40px" height="40px">
                  <span class="d-none d-lg-block">SRAC: DDS</span>
                </a>
              </div><!-- End Logo -->

              <div class="card card-info mb-3 login-container">
                <div class="row">

                  <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div class="p-3">
                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p class="text-center small">Enter your username & password to login</p>
                      </div>
                      <form id="form_login" class="row needs-validation g-3" novalidate>

                        <div class="col-12">
                          <label for="username" class="form-label">Username</label>
                          <div class="input-group has-validation">
                            <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                            <input name="username" id="username" type="text" class="form-control" required>
                            <div class="invalid-feedback">Please enter your username.</div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="password" class="form-label">Password</label>
                          <div class="input-group has-validation">
                            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                            <input name="password" id="password" type="password" class="form-control" required>
                            <div class="invalid-feedback">Please enter your password.</div>
                          </div>
                        </div>

                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">Login</button>
                        </div>

                      </form>
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex flex-columns">
                    <div class="p-5 w-100 introduction-container">

                      <div class="text-white">
                        <h5 class="pb-0 fs-4 introduction">Welcome to SRAC: DDS</h5>
                      </div>
                      <div class="small text-white">
                        <p class="fw-bold fs-6">Note:</p>
                        <p class="m-2">* <b>Forgot your password?</b> Contact admin to reset it.</p>
                        <p class="m-2"><b>* Unauthorized use</b> of the system will result to disciplinary actions.</p>
                      </div>
                    </div>
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
  <script src="<?= base_url() ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

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
