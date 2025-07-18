
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LC_MEASUREMENT: string;
	export const PWD: string;
	export const LC_ADDRESS: string;
	export const BLACKBOX_THEMES_DIR: string;
	export const QT_IM_MODULE: string;
	export const GNOME_KEYRING_CONTROL: string;
	export const LC_TELEPHONE: string;
	export const GSM_SKIP_SSH_AGENT_WORKAROUND: string;
	export const LOGNAME: string;
	export const TMUX_PANE: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const XDG_RUNTIME_DIR: string;
	export const TERM_PROGRAM: string;
	export const LC_TIME: string;
	export const SHLVL: string;
	export const DEFAULTS_PATH: string;
	export const TMUX: string;
	export const XDG_SESSION_TYPE: string;
	export const JOURNAL_STREAM: string;
	export const OPENAI_API_KEY: string;
	export const LANG: string;
	export const MANDATORY_PATH: string;
	export const HOME: string;
	export const GDMSESSION: string;
	export const XAUTHORITY: string;
	export const TMUX_PLUGIN_MANAGER_PATH: string;
	export const GPG_AGENT_INFO: string;
	export const LC_MONETARY: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const PATH: string;
	export const NVIM_LOG_FILE: string;
	export const DEBUGINFOD_URLS: string;
	export const DESKTOP_SESSION: string;
	export const VIMRUNTIME: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const DISPLAY: string;
	export const TERM_PROGRAM_VERSION: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const SHELL: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const MASON: string;
	export const VIM: string;
	export const SSH_AUTH_SOCK: string;
	export const USER: string;
	export const XDG_MENU_PREFIX: string;
	export const LC_NUMERIC: string;
	export const GTK_MODULES: string;
	export const NVIM: string;
	export const MUTTER_DEBUG_KMS_THREAD_TYPE: string;
	export const SESSION_MANAGER: string;
	export const VTE_VERSION: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const COLORTERM: string;
	export const USERNAME: string;
	export const XDG_CONFIG_DIRS: string;
	export const LC_NAME: string;
	export const XDG_SESSION_CLASS: string;
	export const XMODIFIERS: string;
	export const IM_CONFIG_PHASE: string;
	export const SYSTEMD_EXEC_PID: string;
	export const QT_ACCESSIBILITY: string;
	export const XDG_DATA_DIRS: string;
	export const QTWEBENGINE_DICTIONARIES_PATH: string;
	export const LC_PAPER: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const INVOCATION_ID: string;
	export const WINDOWPATH: string;
	export const XDG_SESSION_DESKTOP: string;
	export const MANAGERPID: string;
	export const MYVIMRC: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const OBSIDIAN_REST_API_KEY: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_API_IP: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LC_MEASUREMENT: string;
		PWD: string;
		LC_ADDRESS: string;
		BLACKBOX_THEMES_DIR: string;
		QT_IM_MODULE: string;
		GNOME_KEYRING_CONTROL: string;
		LC_TELEPHONE: string;
		GSM_SKIP_SSH_AGENT_WORKAROUND: string;
		LOGNAME: string;
		TMUX_PANE: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		XDG_RUNTIME_DIR: string;
		TERM_PROGRAM: string;
		LC_TIME: string;
		SHLVL: string;
		DEFAULTS_PATH: string;
		TMUX: string;
		XDG_SESSION_TYPE: string;
		JOURNAL_STREAM: string;
		OPENAI_API_KEY: string;
		LANG: string;
		MANDATORY_PATH: string;
		HOME: string;
		GDMSESSION: string;
		XAUTHORITY: string;
		TMUX_PLUGIN_MANAGER_PATH: string;
		GPG_AGENT_INFO: string;
		LC_MONETARY: string;
		XDG_CURRENT_DESKTOP: string;
		PATH: string;
		NVIM_LOG_FILE: string;
		DEBUGINFOD_URLS: string;
		DESKTOP_SESSION: string;
		VIMRUNTIME: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		DISPLAY: string;
		TERM_PROGRAM_VERSION: string;
		MEMORY_PRESSURE_WATCH: string;
		SHELL: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		MASON: string;
		VIM: string;
		SSH_AUTH_SOCK: string;
		USER: string;
		XDG_MENU_PREFIX: string;
		LC_NUMERIC: string;
		GTK_MODULES: string;
		NVIM: string;
		MUTTER_DEBUG_KMS_THREAD_TYPE: string;
		SESSION_MANAGER: string;
		VTE_VERSION: string;
		GNOME_DESKTOP_SESSION_ID: string;
		COLORTERM: string;
		USERNAME: string;
		XDG_CONFIG_DIRS: string;
		LC_NAME: string;
		XDG_SESSION_CLASS: string;
		XMODIFIERS: string;
		IM_CONFIG_PHASE: string;
		SYSTEMD_EXEC_PID: string;
		QT_ACCESSIBILITY: string;
		XDG_DATA_DIRS: string;
		QTWEBENGINE_DICTIONARIES_PATH: string;
		LC_PAPER: string;
		MEMORY_PRESSURE_WRITE: string;
		INVOCATION_ID: string;
		WINDOWPATH: string;
		XDG_SESSION_DESKTOP: string;
		MANAGERPID: string;
		MYVIMRC: string;
		GNOME_SHELL_SESSION_MODE: string;
		OBSIDIAN_REST_API_KEY: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_API_IP: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
