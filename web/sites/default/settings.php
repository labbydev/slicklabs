<?php

$databases = array();
$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => 'drupal',
  'username' => 'root',
  'password' => 'root',
  'host' => '127.0.0.1',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

$config_directories = array();
$config_directories[CONFIG_SYNC_DIRECTORY] = '../conf/drupal/config';

$settings['hash_salt'] = '38e772daf7af91b34af12d381937f9256b4be644be1e4bc511f92ab93e403f2d';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.yml';

$settings['install_profile'] = 'config_installer';

$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = 'sites/default/private';

$config['system.logging']['error_level'] = 'all';