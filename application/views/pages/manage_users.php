<main class="d-flex flex-column gap-3" style="width: 100%;">
    <nav class="d-flex flex-row flex-wrap justify-content-around align-items-center gap-2 p-1 b-color-w shadow" style="width: 100%;">
        <div></div>
        <div class="d-flex flex-row flex-wrap justify-content-center align-items-center gap-1">
            <div class="dropdown">
                <button class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-unlock"></i> Admin
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="loadTable('user/viewers')"><i class="fa-solid fa-user"></i> Viewers</a></li>
                    <li><a class="dropdown-item" href="#" onclick="loadTable('user/encoders')"><i class="fa-solid fa-user-pen"></i> Encoders</a></li>
                    <li><a class="dropdown-item" href="#" onclick="loadTable('user/all')"><i class="fa-solid fa-users"></i> All Users</a></li>
                    <li class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="newUser()"><i class="fa-solid fa-user-plus"></i> New User</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <table id="dataTable" class="table table-hover flex-grow-1"></table>
</main>