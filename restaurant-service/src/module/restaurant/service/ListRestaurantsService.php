<?php
namespace src\module\restaurant\service;

use src\infrastructure\Service;
use src\module\restaurant\logic\ListRestaurant;
use tools\infrastructure\Id;

class ListRestaurantsService extends Service{
    protected ListRestaurant $restaurant;

    public function __construct(){
        parent::__construct();
        $this->restaurant = new ListRestaurant();
    }
    
    public function process($userId){
        $collector = (new Id())->isValid($userId)
            ? $this->restaurant->byUserId(new Id($userId))
            : $this->restaurant->list();

        $this->setOutput($collector);
        return $this;
    }
}