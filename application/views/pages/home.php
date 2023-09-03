<main class="flex-c justify-c-space-between align-i-center">
    <nav class="flex-r flex-wrap justify-c-space-around align-i-center g-2 p-1 b-color-w shadow" style="width: 100%;">
        <div id="nav-search-stud" class="flex-r justify-c-center align-i-center">
            <input id="id-input-search" class="form-control me-2 flex-grow" type="search" placeholder="Search Record" aria-label="Search">
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-list-check"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">All Records</a></li>
                    <li><a class="dropdown-item" href="#" onclick="HOME.openSearchFilter()">More search option...</a></li>
                    
                </ul>
            </div>
        </div>
        <div id="nav-other" class="flex-r flex-wrap justify-c-center align-i-center g-1">
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-folder-open"></i> Records
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-plus"></i> New Record</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-file-excel"></i> Import Excel</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Added by Me</a></li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-bell"></i> Issues
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-plus"></i> New Issue</a></li>
                    <li><a class="dropdown-item" href="#">My Issues</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Resolved Issues</a></li>
                    <li><a class="dropdown-item" href="#">All Issues</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> Garamay posted new Issue</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> Blurete posted new Issue</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell"></i> Bianes commented to your Issue</a></li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-unlock"></i> Admin
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Encoders</a></li>
                    <li><a class="dropdown-item" href="#">Viewers</a></li>
                    <li><a class="dropdown-item" href="#">All Users</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="flex-grow flex-c justify-c-center">
        <div>
            TABLES
        </div>
    </div>
</main>