<main class="d-flex">
    <div id="dashBoard" class="card p-3 m-3 flex-grow-1 gap-2">
        <div class="d-flex justify-content-between">
            <span class="fs-2">Dashboard</span>
            <?php if ($role === 'A') { ?>
                <span class="d-flex justify-content-end flex-wrap gap-2">

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#shelf" type="button" role="tab" aria-selected="true">
                                <i class="fa-solid fa-lines-leaning"></i> Shelves
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#visual-analytics" type="button" role="tab" aria-selected="false">
                                <i class="fa-solid fa-chart-line"></i> Statistics
                            </button>
                        </li>
                    </ul>

                    <button class="btn btn-outline-primary" onclick="MAIN.goto('manage')"><i class="fa-solid fa-users"></i> Manage Users</button>
                </span>
            <?php } ?>
        </div>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="shelf" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <div class="d-flex flex-wrap flex-grow-1 gap-3">
                    <!-- jsCalendar -->
                    <div class="auto-jsCalendar shadow-0 card align-self-start"></div>

                    <div id="shelf-holder" class="d-flex flex-wrap align-items-start gap-3">
                        <a href="<?= base_url('home') ?>" class="shelf-container card p-3 shadow-0">
                            <!-- <section class="shelf-name">Shelf</section> -->
                            <section class="shelf-title fs-4">2020-2021</section>
                            <section class="shelf-body d-flex flex-column">
                                <span><b>Records: </b> 1006 </span>
                                <span><b>Encoders:</b> 11</span>
                                <span><b>Last update: </b> 10/20/2023</span>
                            </section>
                        </a>


                        <?php if ($role === 'A') { ?>
                            <a href="#" onclick="newShelf()" class="shelf-container-new card p-3 shadow-0">
                                <section class="shelf-body d-flex flex-grow-1 justify-content-center align-items-center gap-2">
                                    <i class="fa-solid fa-plus"></i>
                                    <span class="fs-4">Add New</span>
                                </section>
                            </a>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <?php if ($role === 'A') { ?>
                <div class="tab-pane fade" id="visual-analytics" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <div class="d-flex flex-column flex-grow-1 gap-2">
                        <div class="d-flex flex-wrap gap-2">
                            <section class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Live update of encoders</span>
                                <div id="encoded-live" style="min-width: 300px;"></div>
                            </section>
                            <section class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Overall student records</span>
                                <div id="remarks-pie" style="min-width: 300px;"></div>
                            </section>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <section class="chart-container flex-grow-1 card shadow f-flex flex-column p-3">
                                <span class="chart-title fw-bold">Monthly encoded</span>
                                <div id="encoded-monthly" style="min-width: 300px; min-height: 450px;"></div>
                            </section>
                        </div>
                    </div>
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