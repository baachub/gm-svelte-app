<!-- LoginForm.svelte -->
<script>
    import { userLogin } from "../../backend/api/user";
    import SocialLogin from "./SocialLogin.svelte";

    let email = '';
    let password = '';

    // @ts-ignore
    async function handleLogin(event) {
        event.preventDefault();

        try {
            const loginResult = await userLogin(email, password);

            console.log('Login successful!', loginResult);
            alert('Login successful!');

            email = '';
            password = '';
        } catch (error) {
            const errorMsg = 'Login failed! ' + error;
            console.error(errorMsg);
            alert(errorMsg);
        }
    }

    async function handlePasswordReset() {

    }
</script>

<style>
    input {
        margin-top: 15px;
        padding: 10px 35px;
    }

    button {
        margin-top: 15px;
        padding: 10px 35px;
    }

    button:hover {
        cursor: pointer;
    }
</style>

<form>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" name="email" placeholder="E-mail Address" bind:value={email} required />
    <br />
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" placeholder="Password" bind:value={password} required />
    <br />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" on:click={() => handleLogin(event)}>Login</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" on:click={() => handlePasswordReset()}>Forgot password?</button>
    <br />
    <SocialLogin socialFormType="login" />
</form>