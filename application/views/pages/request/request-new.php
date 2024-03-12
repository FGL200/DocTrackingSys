<main id="main" class="main flex-grow-1">
  <div class="pagetitle">
    <h1>New Request</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?= base_url() ?>">Home</a></li>
        <li class="breadcrumb-item active">New Request</li>
      </ol>
    </nav>
  </div>

  <section class="section">
    <div class="card card-body">
      <div class="card-title">Request details</div>
      <form id="new-request-form">
        <div class="row d-flex">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1" >Last Name</span>
            <input type="text" name="lname" class="form-control" aria-label="Last Name" aria-describedby="basic-addon1">
          </div>
    
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1" >First Name</span>
            <input type="text" name="fname" class="form-control" aria-label="First Name" aria-describedby="basic-addon1">
          </div>
    
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Middle Name</span>
            <input type="text" name="mname" class="form-control" aria-label="Middle Name" aria-describedby="basic-addon1">
          </div>
        </div>
    
        <div class="row">
          <div class="input-group mb-3" style="max-height: 2rem;">
            <span class="input-group-text" id="basic-addon1">File Request</span>
            <select name="file" id="file" class="form-select">
              <option value="" selected disabled>Select File</option>
            </select>
          </div>
    
          <div id="file-requests" style="width: 100px;">
            <span>List of Request</span>
            <div id="file-requests-holder" class="border rounded p-1 d-flex justify-content-center align-items-start gap-2 flex-wrap" style="background-color: white; min-height : 100px;">
              <span style="min-width: 100%;" class="text-center d-none"><i>Click the item to remove.</i></span>
            </div>
          </div>
        </div>
    
    
        <div class="row mb-2">
          <div>
            <span>
              Purpose
            </span>
            <textarea name="reason" id="" class="form-control" cols="30" rows="3"></textarea>
          </div>
        </div>
    
        <div class="row">
          <div class="d-flex justify-content-between align-items-center">
            <div class="form-group">
              <span>
                Due Date
              </span>
              <input type="date" name="due_date" id="" class="form-control">
            </div>
            <div class="form-check form-switch">
              <input type="checkbox" name="priority" class="form-check-input" id="switchPriority">
              <label for="switchPriority" class="form-check-label">High Priority</label>
            </div>
          </div>
        </div>
    
        <div class="row">
          <div class="d-flex justify-content-end">
            <button class="btn btn-success" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</main>

<script type="module" src="<?= base_url() ?>assets/js/request/request-new.js"></script>