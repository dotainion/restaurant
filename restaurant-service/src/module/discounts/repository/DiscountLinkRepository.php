<?php
namespace src\module\discounts\repository;

use src\infrastructure\Repository;
use src\module\discounts\factory\DiscountLinkFactory;
use src\module\discounts\objects\DiscountLink;
use tools\infrastructure\Collector;

class DiscountLinkRepository extends Repository{
    protected DiscountLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountLinkFactory();
    }

    public function create(DiscountLink $discountLink):void{
        $this->insert('discountLink')
            ->column('discountId', $this->uuid($discountLink->discountId()))
            ->column('productId', $this->uuid($discountLink->productId()));
        $this->execute();
    }
    
    public function remove(DiscountLink $discountLink):void{
        $this->delete('discountLink')
            ->where()->eq('discountId', $this->uuid($discountLink->discountId()))
            ->eq('productId', $this->uuid($discountLink->productId()));
        $this->execute();
    }
    
    public function listDiscountLinks(array $where=[]):Collector{
        $this->select('discountLink');

        if(isset($where['discountId'])){
            $this->where()->eq('discountId', $this->uuid($where['discountId']));
        }
        if(isset($where['productId'])){
            $this->where()->eq('productId', $this->uuid($where['productId']));
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}