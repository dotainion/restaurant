<?php
namespace src\module\discounts\repository;

use src\infrastructure\Repository;
use src\module\discounts\factory\DiscountFactory;
use src\module\discounts\objects\Discount;
use tools\infrastructure\Collector;

class DiscountRepository extends Repository{
    protected DiscountFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountFactory();
    }

    public function create(Discount $discount):void{
        $this->insert('discount')
            ->column('discountId', $this->uuid($discount->id()))
            ->column('title', $discount->title())
            ->column('desc', $discount->description())
            ->column('amount', $discount->amount())
            ->column('start', $discount->start())
            ->column('end', $discount->end())
            ->column('date', $discount->created())
            ->column('type', $discount->type())
            ->column('hide', $discount->hide());
        $this->execute();
    }
    
    public function edit(Discount $discount):void{
        $this->update('discount')
            ->column('title', $discount->title())
            ->column('desc', $discount->description())
            ->column('amount', $discount->amount())
            ->column('start', $discount->start())
            ->column('end', $discount->end())
            ->column('type', $discount->type())
            ->column('hide', $discount->hide())
            ->where()->eq('discountId', $this->uuid($discount->id()));
        $this->execute();
    }
    
    public function listDiscounts(array $where=[]):Collector{
        $this->select('discount');

        if(isset($where['id'])){
            $this->where()->eq('discountId', $this->uuid($where['id']));
        }
        if(isset($where['title'])){
            $this->where()->eq('title', $where['title']);
        }
        if(isset($where['type'])){
            $this->where()->eq('type', $where['type']);
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