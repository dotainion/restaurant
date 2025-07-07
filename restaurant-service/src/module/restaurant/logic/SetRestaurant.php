<?php
namespace src\module\restaurant\logic;

use src\module\restaurant\objects\Restaurant;
use src\module\restaurant\repository\RestaurantRepository;

class SetRestaurant{
    protected RestaurantRepository $repo;

    public function __construct(){
        $this->repo = new RestaurantRepository();
    }
    
    public function set(Restaurant $restaurant):void{
        $collector = $this->repo->listRestaurants([
            'id' => $restaurant->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($restaurant);
            return;
        }
        $this->repo->edit($restaurant);
    }
}