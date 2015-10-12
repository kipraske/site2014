<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'kristog4_krwp');

/** MySQL database username */
define('DB_USER', 'kristog4_kip');

/** MySQL database password */
define('DB_PASSWORD', 'cicada86KR');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<1fsXCz$1bn 5P>:W[7_uC6L0&]|##HuqBIN`EVg)%=H-ADh9=D.#N Sc;|w:pdX');
define('SECURE_AUTH_KEY',  'YnS:6bl[fUm${_Y54dTP36$8ZZ4`pXlctN:mfkkK~nf_JUp8Wd%AWHvmR]jSvu2z');
define('LOGGED_IN_KEY',    'A[nl{+|qV*tPW2^KAQq8NAdfDb(R?q)@;)({1D%4By#b0=q`6SfUwy8+xkFxqOj;');
define('NONCE_KEY',        'o(`q)l;SG);(t&U-gx+e78xiq.g1kjtzp s;&^EDr$s-zwqHNv.9jH0qgcos2)4}');
define('AUTH_SALT',        'RVQ<^i0hrzY8@R%99ePiYs K%+O&1D7_V:lqQU42oAl9<LJ|qu^BeBgZu2.|l!I>');
define('SECURE_AUTH_SALT', '@$>vwwNKm]wII).a2|O=A9ys 2+{h+B<M~~7(H%xo-80-ir=zB6HX7_H@,QK%)$c');
define('LOGGED_IN_SALT',   'tqZ`(@w/yv{%*9X( V=]H=Wk8_vO4uln2O~P+BD1S!0n,$tf@-(s)+@ZUI(#C ds');
define('NONCE_SALT',       '}RID@o&Msde*E,EA$;|JD>w>HGAt!E*b=C>X$=qr[g363i9(^wU</k:K4fo$cu8V');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
