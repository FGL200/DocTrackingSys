<main class="d-flex flex-column justify-content-center align-items-center justify-self-center" style="width: 100%;">
    <div class="card shadow-lg p-4 m-2 d-flex flex-column gap-2">
        <section>
            <h2>Login</h2>
            Sign in to get started!
        </section>
        <section class="d-flex flex-column gap-2">
            <input class="form-control" type="text" placeholder="Username">
            <input class="form-control" type="password" placeholder="Password">
        </section>
        <section class="d-flex flex-row-reverse justify-content-between">
            <button onclick="MAIN.goto('<?=base_url('home')?>')" class="btn btn-primary">Login</button>
            <!-- <button onclick="MAIN.addNotif('Account Requested!', 'New Account requested!', 'g')" class="btn btn-success">Register</button> -->
        </section>
    </div>
</main>