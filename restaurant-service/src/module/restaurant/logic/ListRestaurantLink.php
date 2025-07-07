<?php
namespace src\module\restaurant\logic;

use src\module\restaurant\repository\RestaurantLinkRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListRestaurantLink{
    protected RestaurantLinkRepository $repo;

    public function __construct(){
        $this->repo = new RestaurantLinkRepository();
    }
    
    public function byUserId(Id $userId):Collector{
        return $this->repo->listRestaurantLinks([
            'userId' => $userId,
        ]);
    }
}