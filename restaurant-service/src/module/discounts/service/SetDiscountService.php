<?php
namespace src\module\discounts\service;

use src\infrastructure\Service;
use src\module\discounts\factory\DiscountFactory;
use src\module\discounts\logic\SetDiscount;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class SetDiscountService extends Service{
    protected DiscountFactory $factory;
    protected SetDiscount $discount;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountFactory();
        $this->discount = new SetDiscount();
    }
    
    public function process($id, $title, $description, $amount, $start, $end, $type, $hide){
        Assert::stringNotEmpty($title, 'Discount title is required.');
        Assert::positiveNumber($amount, 'Discount amount is required.');
        Assert::validDate($start, 'Discount start date is invalid.');
        Assert::validDate($end, 'Discount end date is invalid.');
        Assert::stringNotEmpty($type, 'Discount type is invalid.');

        $productId = new Id();
        $productId->isValid($id) ? $productId->set($id) : $productId->new();

        $discount = $this->factory->mapResult([
            'discountId' => $productId->toString(),
            'title' => $title,
            'desc' => $description,
            'amount' => $amount,
            'start' => $start,
            'end' => $end,
            'date' => (new DateHelper())->new()->toString(),
            'type' => $type,
            'hide' => $hide
        ]);

        $this->discount->set($discount);

        $this->setOutput($discount);
        return $this;
    }
}