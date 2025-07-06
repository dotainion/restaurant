<?php
namespace src\module\order\repository;

use src\infrastructure\Repository;
use src\module\order\factory\OrderFactory;
use src\module\order\objects\Order;
use tools\infrastructure\Collector;

class OrderRepository extends Repository{
    protected OrderFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OrderFactory();
    }
    
    public function create(Order $order):void{
        $this->insert('order')        
            ->column('id', $this->uuid($order->id()))
            ->column('orderNumber', $order->orderNumber())
            ->column('createdById', $this->uuid($order->createdById()))  
            ->column('created', $order->created())
            ->column('completedOn', $order->completedOn())
            ->column('preference', $order->preference())
            ->column('tableNo', $order->tableNumber())
            ->column('note', $order->note())
            ->column('hide', $order->hide())
            ->column('status', $order->status());
        $this->execute();
    }
    
    public function edit(Order $order):void{
        $this->update('order')   
            ->column('completedOn', $order->completedOn())
            ->column('status', $order->status())
            ->column('preference', $order->preference())
            ->column('tableNo', $order->tableNumber())
            ->column('note', $order->note())
            ->column('hide', $order->hide())
            ->where()->eq('id', $this->uuid($order->id()));
        $this->execute();
    }
    
    public function listOrders(array $where=[]):Collector{
        $this->select('order');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['createdById'])){
            $this->where()->eq('createdById', $this->uuid($where['createdById']));
        }
        if(isset($where['status'])){
            $this->where()->eq('status', $where['status']);
        }
        if(isset($where['tableNumber'])){
            $this->where()->eq('tableNo', $where['tableNumber']);
        }
        if(isset($where['orderNumber'])){
            $this->where()->eq('orderNumber', $where['orderNumber']);
        }
        if(isset($where['preference'])){
            $this->where()->eq('preference', $where['preference']);
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('created', $where['from'], $where['to']);
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