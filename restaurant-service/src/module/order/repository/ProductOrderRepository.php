<?php
namespace src\module\order\repository;

use src\infrastructure\Repository;
use src\module\order\factory\ProductOrderFactory;
use src\module\order\objects\ProductOrder;
use tools\infrastructure\Collector;

class ProductOrderRepository extends Repository{
    protected ProductOrderFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProductOrderFactory();
    }
    
    public function create(ProductOrder $productOrder):void{
        $this->insert('productOrder')        
            ->column('linkId', $this->uuid($productOrder->id()))
            ->column('productId', $this->uuid($productOrder->productId()))
            ->column('orderId', $this->uuid($productOrder->orderId()))
            ->column('amount', $productOrder->price())
            ->column('note', $productOrder->note())
            ->column('hide', $productOrder->hide())
            ->column('quantity', $productOrder->quantity());
        $this->execute();
    }
    
    public function edit(ProductOrder $productOrder):void{
        $this->update('productOrder')
            ->column('productId', $this->uuid($productOrder->productId()))
            ->column('orderId', $this->uuid($productOrder->orderId()))
            ->column('amount', $productOrder->price())
            ->column('note', $productOrder->note())
            ->column('hide', $productOrder->hide())
            ->column('quantity', $productOrder->quantity())
            ->where()->eq('linkId', $this->uuid($productOrder->id()));
        $this->execute();
    }
    
    public function listProductOrder(array $where=[]):Collector{
        $this->select('productOrder')
            ->join()->inner('product', 'id', 'productOrder', 'productId');

        if(isset($where['id']) || isset($where['linkId'])){
            $this->where()->eq('linkId', $this->uuid($where['id'] ?? $where['linkId']));
        }
        if(isset($where['orderId'])){
            $this->where()->eq('orderId', $this->uuid($where['orderId']));
        }
        if(isset($where['productId'])){
            $this->where()->eq('productId', $this->uuid($where['productId']));
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