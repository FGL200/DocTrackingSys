<main class="d-flex flex-column justify-content-between align-items-center" style="width: 100%;">
    <nav class="d-flex flex-row flex-wrap justify-content-around align-items-center gap-2 p-1 b-color-w shadow" style="width: 100%;">
        <div id="nav-search-stud" class="d-flex flex-row justify-content-center align-items-center">
            <input id="id-input-search" class="form-control me-2 d-flex flex-grow" type="search" placeholder="Search Record" aria-label="Search">
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                        <i class="fa-solid fa-qrcode"></i> Scan QR
                    </a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.SEARCH.open()">
                        <i class="fa-solid fa-magnifying-glass-plus"></i> More search option...
                    </a></li>
                    <li><a class="dropdown-item" href="#">
                        <i class="fa-solid fa-list-ol"></i> All Records
                    </a></li>
                </ul>
            </div>
        </div>
        <div id="nav-other" class="d-flex flex-row flex-wrap justify-content-center align-items-center gap-1">
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-unlock"></i> Admin
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user-pen"></i> Encoders</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user"></i> Viewers</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-users"></i> All Users</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.NEW_USER.open()"><i class="fa-solid fa-user-plus"></i> New User</a></li>
                </ul>
            </div>
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
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-rectangle-list"></i> Added by Me</a></li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-hand"></i></i> Touch
                </button>
                <ul class="dropdown-menu">
                    <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-plus"></i> New Touch</a></li> -->
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-hand"></i></i> My Touch</a></li>
                    <!-- <li><hr class="dropdown-divider"></li> -->
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-spell-check"></i> Resolved Touch</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-list-check"></i> All Touch</a></li>
                    <li>
                        <!-- <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> See Garamay's new Touch</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> See Blurete's new Touch</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> Bianes commented to your Touch</a></li> -->
                </ul>
            </div>
        </div>
    </nav>
    <div class="d-flex flex-column flex-grow-1 justify-content-center loading" id="table-container">

    </div>
</main>