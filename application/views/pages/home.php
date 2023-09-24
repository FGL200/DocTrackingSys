<main class="d-flex flex-column gap-3" style="width: 100%;">
    <nav class="d-flex flex-row flex-wrap justify-content-around align-items-center gap-2 p-1 b-color-w shadow" style="width: 100%;">
        <div id="nav-search-stud" class="d-flex flex-row justify-content-center align-items-center">
            <!-- <input id="id-input-search" class="form-control me-2 d-flex flex-grow" type="search" placeholder="Search Record" aria-label="Search"> -->
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-magnifying-glass"></i> Search Options
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                        <i class="fa-solid fa-qrcode"></i> Scan QR
                    </a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.SEARCH.open()">
                        <i class="fa-solid fa-magnifying-glass-plus"></i> More search option...
                    </a></li>
                </ul>
            </div>
        </div>
        <div id="nav-other" class="d-flex flex-row flex-wrap justify-content-center align-items-center gap-1">
            
            <?php if($_SESSION['role'] === 'A') {?>
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-unlock"></i> Admin
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="HOME.DASHBOARD.load_user_viewers()"><i class="fa-solid fa-user"></i> Viewers</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.DASHBOARD.load_user_encoders()"><i class="fa-solid fa-user-pen"></i> Encoders</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.DASHBOARD.load_user_all()"><i class="fa-solid fa-users"></i> All Users</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.NEW_USER.open()"><i class="fa-solid fa-user-plus"></i> New User</a></li>
                </ul>
            </div>
            <?php }?>
            <?php if($_SESSION['role'] === 'A' || $_SESSION['role'] === 'E') {?>
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-folder-open"></i> Records
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="HOME.NEW_RECORD.open()"><i class="fa-solid fa-plus"></i> New Record</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.IMPORT_EXCEL.open()"><i class="fa-solid fa-file-excel"></i> Import Excel</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.GENERATE_QR.open()"><i class="fa-solid fa-qrcode"></i> Generate QR</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.DASHBOARD.load_dashboard_table('student/record/by/<?=$_SESSION['uid'];?>')"><i class="fa-solid fa-rectangle-list"></i> Added by Me</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.DASHBOARD.load_dashboard_table('student/record/all')"><i class="fa-solid fa-list-ol"></i> All Records</a></li>
                </ul>
            </div>
            <?php }?>
        </div>
    </nav>
    <table id="dataTable" class="table table-hover flex-grow-1 loading" style="margin-bottom:0;"></table>
</main>
<script>const USER_NAME = '<?=$_SESSION['uname']?>';</script>