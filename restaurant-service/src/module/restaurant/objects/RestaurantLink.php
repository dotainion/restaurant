<?php
namespace src\module\restaurant\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;

class RestaurantLink{
    protected Id $userId;
    protected Id $restaurantId;

    public function __construct(string $userId, string $restaurantId){
        $this->userId = new Id($userId);
        $this->restaurantId = new Id($restaurantId);
    }

    public function userId():IId{
        return $this->userId;
    }

    public function restaurantId():IId{
        return $this->restaurantId;
    }
}