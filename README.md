# SlickLabs

## Requirements

* PHP >= 5.6
* [Composer](https://getcomposer.org/)
* [VMware](http://www.vmware.com/products/personal-desktop-virtualization.html) >= 8.0 or [VirtualBox](https://www.virtualbox.org/) >= 5.0
* [ansible](https://github.com/ansible/ansible) >= 2.0
* [vagrant](https://www.vagrantup.com/) >= 1.8
* Vagrant plugins:
  * [vagrant-hostmanager](https://github.com/smdahlen/vagrant-hostmanager)
  * [vagrant-auto_network](https://github.com/oscar-stack/vagrant-auto_network)

This environment is supported under Mac OS X >= 10.10. This stack quite possibly runs under other host operating systems, but is not regularly tested. For details on installing these dependencies on your Mac, see our [Mac setup development documentation](https://github.com/palantirnet/development_documentation/blob/master/development/mac-setup.md).

## Getting Started

1. From inside the project root, run:
 * `composer install`
 * `vagrant up`
1. You will be prompted for the administration password on your host machine. Obey.
1. SSH in and install the site:

  ```
    vagrant ssh
    cd /var/www/slicklabs.local
    vendor/bin/phing build install
  ```

1. Visit [drupal-skeleton.local](http://drupal-skeleton.local) in your browser of choice.

## How do I work on this?

1. From inside the project root, type `vagrant ssh`
1. Navigate to `/var/www/slick.local`
1. Build, install, migrate, and test: `vendor/bin/phing build install migrate test`

This is your project directory; run `composer` and `drush` commands from here, and run build tasks with `vendor/bin/phing`. 

## How do I Drupal?

### The Drupal root

This project uses [Composer Installers](https://github.com/composer/installers), [DrupalScaffold](https://github.com/drupal-composer/drupal-scaffold), and [the-build](https://github.com/palantirnet/the-build) to assemble our Drupal root in `web`. Dig into `web` to find the both contrib Drupal code (installed by composer) and custom Drupal code (included in the git repository).

### Using drush

You can run `drush` commands from anywhere within the repository, as long as you are ssh'ed into the vagrant.

### Installing and reinstalling Drupal

Run `composer install && vendor/bin/phing build install`

### Adding modules

* Download modules with composer: `composer require drupal/bad_judgement:^8.1`
* Enable the module: `drush en bad_judgement`
* Export the config with the module enabled: `drush config-export`
* Commit the changes to `composer.json`, `composer.lock`, and `conf/drupal/config/core.extension.yml`. The module code itself will be excluded by the project's `.gitignore`.

### Patching modules

Sometimes we need to apply patches from the Drupal.org issue queues. These patches should be applied using composer using the [Composer Patches](https://github.com/cweagans/composer-patches) composer plugin.

### Configuring Drupal

Sometimes it is appropriate to configure specific Drupal variables in Drupal's `settings.php` file. Our `settings.php` file is built from a template found at `conf/drupal/settings.php` during the phing build.

* Add your appropriately named values to `conf/build.default.properties` (like `drupal.my_setting=example`)
* Update `conf/drupal/settings.php` to use your new variable (like `$conf['my_setting'] = '${drupal.my_setting}';`)
* Run `vendor/bin/phing build`
* Test
* If the variable requires different values in different environments, add those to the appropriate properties files (`conf/build.vagrant.properties`, `conf/build.circle.properties`, `conf/build.acquia.properties`). Note that you may reference environment variables with `drupal.my_setting=${env.DRUPAL_MY_SETTING}`.
* Finally, commit your changes.

## How do I run tests?

### Behat

Run `vendor/bin/phing test` or `vendor/bin/behat features/installation.feature`.

## Troubleshooting

If, on browsing to `http://slicklabs.local`, you get the following error:
> slicklabs.local’s server DNS address could not be found.

Then `vagrant up` may have failed half way through. When this happens, the `vagrant-hostmanager` plugin does not add the hostname to `/etc/hosts`. Try halting and re-upping the machine: `vagrant halt && vagrant up`. Reload is not sufficient to trigger updating the hosts file.
