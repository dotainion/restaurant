<?php
namespace src\module\restaurant\repository;

use src\infrastructure\Repository;
use src\module\restaurant\factory\RestaurantFactory;
use src\module\restaurant\objects\Restaurant;
use tools\infrastructure\Collector;

class RestaurantRepository extends Repository{
    protected RestaurantFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new RestaurantFactory();
    }

    public function create(Restaurant $restaurant):void{
        $this->insert('restaurant')
            ->column('restaurantId', $this->uuid($restaurant->id()))
            ->column('name', $restaurant->name())
            ->column('tagline', $restaurant->tagline())
            ->column('logoRef', $restaurant->logoRef())
            ->column('isActive', $restaurant->isActive())
            ->column('phone', $restaurant->phone())
            ->column('email', $restaurant->email())
            ->column('addressId', $this->uuid($restaurant->addressId()))
            ->column('cuisine', $restaurant->cuisine())
            ->column('category', $restaurant->category())
            ->column('created', $restaurant->created())
            ->column('rating', $restaurant->rating())
            ->column('openingHours', $restaurant->openingHours())
            ->column('priceRange', $restaurant->priceRange());
        $this->execute();
    }
    
    public function edit(Restaurant $restaurant):void{
        $this->update('restaurant')
            ->column('name', $restaurant->name())
            ->column('tagline', $restaurant->tagline())
            ->column('logoRef', $restaurant->logoRef())
            ->column('isActive', $restaurant->isActive())
            ->column('phone', $restaurant->phone())
            ->column('email', $restaurant->email())
            ->column('addressId', $this->uuid($restaurant->addressId()))
            ->column('cuisine', $restaurant->cuisine())
            ->column('category', $restaurant->category())
            ->column('created', $restaurant->created())
            ->column('rating', $restaurant->rating())
            ->column('openingHours', $restaurant->openingHours())
            ->column('priceRange', $restaurant->priceRange())
            ->where()->eq('restaurantId', $this->uuid($restaurant->id()));
        $this->execute();
    }
    
    public function listRestaurants(array $where=[]):Collector{
        $this->select('restaurant')
            ->join()->left('address', 'id', 'restaurant', 'addressId');

        if(isset($where['userId'])){
            $this->join()->inner('restaurantLink', 'restaurantId', 'restaurant', 'restaurantId');
            $this->where()->eq('userId', $this->uuid($where['userId']), 'restaurantLink');
        }

        if(isset($where['id'])){
            $this->where()->eq('restaurantId', $this->uuid($where['id']));
        }
        if(isset($where['restaurantId'])){
            $this->where()->eq('restaurantId', $this->uuid($where['restaurantId']));
        }
        if(isset($where['isActive'])){
            $this->where()->eq('isActive', (int)$where['isActive']);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}