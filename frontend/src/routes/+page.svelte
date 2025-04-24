<script lang="ts">
	const msg: string = 'hello';
</script>

<nav>
	<div id="nav-outer-container">
		<div id="name-item">
			<span>Yiorgos Panagiotopoulos</span>
		</div>
		<div id="links">
			<span class="nav-link"><a href="./fourier">links</a></span>
			<span class="link-sep">/</span>
			<span class="nav-link"><a href="./fourier">playground</a></span>
			<span class="link-sep">/</span>
			<span class="nav-link"><a href="./fourier">cv</a></span>
		</div>
	</div>
</nav>

<p>{msg}</p>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');

	* {
		font-family: "Newsreader", serif;
	}

	#nav-outer-container {
		display: flex;
		justify-content: left;
		align-items: center;
		width: 70%;
		height: 5rem;

		margin-top: 3em;
		margin-left: auto;
		margin-right: auto;

		padding-right: 2rem;
		padding-left: 2rem;

		border: 2px solid rgba(0,0,0, 0.5);
		border-radius: 1em;
	}

	#name-item {
		flex: 1;
		display: flex;
		justify-content: left;
		font-size: 3rem;
		padding-top:0.3rem;
	}

	#links {
		display: flex;
		justify-content:center;
		align-items:center;
	}

	.nav-link {
		font-size: 1.5rem;
	}
	
	.link-sep{
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		font-size: 2rem;
		opacity: 0.2;
	}

	.nav-link > a {
		padding:1rem;
		padding-top:0.5rem;
		padding-bottom:0.3rem;

		border:1px solid rgba(0,0,0,0);
		color: black;
		text-decoration: none;
	}


	a:hover{
		border: 1px solid red;
		border-radius: 5px;
		transition:border 1s;
	 }




</style>
