<?php
namespace src\module\restaurant\repository;

use src\infrastructure\Repository;
use src\module\restaurant\factory\RestaurantLinkFactory;
use src\module\restaurant\objects\RestaurantLink;
use tools\infrastructure\Collector;

class RestaurantLinkRepository extends Repository{
    protected RestaurantLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new RestaurantLinkFactory();
    }

    public function create(RestaurantLink $link):void{
        $this->insert('restaurantLink')
            ->column('userId', $this->uuid($link->userId()))
            ->column('restaurantId', $this->uuid($link->restaurantId()));
        $this->execute();
    }
    
    public function edit(RestaurantLink $link):void{
        $this->update('restaurantLink')
            ->where()->eq('userId', $this->uuid($link->userId()))
            ->eq('restaurantId', $this->uuid($link->restaurantId()));
        $this->execute();
    }
    
    public function listRestaurantLinks(array $where=[]):Collector{
        $this->select('restaurantLink');

        if(isset($where['userId'])){
            $this->where()->eq('userId', $this->uuid($where['userId']));
        }
        if(isset($where['restaurantId'])){
            $this->where()->eq('restaurantId', $this->uuid($where['restaurantId']));
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}