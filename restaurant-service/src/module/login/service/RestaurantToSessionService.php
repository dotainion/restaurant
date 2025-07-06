<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\module\restaurant\logic\ListRestaurant;
use tools\infrastructure\Assert;

class RestaurantToSessionService extends Service{
    protected ListRestaurant $restaurant;

    public function __construct(){
        parent::__construct(false);
        $this->restaurant = new ListRestaurant();
    }
    
    public function process($restaurantId){
        Assert::validUuid($restaurantId, 'Restaurant not found.');

        $collector = $this->restaurant->byUserId($this->user()->id());
        $restaurants = $collector->filter('id', $restaurantId);
        $restaurants->assertHasItem('You are not associated to this restaurant. Please contact your administrator.');

        $this->setOutput($restaurants);
        return $this;
    }
}