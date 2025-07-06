<?php
namespace src\module\order\objects;

use tools\infrastructure\Assert;

class DiscountType{
    const Percentage = 'PERCENTAGE';
    const fixedPrice = 'FIXED_PRICE';

    public static function isValid($type):bool{
        return in_array($type, self::statuses());
    }

    public static function assertIsValid($type):void{
        Assert::inArray($type, self::statuses(), 'Invalid discount type.');
    }
    
    public static function statuses():array{
        return [self::Percentage, self::fixedPrice];
    }
}