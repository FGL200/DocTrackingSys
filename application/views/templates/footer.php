</div> <!-- END OF ROOT -->

<footer class="d-flex flex-column align-iitems-center gap-1 b-color-b color-w p-1">
    <span class="fs-6 text-center">
        Student Records and Admission Center 
        Document Tracking System for 
        Rizal Technological University
    </span>
    <!-- <p>Copyright © 2023</p>
    <p>All Rights Reserved</p>
    <p>Student Records and Admission Center</p>
    <p>Document Tracking System for</p>
    <p>Rizal Technological University</p> -->
</footer>

<div id="modal-holder" class="d-flex flex-row justify-content-center align-items-center hide">
    <form id="modal-container" class="card m-3 p-2 d-flex flex-column gap-2" method="post">
        <button type="button" class="btn btn-primary" onclick="MODAL.close();"><i class="fa-solid fa-xmark"></i></button>
        <div id="modal-title" class="fw-bold fs-6 p-1 text-center"></div>
        <div id="modal-body" class="p-1">
                
        </div>
        <div id="modal-footer" class="d-flex flex-row-reverse p-1"></div>
        <div id="modal-script"></div>
    </form>
</div>

<!-- BOOTSTRAP -->
<script src="<?=base_url('assets/third_party/bootstrap/js/bootstrap.bundle.min')?>.js"></script>

<!-- DATATABLES -->
<script src="<?=base_url('assets/third_party/datatables/datatables.min')?>.js"></script>

<!-- FONTAWESOME -->
<script src="<?=base_url('assets/third_party/fontawesome/js/all.min')?>.js"></script>

<!-- CUSTOM JS -->
<script src="<?=base_url('assets/js/modal')?>.js"></script>
<script src="<?=base_url('assets/js/main')?>.js"></script>
<?php if(isset($js)) foreach($js as $j) {?>
<script src="<?=base_url("assets/js/$j")?>.js"></script>
<?php }?>


<!-- END OF HTML -->
</body>
</html>