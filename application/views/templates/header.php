<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=isset($title) ? $title : "DOCUMENT"; ?></title>

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="<?=base_url('assets/third_party/bootstrap/css/bootstrap')?>.css">

    <!-- DATATABLES -->
    <link rel="stylesheet" href="<?=base_url('assets/third_party/datatables/datatables.min')?>.css">

    <!-- FONTAWESOME -->
    <link rel="stylesheet" href="<?=base_url('assets/third_party/fontawesome/css/all.min')?>.css">

    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="<?=base_url('assets/css/main')?>.css">
    <link rel="stylesheet" href="<?=base_url('assets/css/header')?>.css">
    <link rel="stylesheet" href="<?=base_url('assets/css/footer')?>.css">

    <?php if(isset($css)) foreach($css as $c) {?>
    <link rel="stylesheet" href="<?=base_url("assets/css/$c")?>.css">
    <?php }?>
    
    <!-- JQUERY -->
    <script src="<?=base_url('assets/third_party/jquery/jquery.min')?>.js"></script>

    <!-- CUSTOM JS -->
    <?php if(isset($js)) foreach($js as $j) {?>
    <script src="<?=base_url("assets/js/$j")?>.js" defer></script>
    <?php }?>

</head>
<body class="flex-c justify-c-space-between b-color-w">
<header class="flex-r justify-c-space-around align-i-center p-1 g-2">
    <a href="<?=base_url()?>" class="flex-r g-1 align-i-center p-1">
        <img src="<?=base_url('assets/images/rtu-logo')?>.png" alt="logo" width="45" height="45">
        <section class="pc sys-title color-w">
            SRAC Document Tracker
        </section>
        <section class="phone sys-title color-w">
            Tracker
        </section>
    </a>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid" style="outline: none;">
            <button class="navbar-toggler color-w" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav g-1">
                <li class="nav-item">
                    <a class="nav-link active color-w" aria-current="page" href="#">
                        <i class="fa-solid fa-house"></i>
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link color-w" href="#">
                        <i class="fa-solid fa-circle-info"></i>
                        About
                    </a>
                </li>
                <li class="nav-item dropdown <?=isset($hide_acc) && $hide_acc === false ? "" : "hide";?>">
                    <a class="nav-link dropdown-toggle color-w" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-user"></i>
                        Account
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li style="margin-bottom: .4rem;">
                            <a class="dropdown-item" href="#" style="border-bottom: 1px solid rgba(0, 0, 0, 0.3);">
                                <i class="fa-solid fa-address-card"></i>
                                Profile
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="fa-solid fa-gears"></i>
                                Settings
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    <!-- <nav class="pc">
        <section class="phone color-w font-l text-b" style="border-bottom: 1px solid white;">Navigator</section>
        <button id="id-btn-home" class="flex-r p-2 g-1 align-i-center color-w" onclick="closeNav()"><i class="fa-solid fa-house"></i><span>Home</span></button>
        <button id="id-btn-about" class="flex-r p-2 g-1 align-i-center color-w" onclick="closeNav()"><i class="fa-solid fa-circle-info"></i><span>About</span></button>
        <button id="id-btn-settings" class="flex-r p-2 g-1 align-i-center color-w" onclick="closeNav()"><i class="fa-solid fa-gears"></i><span>Setings</span></button>
    </nav>
    <nav class="phone flex-r">
        <button id="id-btn-bar" class="flex-r p-2 g-p5 align-i-center color-w" onclick="openNav()"><i class="fa-solid fa-bars"></i></button>
    </nav> -->
</header>
<div id="notif-holder"></div>


<div id="root" class="flex-grow"> <!-- start of root -->