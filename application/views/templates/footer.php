<footer class="flex-c align-i-center g-1 b-color-b color-w p-1">
    <span class="font-s">
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

<!-- BOOTSTRAP -->
<script src="<?=base_url('assets/third_party/bootstrap/js/bootstrap')?>.js"></script>

<!-- DATATABLES -->
<script src="<?=base_url('assets/third_party/datatables/datatables.min')?>.js"></script>

<!-- FONTAWESOME -->
<script src="<?=base_url('assets/third_party/fontawesome/js/all.min')?>.js"></script>

<!-- CUSTOM JS -->
<?php if(isset($js)) foreach($js as $j) {?>
<script src="<?=base_url("assets/js/$j")?>.js"></script>
<?php }?>