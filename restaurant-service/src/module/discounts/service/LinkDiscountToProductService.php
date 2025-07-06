<?php
namespace src\module\discounts\service;

use src\infrastructure\Service;
use src\module\discounts\factory\DiscountLinkFactory;
use src\module\discounts\logic\SetDiscountLink;
use tools\infrastructure\Assert;

class LinkDiscountToProductService extends Service{
    protected DiscountLinkFactory $factory;
    protected SetDiscountLink $link;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountLinkFactory();
        $this->link = new SetDiscountLink();
    }
    
    public function process($productId, $discountId, $hide){
        Assert::validUuid($productId, 'Invalid product id.');
        Assert::validUuid($discountId, 'Invalid discount id.');

        $discount = $this->factory->mapResult([
            'productId' => $productId,
            'discountId' => $discountId,
            'hide' => $hide
        ]);

        $this->link->set($discount);

        $this->setOutput($discount);
        return $this;
    }
}