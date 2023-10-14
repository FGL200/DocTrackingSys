<?php
function val(String $strJson){return intval(json_decode($strJson)->val);}
?>

<main class="d-flex justify-content-center align-items-center">
    <<?=($role !== 'V') ? 'form' : 'div'?> id="update-record-form" class="d-flex flex-column m-1" method="post">
        <div class="doc-header d-flex justify-content-between align-items-center flex-wrap p-2 gap-2">
            <button class="btn btn-danger" type="button" onclick="window.close();">Back</button>
            <b class="card p-2 flex-grow-1">Record ID# <?=$record_id?></b>
            <?php if ($role === 'A') {?>
            <button class="btn btn-danger" type="button" id="delete-record-btn" onclick="VIEW_RECORD.onSubmit(this);"><i class="fa-solid fa-trash"></i> Delete</button>
            <?php }?>
            <?php if ($role !== 'V') {?>
            <button class="btn btn-success" type="button" id="update-record-btn" onclick="VIEW_RECORD.onSubmit(this)"><i class="fa-solid fa-floppy-disk"></i> Save</button>
            <?php }?>
            <input type="hidden" name="stud_rec_id" value="<?=$record_id?>">
        </div>
        <div class="d-flex flex-row flex-wrap gap-2">
            <section class="d-flex flex-column flex-wrap flex-grow-1 gap-1 card p-2 m-2 flex-end align-self-start">
                <span class="flex-grow-1">
                    <b>Information</b>
                </span>
                <span class="d-flex justify-content-center align-items-center gap-1">
                    <input <?=($role==='V')?'disabled':''?> id="stud_id" name="stud_id" type="text" autocomplete="off" class="p-2 card" placeholder="Student ID">
                </span>
                <span class="d-flex justify-content-center align-items-center gap-1">
                    <input <?=($role==='V')?'disabled':''?> id="stud_lname" name="stud_lname" type="text" autocomplete="off" class="p-2 card" placeholder="Last Name">
                </span>
                <span class="d-flex justify-content-center align-items-center gap-1">
                    <input <?=($role==='V')?'disabled':''?> id="stud_fname" name="stud_fname" type="text" autocomplete="off" class="p-2 card" placeholder="First Name" required>
                </span>
                <span class="d-flex justify-content-center align-items-center gap-1">
                    <input <?=($role==='V')?'disabled':''?> id="stud_mname" name="stud_mname" type="text" autocomplete="off" class="p-2 card" placeholder="Middle Name">
                </span>
                <span class="d-flex justify-content-center align-items-center gap-1">
                    <input <?=($role==='V')?'disabled':''?> id="stud_sfx" name="stud_sfx" type="text" autocomplete="off" class="p-2 card" placeholder="SFX">
                </span>
                <hr>
                <span class="flex-grow-1">
                    <b>Remarks</b>
                </span>
                <?php if ($role !== 'V') {?>
                <span class="d-flex align-items-center gap-1">
                    <div class="dropdown flex-grow-1 d-flex">
                        <button class="btn dropdown-toggle flex-grow-1 card d-flex flex-row justify-content-center align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Select Remarks
                        </button>
                        <ul id="remarks-category" class="dropdown-menu"></ul>
                    </div>
                    <button type="button" onclick="$('#_remarksValue_other_holder').removeClass('hide'); $('#_remarksValue_other').focus();" class="btn btn-primary"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </span>
                <?php }?>
                

                <span id="_remarksValue_other_holder" class="d-flex flex-column flex-grow-1 gap-2 hide">
                    <label for="_remarksValue_other" style="font-size: 10pt; text-align: center; color: rgba(0,0,0,0.5);">Press 'Enter' to add to list</label>
                    <div class="d-flex justify-content-between gap-2">
                        <input class="card p-2 flex-grow-1" type="text" name="_remarksValue_other" id="_remarksValue_other" placeholder="Add Remarks" />
                        <button type="button" class="btn btn-danger align-self-center" onclick="$('#_remarksValue_other_holder').addClass('hide'); $('#_remarksValue_other').val('');"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </span>
                <span id="remarks-holder" class="d-flex flex-row flex-wrap gap-1 p-1 card align-self-center" style="background-color: rgba(0,0,0,0.1); max-width: 380px;">
                    No Remarks
                </span>

                <!-- NOT SURE PA KUNG AALISIN KO NA TO TALAGA -->
                <!-- <span id="_remarksValue_other_holder" class="d-flex align-items-center justify-content-between flex-grow-1 gap-2 hide">
                    <div class="d-flex flex-column">
                        <label for="_remarksValue_other" style="font-size: 10pt; text-align: center; color: rgba(0,0,0,0.5);">Press 'Enter' to add to list</label>
                        <input class="card p-2 flex-grow-1" type="text" name="_remarksValue_other" id="_remarksValue_other" placeholder="Add Remarks" <? //=($role==='V')?'disabled':''?>  />
                    </div>
                    <?php // if ($role !== 'V') {?>
                    <button type="button" onclick="$('#_remarksValue_other_holder').addClass('hide'); $('#_remarksValue_other').val('');" class="btn btn-danger"><i class="fa-solid fa-xmark"></i></button>
                    <?php // }?>
                </span>
                <span id="remarks-holder" class="d-flex flex-row flex-wrap gap-1 p-1 card" style="background-color: rgba(0,0,0,0.1); max-width: 300px;">
                    No Remarks
                </span> -->
                
            </section>
            <section class="d-flex flex-column flex-grow-1 gap-1 card p-2 m-2">
                <span>
                    <b>Documents</b>
                </span>

                <span style="background-color: <?=val($studData['regi_form'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_regi_form">Registration Form</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_regi_form" name="doc_val_regi_form" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_regi_form" name="doc_scan_regi_form[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_regi_form')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_regi_form" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['good_moral'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_good_moral">Good Moral</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_good_moral" name="doc_val_good_moral" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_good_moral" name="doc_scan_good_moral[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_good_moral')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_good_moral" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['j_f137'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_j_f137">Junior Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input  <?=($role==='V')?'disabled':''?> id="doc_val_j_f137" name="doc_val_j_f137" type="checkbox" class="cb-doc">
                            <input  <?=($role==='V')?'disabled':''?> id="doc_scan_j_f137" name="doc_scan_j_f137[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <?php if($role !== 'V') {?>
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_j_f137')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <?php }?>
                            <button class="viewScan btn btn-secondary" id="view_scan_j_f137" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                    <span style="background-color: <?=val($studData['s_f137'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                        <label class="flex-grow-1 align-items-stretch" for="doc_val_s_f137">Senior Form 137</label>
                        <span class="d-flex flex-nowrap gap-1">
                            <input  <?=($role==='V')?'disabled':''?> id="doc_val_s_f137" name="doc_val_s_f137" type="checkbox" class="cb-doc">
                            <input  <?=($role==='V')?'disabled':''?> id="doc_scan_s_f137" name="doc_scan_s_f137[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                            <?php if($role !== 'V') {?>
                            <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_s_f137')" >
                            <span> + </span> <i class="fa-solid fa-image"></i>
                            </button>
                            <?php }?>
                            <button class="viewScan btn btn-secondary" id="view_scan_s_f137" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                        </span>
                    </span>

                <span style="background-color: <?=val($studData['f138'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_f138">Form 138</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_f138" name="doc_val_f138" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_f138" name="doc_scan_f138[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_f138')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_f138" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['birth_cert'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_birth_cert">Birth Certificate</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_birth_cert" name="doc_val_birth_cert" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_birth_cert" name="doc_scan_birth_cert[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_birth_cert')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_birth_cert" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['tor'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_tor">Transcript of Records</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_tor" name="doc_val_tor" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_tor" name="doc_scan_tor[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_tor')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_tor" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['app_grad'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_app_grad">App for Graduation</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_app_grad" name="doc_val_app_grad" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_app_grad" name="doc_scan_app_grad[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_app_grad')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_app_grad" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['cert_of_complete'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_cert_of_complete">Certificate of Completion</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_cert_of_complete" name="doc_val_cert_of_complete" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_cert_of_complete" name="doc_scan_cert_of_complete[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_cert_of_complete')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_cert_of_complete" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['req_clearance_form'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_req_clearance_form">Request for Clearance</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_req_clearance_form" name="doc_val_req_clearance_form" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_req_clearance_form" name="doc_scan_req_clearance_form[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_req_clearance_form')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_req_clearance_form" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['req_credentials'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_req_credentials">Request for Credentials Form</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_req_credentials" name="doc_val_req_credentials" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_req_credentials" name="doc_scan_req_credentials[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_req_credentials')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_req_credentials" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>

                <span style="background-color: <?=val($studData['hd_or_cert_of_trans'])?'#E8F8F5':'#FDEDEC'?>;" class="border border-1 p-1 rounded d-flex justify-content-between align-items-center gap-1">
                    <label class="flex-grow-1 align-items-stretch" for="doc_val_hd_or_cert_of_trans">Honorable Dismisal / Certificate of Transferee</label>
                    <span class="d-flex flex-nowrap gap-1">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_val_hd_or_cert_of_trans" name="doc_val_hd_or_cert_of_trans" type="checkbox" class="cb-doc">
                        <input  <?=($role==='V')?'disabled':''?> id="doc_scan_hd_or_cert_of_trans" name="doc_scan_hd_or_cert_of_trans[]" type="file" multiple disabled accept=".png, .jpg, .jpeg" class="hide scaned-doc">
                        <?php if($role !== 'V') {?>
                        <button disabled class="btnFile btn btn-success d-flex flex-nowrap align-items-center gap-1" type="button" onclick="changeFileDir('#doc_scan_hd_or_cert_of_trans')" >
                        <span> + </span> <i class="fa-solid fa-image"></i>
                        </button>
                        <?php }?>
                        <button class="viewScan btn btn-secondary" id="view_scan_hd_or_cert_of_tran" type="button" disabled><i class="fa-solid fa-eye"></i></button>
                    </span>
                </span>
                
            </section>
        </div>
    </<?=($role !== 'V') ? 'form' : 'div'?>>
</main>
<div id="image-viewer-container" class="hide">
    <div id="image-viewer-holder" class="d-flex flex-column gap-2">
        <button class="btn btn-danger" id="close-image-viewer-container"><i class="fa-solid fa-xmark"></i></button>
        <button id="rotate-img" class="btn btn-primary align-self-end"><i class="fa-solid fa-rotate"></i></button>
    </div>
</div>