<?php
namespace src\module\restaurant\logic;

use src\module\restaurant\objects\RestaurantLink;
use src\module\restaurant\repository\RestaurantLinkRepository;

class SetRestaurantLink{
    protected RestaurantLinkRepository $repo;

    public function __construct(){
        $this->repo = new RestaurantLinkRepository();
    }
    
    public function set(RestaurantLink $link):void{
        $collector = $this->repo->listRestaurantLinks([
            'userId' => $link->userId(),
            'restaurantId' => $link->restaurantId()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($link);
            return;
        }
        $this->repo->edit($link);
    }
}