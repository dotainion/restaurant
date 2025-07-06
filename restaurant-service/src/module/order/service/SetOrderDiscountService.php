<?php
namespace src\module\order\service;

use src\infrastructure\Service;
use src\module\order\factory\DiscountOrderFactory;
use src\module\order\logic\SetDiscountOrder;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;

class SetOrderDiscountService extends Service{
    protected DiscountOrderFactory $factory;
    protected SetDiscountOrder $discount;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountOrderFactory();
        $this->discount = new SetDiscountOrder();
    }
    
    public function process($id, $discountId, $productId, $orderId, $amount, $type, $note, $hide){
        Assert::validUuid($discountId, 'Invalid discount id.');
        Assert::validUuid($orderId, 'Invalid order id.');
        Assert::positiveNumber($amount, 'Must provide a valid amount.');
        Assert::stringNotEmpty($type, 'Discount type is invalid.');

        if($productId !== null){
            Assert::validUuid($productId, 'Invalid productId id.');
        }

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $discountOrder = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'discountId' => $discountId,
            'productId' => $productId,
            'orderId' => $orderId,
            'price' => $amount,
            'type' => $type,
            'note' => $note,
            'hide' => $hide
        ]);

        $this->discount->set($discountOrder);

        $this->setOutput($discountOrder);
        return $this;
    }
}