<!-- ======= Footer ======= -->
<footer id="footer" class="footer">
  <div class="copyright">
    &copy; Copyright <strong><span>SRAC: DDS</span></strong>. All Rights Reserved
  </div>
  <div class="credits">
    Student Records and Admission Center: Document Digitization System for Rizal Technological University
  </div>
</footer><!-- End Footer -->

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

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="<?= base_url() ?>assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/chart.js/chart.umd.js"></script>
<script src="<?= base_url() ?>assets/vendor/echarts/echarts.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/quill/quill.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="<?= base_url() ?>assets/vendor/tinymce/tinymce.min.js"></script>
<script src="<?= base_url() ?>assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="<?= base_url() ?>assets/js/main.js"></script>

<!-- jsCalendar JS -->
<script src="<?= base_url('assets/third_party/jsCalendar/jsCalendar.min') ?>.js"></script>

<script type="module" src="<?= base_url() ?>assets/js/core.js"></script>


</body>

</html>