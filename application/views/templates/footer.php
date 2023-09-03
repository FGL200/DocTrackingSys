</div> <!-- END OF ROOT -->

<footer class="flex-c align-i-center g-1 b-color-b color-w p-1">
    <span class="font-xs text-c">
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

<div id="modal-holder" class="flex-r justify-c-center align-i-center hide">
    <div id="modal-container" class="card m-3 p-2 flex-c g-2">
        <button class="btn btn-primary" onclick="MODAL.close();"><i class="fa-solid fa-xmark"></i></button>
        <div id="modal-title" class="font-b font-m p-1 text-c"></div>
        <div id="modal-body" class="p-1">
            
        </div>
        <div id="modal-footer" class="flex-rr p-1"></div>
    </div>
</div>

<!-- BOOTSTRAP -->
<script src="<?=base_url('assets/third_party/bootstrap/js/bootstrap.bundle.min')?>.js"></script>

<!-- DATATABLES -->
<script src="<?=base_url('assets/third_party/datatables/datatables.min')?>.js"></script>

<!-- FONTAWESOME -->
<script src="<?=base_url('assets/third_party/fontawesome/js/all.min')?>.js"></script>

<!-- CUSTOM JS -->
<script src="<?=base_url('assets/js/main')?>.js"></script>
<?php if(isset($js)) foreach($js as $j) {?>
<script src="<?=base_url("assets/js/$j")?>.js"></script>
<?php }?>


<!-- END OF HTML -->
</body>
</html>