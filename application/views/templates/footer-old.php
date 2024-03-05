</div> <!-- END OF ROOT -->

<footer class="d-flex flex-column align-iitems-center gap-1 b-color-b color-w p-1">
  <span class="fs-6 text-center">
    Student Records and Admission Center
    Document Digitization System for
    Rizal Technological University
  </span>
  <!-- <p>Copyright © 2023</p>
    <p>All Rights Reserved</p>
    <p>Student Records and Admission Center</p>
    <p>Document Tracking System for</p>
    <p>Rizal Technological University</p> -->
</footer>

<div id="modal-holder" class="d-flex flex-row justify-content-center align-items-center hide">
  <form id="modal-container" class="card m-3 p-2 d-flex flex-column gap-2" method="post" enctype="multipart/form-data">
    <button type="button" id="modal-btn-close" class="btn btn-primary" onclick="(typeof ON_MODAL_CLOSE !== 'undefined') ? MODAL.close(ON_MODAL_CLOSE()) : MODAL.close();"><i class="fa-solid fa-xmark"></i></button>
    <div id="modal-title" class="fw-bold fs-6 p-1 text-center"></div>
    <div id="modal-body" class="p-1"></div>
    <div id="modal-footer" class="d-flex flex-row-reverse p-1 gap-2"></div>
    <div id="modal-script"></div>
  </form>
</div>

<!-- BOOTSTRAP JS -->
<script src="<?= base_url('assets/third_party/bootstrap/js/bootstrap.bundle.min') ?>.js"></script>

<!-- DATATABLES JS -->
<script src="<?= base_url('assets/third_party/datatables/datatables.min') ?>.js"></script>

<!-- FONTAWESOME JS -->
<script src="<?= base_url('assets/third_party/fontawesome/js/all.min') ?>.js"></script>

<!-- jsCalendar JS -->
<script src="<?= base_url('assets/third_party/jsCalendar/jsCalendar.min') ?>.js"></script>

<!-- Jquery qrcode -->
<script src="<?= base_url('assets/third_party/jquery-qrcode/dist/jquery-qrcode') ?>.js"></script>

<!-- CUSTOM JS -->
<script src="<?= base_url('assets/js/modal') ?>.js"></script>
<script src="<?= base_url('assets/js/main') ?>.js"></script>
<?php if (isset($js)) foreach ($js as $j) {
  if ($j != null) { ?>
    <script src="<?= base_url("assets/js/$j") ?>.js"></script>
<?php }
} ?>


<!-- END OF HTML -->
</body>

</html>