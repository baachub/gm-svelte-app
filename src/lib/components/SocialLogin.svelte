<!-- SocialLogin.svelte -->
<script>
    /**
	 * @type {string}
	 */
     export let socialFormType;
</script>

<style>
    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>

<div>
    <span>Or {socialFormType === 'login' ? 'login' : 'register'} with</span>
    <a href="https://www.facebook.com" target="_blank">Facebook</a>
    <a href="https://www.google.com" target="_blank">Google</a>
    <a href="https://www.linkedin.com" target="_blank">Linkedin</a>
</div>