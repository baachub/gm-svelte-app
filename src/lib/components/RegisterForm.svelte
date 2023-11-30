<!-- RegisterForm.svelte -->
<script>
    import { registerUser } from "../../backend/api/user";
    import SocialLogin from "./SocialLogin.svelte";

    let name = '';
    let email = '';
    let password = '';

    // @ts-ignore
    async function handleSubmit(event) {    
        event.preventDefault();

        try {
            const registrationResult = await registerUser(email, name, password);

            console.log('Registration successful!', registrationResult);
            alert('Registration successful!');

            name = '';
            email = '';
            password = '';
        } catch (error) {
            const errorMsg = 'Registration failed! ' + error;
            console.error(errorMsg);
            alert(errorMsg);
        }
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

<form on:submit={handleSubmit}>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" name="name" placeholder="Full Name" bind:value={name} required />
    <br />
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" name="email" placeholder="E-mail Address" bind:value={email} required />
    <br />
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" placeholder="Password" bind:value={password} required />
    <br />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
    <br />
    <SocialLogin socialFormType="register" />
</form>