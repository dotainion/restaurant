<?php
namespace src\module\restaurant\logic;

use src\module\restaurant\repository\RestaurantRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListRestaurant{
    protected RestaurantRepository $repo;

    public function __construct(){
        $this->repo = new RestaurantRepository();
    }
    
    public function byId(Id $id):Collector{
        return $this->repo->listRestaurants([
            'id' => $id
        ]);
    }
    
    public function byUserId(Id $userId):Collector{
        return $this->repo->listRestaurants([
            'userId' => $userId
        ]);
    }
    
    public function list():Collector{
        return $this->repo->listRestaurants();
    }
}