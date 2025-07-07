<?php
namespace src\module\restaurant\service;

use src\infrastructure\Service;
use src\module\restaurant\factory\RestaurantFactory;
use src\module\restaurant\logic\SetRestaurant;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class SetRestaurantService extends Service{
    protected RestaurantFactory $factory;
    protected SetRestaurant $restaurant;

    public function __construct(bool $authCheck=true){
        parent::__construct($authCheck);
        $this->factory = new RestaurantFactory();
        $this->restaurant = new SetRestaurant();
    }
    
    public function process(
        $id,
        $name,
        $tagline,
        $logoRef,
        $isActive,
        $phone,
        $email,
        $addressId,
        $cuisine,
        $category,
        $rating,
        $openingHours,
        $priceRange
    ){
        Assert::validEmail($email, 'Invalid email address.');
        if($addressId !== null){
            Assert::validUuid($addressId, 'Address id is invalid.');
        }
        
        $restaurantId = new Id();
        $restaurantId->isValid($id) ? $restaurantId->set($id) : $restaurantId->new();

        $restaurant = $this->factory->mapResult([
            'restaurantId' => $restaurantId->toString(),
            'name' => $name,
            'tagline' => $tagline,
            'logoRef' => $logoRef,
            'isActive' => $isActive,
            'phone' => $phone,
            'email' => $email,
            'addressId' => $addressId,
            'cuisine' => $cuisine,
            'category' => $category,
            'created' => (new DateHelper())->new()->toString(),
            'rating' => $rating,
            'openingHours' => $openingHours,
            'priceRange' => $priceRange
        ]);

        $this->restaurant->set($restaurant);

        $this->setOutput($restaurant);
        return $this;
    }
}