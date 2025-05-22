
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
	export const VIMRUNTIME: string;
	export const SHELL: string;
	export const MASON: string;
	export const QT_ACCESSIBILITY: string;
	export const XDG_DATA_DIRS: string;
	export const VIM: string;
	export const SSH_AUTH_SOCK: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const USER: string;
	export const INVOCATION_ID: string;
	export const LC_NUMERIC: string;
	export const MANAGERPID: string;
	export const GTK_MODULES: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const IM_CONFIG_PHASE: string;
	export const MUTTER_DEBUG_KMS_THREAD_TYPE: string;
	export const SESSION_MANAGER: string;
	export const LC_ADDRESS: string;
	export const VTE_VERSION: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const USERNAME: string;
	export const XDG_CONFIG_DIRS: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const LC_NAME: string;
	export const XDG_SESSION_CLASS: string;
	export const XMODIFIERS: string;
	export const LOGNAME: string;
	export const OBSIDIAN_REST_API_KEY: string;
	export const SYSTEMD_EXEC_PID: string;
	export const XDG_RUNTIME_DIR: string;
	export const TERM_PROGRAM: string;
	export const LC_TIME: string;
	export const SHLVL: string;
	export const DEFAULTS_PATH: string;
	export const TMUX: string;
	export const XDG_SESSION_TYPE: string;
	export const JOURNAL_STREAM: string;
	export const LANG: string;
	export const MANDATORY_PATH: string;
	export const NVIM: string;
	export const HOME: string;
	export const GDMSESSION: string;
	export const XAUTHORITY: string;
	export const TMUX_PLUGIN_MANAGER_PATH: string;
	export const GPG_AGENT_INFO: string;
	export const QTWEBENGINE_DICTIONARIES_PATH: string;
	export const LC_MONETARY: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_PAPER: string;
	export const MYVIMRC: string;
	export const COLORTERM: string;
	export const NVIM_LOG_FILE: string;
	export const XDG_SESSION_DESKTOP: string;
	export const DEBUGINFOD_URLS: string;
	export const LC_MEASUREMENT: string;
	export const DESKTOP_SESSION: string;
	export const WINDOWPATH: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const DISPLAY: string;
	export const PWD: string;
	export const TERM_PROGRAM_VERSION: string;
	export const BLACKBOX_THEMES_DIR: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const QT_IM_MODULE: string;
	export const XDG_MENU_PREFIX: string;
	export const GSM_SKIP_SSH_AGENT_WORKAROUND: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const GNOME_KEYRING_CONTROL: string;
	export const PATH: string;
	export const TMUX_PANE: string;
	export const LC_TELEPHONE: string;
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
		VIMRUNTIME: string;
		SHELL: string;
		MASON: string;
		QT_ACCESSIBILITY: string;
		XDG_DATA_DIRS: string;
		VIM: string;
		SSH_AUTH_SOCK: string;
		MEMORY_PRESSURE_WRITE: string;
		USER: string;
		INVOCATION_ID: string;
		LC_NUMERIC: string;
		MANAGERPID: string;
		GTK_MODULES: string;
		GNOME_SHELL_SESSION_MODE: string;
		IM_CONFIG_PHASE: string;
		MUTTER_DEBUG_KMS_THREAD_TYPE: string;
		SESSION_MANAGER: string;
		LC_ADDRESS: string;
		VTE_VERSION: string;
		GNOME_DESKTOP_SESSION_ID: string;
		USERNAME: string;
		XDG_CONFIG_DIRS: string;
		MEMORY_PRESSURE_WATCH: string;
		LC_NAME: string;
		XDG_SESSION_CLASS: string;
		XMODIFIERS: string;
		LOGNAME: string;
		OBSIDIAN_REST_API_KEY: string;
		SYSTEMD_EXEC_PID: string;
		XDG_RUNTIME_DIR: string;
		TERM_PROGRAM: string;
		LC_TIME: string;
		SHLVL: string;
		DEFAULTS_PATH: string;
		TMUX: string;
		XDG_SESSION_TYPE: string;
		JOURNAL_STREAM: string;
		LANG: string;
		MANDATORY_PATH: string;
		NVIM: string;
		HOME: string;
		GDMSESSION: string;
		XAUTHORITY: string;
		TMUX_PLUGIN_MANAGER_PATH: string;
		GPG_AGENT_INFO: string;
		QTWEBENGINE_DICTIONARIES_PATH: string;
		LC_MONETARY: string;
		XDG_CURRENT_DESKTOP: string;
		LC_PAPER: string;
		MYVIMRC: string;
		COLORTERM: string;
		NVIM_LOG_FILE: string;
		XDG_SESSION_DESKTOP: string;
		DEBUGINFOD_URLS: string;
		LC_MEASUREMENT: string;
		DESKTOP_SESSION: string;
		WINDOWPATH: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		DISPLAY: string;
		PWD: string;
		TERM_PROGRAM_VERSION: string;
		BLACKBOX_THEMES_DIR: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		QT_IM_MODULE: string;
		XDG_MENU_PREFIX: string;
		GSM_SKIP_SSH_AGENT_WORKAROUND: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		GNOME_KEYRING_CONTROL: string;
		PATH: string;
		TMUX_PANE: string;
		LC_TELEPHONE: string;
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
