<?php
namespace src\module\order\service;

use src\infrastructure\Service;
use src\module\order\factory\OrderFactory;
use src\module\order\objects\OrderStatus;
use src\module\order\logic\SetOrder;
use src\module\products\factory\ProductFactory;
use src\module\order\logic\ListOrders;
use src\module\order\logic\OrderRequirements;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class SetOrderService extends Service{
    protected OrderFactory $factory;
    protected SetOrder $order;
    protected ListOrders $list;
    protected ProductFactory $productFactory;
    protected OrderRequirements $requirements;

    public function __construct(){
        parent::__construct();
        $this->factory = new OrderFactory();
        $this->order = new SetOrder();
        $this->list = new ListOrders();
        $this->productFactory = new ProductFactory();
        $this->requirements = new OrderRequirements();
    }
    
    public function process($id, $status, $createdById, $preference, $tableNumber, $note, $hide){
        Assert::validUuid($createdById, 'Creator id is invalid.');
        
        $orderId = new Id();
        $orderId->isValid($id) ? $orderId->set($id) : $orderId->new();

        $hide = (bool)$hide;

        $completedOn = null;
        $collector = $this->list->list($orderId);

        if($collector->hasItem()){
            $completedOn = $collector->first()->completedOn()->toString();
        }else if(OrderStatus::isCompleted($status)){
            $completedOn = (new DateHelper())->new()->toString();
        }

        $order = $this->factory->mapResult([
            'id' => $orderId->toString(),
            'createdById' => $createdById,
            'orderNumber' => 'ORD-'.date('Ymd').'-'.strtoupper(bin2hex(random_bytes(8))),
            'created' => (new DateHelper())->new()->toString(),
            'status' => $status,
            'completedOn' => $completedOn,
            'preference' => $preference,
            'tableNo' => $tableNumber,
            'note' => $note,
            'hide' => $hide ?? false
        ]);

        $this->order->set($order);

        $this->requirements->appendToOrder($order);

        $this->setOutput($order);
        return $this;
    }
}