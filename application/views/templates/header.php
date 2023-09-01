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
    <nav class="pc flex-r">
        <a id="id-btn-home" class="flex-r p-2 g-1 align-i-center color-w" href="#"><i class="fa-solid fa-house"></i><span>Home</span></a>
        <a id="id-btn-about" class="flex-r p-2 g-1 align-i-center color-w" href="#"><i class="fa-solid fa-circle-info"></i><span>About</span></a>
        <a id="id-btn-settings" class="flex-r p-2 g-1 align-i-center color-w" href="#"><i class="fa-solid fa-gears"></i><span>Setings</span></a>
    </nav>
    <nav class="phone flex-r">
        <a id="id-btn-bar" class="flex-r p-2 g-p5 align-i-center color-w" href="#"><i class="fa-solid fa-bars"></i></a>
    </nav>
</header>
<div id="notif-holder"></div>