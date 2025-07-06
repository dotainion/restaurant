<?php
namespace src\module\order\objects;

use tools\infrastructure\Assert;

class OrderStatus{
    const Paid = 'paid';
    const Hold = 'hold';
    const Ready = 'ready';
    const Refund = 'refund';
    const Pending = 'pending';
    const Kitchen = 'kitchen';
    const Canceled = 'canceled';
    const Preparing = 'preparing';

    public static function isValid($status):bool{
        return in_array($status, self::statuses());
    }

    public static function assertIsValid($status, string $message='Invalid status.'):void{
        Assert::inArray($status, self::statuses(), $message);
    }

    public static function isCompleted($status):bool{
        return in_array($status, [self::Paid, self::Canceled, self::Refund]);
    }
    
    public static function statuses():array{
        return [self::Paid, self::Hold, self::Ready, self::Refund, self::Pending, self::Kitchen, self::Canceled, self::Preparing];
    }
}