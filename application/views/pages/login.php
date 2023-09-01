<main class="flex-c flex-grow align-i-center justify-c-center">
    <div class="card shadow-lg p-4 m-2 flex-c g-2">
        <section>
            <h2>Login</h2>
        </section>
        <section class="flex-c g-2">
            <input class="form-control" type="text" placeholder="Username">
            <input class="form-control" type="password" placeholder="Password">
        </section>
        <section class="flex-r justify-c-space-between">
            <button onclick="addNotif('Account Requested!', 'New Account requested!', 'g')" class="btn btn-success">Register</button>
            <button onclick="addNotif('Login failed!', 'User not found.', 'r')" class="btn btn-primary">Login</button>
        </section>
    </div>
</main>
