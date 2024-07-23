<?php

use StoutLogic\AcfBuilder\FieldsBuilder;

$globalSettings = new FieldsBuilder('global_settings');

$globalSettings
	->addTab('header')

	->addTab('footer')

	->setLocation('options_page', '==', 'global-settings');

return $globalSettings;
