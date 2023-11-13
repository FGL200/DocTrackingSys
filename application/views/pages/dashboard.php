<main class="d-flex">
    <div id="dashBoard" class="card p-3 m-3 flex-grow-1 gap-2">
        <div class="d-flex justify-content-between gap-2 mb-3">
            <span class="fs-3 flex-grow-1 d-flex align-items-center" 
                style="
                background-color: rgba(0,0,0,0.02); 
                padding: 0 1rem;
                box-shadow: inset 0 .12rem .5rem rgba(0,0,0,.08);
                border-radius: 5px;
                ">Dashboard</span>

            <?php if ($role === 'A') { ?>

            <span class="d-flex justify-content-end flex-wrap gap-2">

                <ul class="nav nav-tabs justify-content-start" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link dashboard-nav active" id="shelves-tab" data-bs-toggle="tab" data-bs-target="#shelf" type="button" role="tab" aria-selected="true" style="white-space: nowrap;">
                            <i class="fa-solid fa-lines-leaning"></i> Shelves
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#visual-analytics" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                            <i class="fa-solid fa-chart-line"></i> Statistics
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button onclick="MAIN.goto('manage')" class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#manage-users" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                            <i class="fa-solid fa-users"></i> Manage Users
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button onclick="MAIN.goto('logs')" class="nav-link dashboard-nav" id="statistics-tab" data-bs-toggle="tab" data-bs-target="#users-log" type="button" role="tab" aria-selected="false" style="white-space: nowrap;">
                            <i class="fa-solid fa-book"></i> Users log
                        </button>
                    </li>
                </ul>
                <!-- <section class="d-flex flex-wrap justify-content-center gap-2">
                    <button class="btn btn-outline-primary justify-self-center" onclick="MAIN.goto('manage')"><i class="fa-solid fa-users"></i> Manage Users</button>
                    <button class="btn btn-outline-primary justify-self-center" onclick="MAIN.goto('home')"><i class="fa-solid fa-users"></i> Users log</button>
                </section> -->

            </span>

            <?php } ?>

        </div>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="shelf" role="tabpanel" aria-labelledby="shelves-tab" tabindex="0">
                <div id="shelf-tab-container" class="d-flex flex-wrap justify-content-center align-items-start flex-grow-1 gap-3">
                    
                    <div id="shelf-holder" class="d-flex flex-wrap justify-content-center gap-3 flex-grow-1" style="max-width: 50vw;">
                        <?php foreach($shelves as $shelf) {?>
                            <a href="<?= base_url('shelf/'.$shelf['name']) ?>" class="shelf-container card p-3 shadow-0">
                                <!-- <section class="shelf-name">Shelf</section> -->
                                <section class="shelf-title fs-4">
                                    <i class="fa-solid fa-bars-staggered"></i>
                                    <?=$shelf['name'];?>
                                </section>
                                <section class="shelf-body d-flex flex-column">
                                    <span><b>Records: </b> <span><?=$shelf['total'] ?? '--';?></span> </span>
                                    <span><b>Encoders:</b> <span><?=$shelf['users'] ?? '--'; ?></span></span>
                                    <span><b>Last update: </b> <span><?=$shelf['last date'] ?? '--';?></span></span>
                                </section>
                            </a>
                        <?php } ?>    
                    </div>

                    <div id="calendar-holder" class="d-flex flex-column gap-2" style="min-width: 300px;">
                        <?php if ($role === 'A') { ?>
                            <a href="#" onclick="newShelf()" class="shelf-container shelf-new card shadow-0">
                                <section class="shelf-body d-flex flex-grow-1 justify-content-center align-items-center gap-2">
                                    <i class="fa-solid fa-plus"></i>
                                    <span class="fs-4">Add Shelf</span>
                                </section>
                            </a>

                            <a href="<?= base_url('shelf/trash') ?>" class="shelf-container shelf-trash card shadow-0">
                                <!-- <section class="shelf-title fs-4">
                                    <i class="fa-regular fa-trash-can"></i>
                                    Trash bin
                                </section> -->
                                <section class="shelf-body d-flex flex-grow-1 justify-content-center align-items-center gap-2">
                                    <i class="fa-regular fa-trash-can"></i>
                                    <span class="fs-4"> Trash bin</span>
                                </section>
                                <span id="trash-count">
                                    11
                                </span>
                            </a>
                        <?php } ?>
                        <!-- jsCalendar -->
                        <div class="auto-jsCalendar"></div>
                    </div>

                </div>
            </div>
            <?php if ($role === 'A') { ?>
                <div class="tab-pane fade" id="visual-analytics" role="tabpanel" aria-labelledby="statistics-tab" tabindex="1" style="overflow-y: auto;">
                    <div class="d-flex flex-column flex-grow-1 gap-2">
                        <div class="d-flex flex-row-reverse">
                            <button class="btn btn-primary" onclick="generateReport()">Generate Report</button>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <section id="bar-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Live update of encoders</span>
                                <div id="encoded-live" style="min-width: 300px;"></div>
                            </section>
                            <section id="pie-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Overall student records</span>
                                <div id="remarks-pie" style="min-width: 300px;"></div>
                            </section>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <section id="line-graph-section" class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Monthly encoded</span>
                                <div id="encoded-monthly" style="min-width: 300px; min-height: 450px;"></div>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="manage-users" role="tabpanel" aria-labelledby="manage-tab" tabindex="2">
                </div>

                <div class="tab-pane fade" id="users-log" role="tabpanel" aria-labelledby="log-tab" tabindex="3">
                </div>

            <?php } ?>
        </div>
    </div>
</main>

<!-- amChart -->
<script src="<?= base_url('assets/third_party/amChart/amChart.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/xy.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/percent.js') ?>"></script>
<script src="<?= base_url('assets/third_party/amChart/Animated.js') ?>"></script>