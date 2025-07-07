<?php
namespace src\module\restaurant\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\restaurant\service\SetRestaurantService;

class SetRestaurantAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetRestaurantService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('tagline'),
            $this->get('logoRef'),
            $this->get('isActive'),
            $this->get('phone'),
            $this->get('email'),
            $this->get('addressId'),
            $this->get('cuisine'),
            $this->get('category'),
            $this->get('created'),
            $this->get('rating'),
            $this->get('openingHours'),
            $this->get('priceRange')
        );
    }
}