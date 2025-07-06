<?php
namespace src\module\discounts\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\discounts\service\LinkDiscountToProductService;

class LinkDiscountToProductAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new LinkDiscountToProductService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('productId'),
            $this->get('discountId'),
            $this->get('hide')
        );
    }
}