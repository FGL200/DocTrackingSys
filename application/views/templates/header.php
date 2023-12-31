<?php $hidden = (isset($hide_nav)) ? (($hide_nav) ? true : false ) : false;?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=isset($title) ? $title : "DOCUMENT"; ?></title>

    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="<?=base_url('assets/third_party/bootstrap/css/bootstrap.min')?>.css">

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
<body class="d-flex flex-column justify-content-between">
<!-- START OF HTML -->
<header class="d-flex flex-row justify-content-around align-items-center p-1 gap-2">
    <a href="<?=base_url()?>" class="d-flex flex-row gap-1 align-items-center p-1">
        <img src="<?=base_url('assets/images/rtu-logo')?>.png" alt="logo" width="45" height="45">
        <section class="pc sys-title color-w">
            SRAC Document Tracker
        </section>
        <section class="phone sys-title color-w">
            Tracker
        </section>
    </a>
    <?php if(!$hidden){?>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid" style="outline: none;">
            <button class="navbar-toggler color-w" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav gap-1">
                    <li class="nav-item">
                        <a class="nav-link active color-w" aria-current="page" href="./home">
                            <i class="fa-solid fa-house"></i>
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link color-w" href="#" onclick="ABOUT.open()">
                            <i class="fa-solid fa-circle-info"></i>
                            About
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle color-w" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user"></i>
                            Account
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li style="margin-bottom: .4rem;">
                                <a class="dropdown-item" href="#" onclick="PROFILE.open(new Profile())" style="border-bottom: 1px solid rgba(0, 0, 0, 0.3);">
                                    <i class="fa-solid fa-address-card"></i> Profile
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="<?=base_url()?>">
                                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <?php }?>
</header>
<div id="notif-holder"></div>

<!-- START OF ROOT -->
<div id="root" class="d-flex flex-grow-1"> 