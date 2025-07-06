<?php
namespace src\module\order\logic;

use src\module\order\objects\Order;
use src\module\user\logic\ListUsers;
use tools\infrastructure\Collector;

class OrderRequirements{
    protected ListUsers $users;
    protected ListProductOrder $products;
    protected ListDiscountOrder $discounts;
    
    protected Collector $usersCollector;
    protected Collector $productsCollector;
    protected Collector $discountsCollector;

    public function __construct(){
        $this->users = new ListUsers();
        $this->products = new ListProductOrder();
        $this->discounts = new ListDiscountOrder();
    }

    public function fetchRequirements(Collector &$collector):void{
        $this->usersCollector = $this->users->usersByIdArray($collector->attrArray('createdById'));
        $this->productsCollector = $this->products->byOrderIdArray($collector->idArray());
        $this->discountsCollector = $this->discounts->byOrderIdArray($collector->idArray());
    }

    public function appendRequirements(Order &$order):Order{
        foreach($this->productsCollector->list() as $product){
            if($order->id()->toString() === $product->orderId()->toString()){
                $order->products()->add($product);
            }
        }
        foreach($this->discountsCollector->list() as $discount){
            if($order->id()->toString() === $discount->orderId()->toString()){
                $order->discounts()->add($discount);
            }
        }
        foreach($this->usersCollector->list() as $user){
            if($order->createdById()->toString() === $user->id()->toString()){
                $order->setUser($user);
                break;
            }
        }
        return $order;
    }

    public function appendToOrder(Order &$order):Order{
        $collector = new Collector();
        $collector->add($order);
        $this->fetchRequirements($collector);
        return $this->appendRequirements($order);
    }
    
    public function appendToCollector(Collector &$collector):Collector{
        $this->fetchRequirements($collector);
        foreach($collector->list() as $order){
            $this->appendRequirements($order);
        }
        return $collector;
    }
}