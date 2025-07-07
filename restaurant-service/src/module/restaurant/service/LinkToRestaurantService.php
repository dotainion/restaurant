<?php
namespace src\module\restaurant\service;

use src\infrastructure\Service;
use src\module\restaurant\factory\RestaurantLinkFactory;
use src\module\restaurant\logic\ListRestaurant;
use src\module\restaurant\logic\SetRestaurantLink;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;

class LinkToRestaurantService extends Service{
    protected RestaurantLinkFactory $factory;
    protected SetRestaurantLink $link;
    protected ListRestaurant $restaurant;

    public function __construct(bool $authCheck=true){
        parent::__construct($authCheck);
        $this->factory = new RestaurantLinkFactory();
        $this->link = new SetRestaurantLink();
        $this->restaurant = new ListRestaurant();
    }
    
    public function process($userId, $restaurantId){
        Assert::validUuid($userId, 'user not found.');
        Assert::validUuid($restaurantId, 'Restaurant not found.');

        $collector = $this->restaurant->byId(new Id($restaurantId));
        $collector->assertHasItem('Restaurant not found.');

        $link = $this->factory->mapResult([
            'userId' => $userId,
            'restaurantId' => $restaurantId
        ]);

        $this->link->set($link);

        $this->setOutput($collector);
        return $this;
    }
}