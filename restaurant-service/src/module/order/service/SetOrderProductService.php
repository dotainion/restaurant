<?php
namespace src\module\order\service;

use src\infrastructure\Service;
use src\module\order\factory\ProductOrderFactory;
use src\module\order\logic\SetProductOrder;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;

class SetOrderProductService extends Service{
    protected ProductOrderFactory $factory;
    protected SetProductOrder $order;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProductOrderFactory();
        $this->order = new SetProductOrder();
    }
    
    public function process($id, $orderId, $productId, $price, $note, $quantity, $hide){
        Assert::validUuid($orderId, 'Invalid order id.');
        Assert::validUuid($productId, 'Invalid product id.');
        Assert::positiveNumber($price, 'Must provide a valid price.');
        Assert::positiveNumber($quantity, 'Must provide a valid quantity.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $productOrder = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'productId' => $productId,
            'orderId' => $orderId,
            'amount' => $price,
            'note' => $note,
            'quantity' => $quantity,
            'hide' => $hide
        ]);

        $this->order->set($productOrder);

        $this->setOutput($productOrder);
        return $this;
    }
}