<!-- page.svelte -->

<script>
    import LoginForm from '$lib/components/LoginForm.svelte';
    import RegisterForm from '$lib/components/RegisterForm.svelte';

    let showLogin = true;

    // Function to toggle between login and register forms
    /**
	 * @param {string} formType
	 */
    function toggleForm(formType) {
        showLogin = formType === 'login';
    }

    // Ensure only one form is displayed at a time
    $: showRegister = !showLogin;
</script>

<style>
    :global(body) {
        font-family: "Lato" sans-serif;
        background-color: #23394A;
        color: white;
        min-height: 100vh;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow-x: hidden;
    }

    .container {
        display: flex;
        width: 100%;
    }

    .logo {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
    }

    .form-items {
        margin-left: 60%;
        width: 80%;
        padding: 0 20px;
    }

    .form-items button {
        margin-right: 10px;
        padding: 10px 20px;
    }

    button:hover {
        cursor: pointer;
    }
</style>

<div class="container">
    <div class="logo">
        <img src="./iofrm_logo.png" alt="Logo">
    </div>

    <div class="form-items">
        <h3>Get more things done with Loggin platform.</h3>
        <p>Access to the most powerfull tool in the entire design and web industry.</p>
        
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => toggleForm('login')}>Login</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => toggleForm('register')}>Register</button>

        {#if showLogin}
            <LoginForm />
        {:else}
            <RegisterForm />
        {/if}
    </div>
</div>
