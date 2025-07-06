<?php
namespace src\module\order\repository;

use src\infrastructure\Repository;
use src\module\order\factory\DiscountOrderFactory;
use src\module\order\objects\DiscountOrder;
use tools\infrastructure\Collector;

class DiscountOrderRepository extends Repository{
    protected DiscountOrderFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountOrderFactory();
    }

    public function create(DiscountOrder $discountOrder):void{
        $this->insert('discountOrder')
            ->column('linkId', $this->uuid($discountOrder->id()))
            ->column('discountId', $this->uuid($discountOrder->discountId()))
            ->column('productId', $this->uuid($discountOrder->productId()))
            ->column('orderId', $this->uuid($discountOrder->orderId()))
            ->column('price', $discountOrder->amount())
            ->column('type', $discountOrder->type())
            ->column('hide', $discountOrder->hide());
        $this->execute();
    }
    
    public function edit(DiscountOrder $discountOrder):void{
        $this->update('discountOrder')
            ->column('discountId', $this->uuid($discountOrder->discountId()))
            ->column('productId', $this->uuid($discountOrder->productId()))
            ->column('orderId', $this->uuid($discountOrder->orderId()))
            ->column('price', $discountOrder->amount())
            ->column('type', $discountOrder->type())
            ->column('hide', $discountOrder->hide())
            ->where()->eq('linkId', $this->uuid($discountOrder->id()));
        $this->execute();
    }
    
    public function listDiscountLinks(array $where=[]):Collector{
        $this->select('discountOrder')
            ->join()->inner('discount', 'discountId', 'discountOrder', 'discountId');

        if(isset($where['id'])){
            $this->where()->eq('linkId', $this->uuid($where['id']));
        }
        if(isset($where['discountId'])){
            $this->where()->eq('discountId', $this->uuid($where['discountId']));
        }
        if(isset($where['productId'])){
            $this->where()->eq('productId', $this->uuid($where['productId']));
        }
        if(isset($where['orderId'])){
            $this->where()->eq('orderId', $this->uuid($where['orderId']));
        }
        if(isset($where['hide'])){
            $this->where()->eq('hide', (int)$where['hide']);
        }else{
            $this->where()->eq('hide', 0);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}