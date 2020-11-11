<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit125d1bedc97c0cb80f52718ed8014890
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Metatavu\\LinkedEvents\\' => 22,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Metatavu\\LinkedEvents\\' => 
        array (
            0 => __DIR__ . '/..' . '/metatavu/linkedevents-php-client/lib',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit125d1bedc97c0cb80f52718ed8014890::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit125d1bedc97c0cb80f52718ed8014890::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit125d1bedc97c0cb80f52718ed8014890::$classMap;

        }, null, ClassLoader::class);
    }
}
